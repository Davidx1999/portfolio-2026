import crypto from 'crypto';

const RESEND_API_URL = 'https://api.resend.com/emails';
const MAX_BODY_SIZE = 32 * 1024;
const MAX_LIST_ITEMS = 8;

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function getClientIp(req) {
  return String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .split(',')[0]
    .trim();
}

function isRateLimited(ip) {
  const now = Date.now();
  const current = rateLimitMap.get(ip);

  if (!current || now - current.startedAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, startedAt: now });
    return false;
  }

  current.count += 1;
  return current.count > MAX_REQUESTS_PER_WINDOW;
}

function text(value, maxLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function list(value) {
  return Array.isArray(value)
    ? value.slice(0, MAX_LIST_ITEMS).map((item) => text(item, 120)).filter(Boolean)
    : [];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function row(label, value) {
  return `<tr><td style="padding:8px 12px;color:#666;vertical-align:top;width:180px">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#111">${escapeHtml(value || '-')}</td></tr>`;
}

async function sendEmail(apiKey, payload, idempotencyKey) {
  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const providerMessage = await response.text();
    throw new Error(`Resend rejected the message (${response.status}): ${providerMessage.slice(0, 300)}`);
  }

  return response.json();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const declaredLength = Number(req.headers['content-length'] || 0);
  if (declaredLength > MAX_BODY_SIZE) {
    return res.status(413).json({ error: 'Request is too large.' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};

  // Return a neutral success response to bots without sending anything.
  if (text(body.honeypot, 200)) {
    return res.status(200).json({ ok: true });
  }

  const name = text(body.name, 120);
  const email = text(body.email, 254).toLowerCase();
  const description = text(body.description, 5000);
  const company = text(body.company, 160);
  const deadline = text(body.deadline, 160);
  const referenceLink = text(body.referenceLink, 500);
  const selectedServices = list(body.selectedServices);
  const selectedFormat = text(body.selectedFormat, 160);
  const selectedTimeline = text(body.selectedTimeline, 160);
  const selectedBudget = text(body.selectedBudget, 160);
  const selectedMarket = text(body.selectedMarket, 80);
  const selectedCurrency = text(body.selectedCurrency, 20);
  const language = body.language === 'pt' ? 'pt' : 'en';
  const submittedAt = Number(body.submittedAt);
  const submissionId = /^[a-zA-Z0-9-]{8,80}$/.test(body.submissionId || '')
    ? body.submissionId
    : crypto.randomUUID();

  if (!name || !email || !description || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid name, email, and project description.' });
  }

  if (Number.isFinite(submittedAt) && Date.now() - submittedAt < 2500) {
    return res.status(400).json({ error: 'Please review the form before submitting.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error('Contact endpoint is missing required email environment variables.');
    return res.status(503).json({ error: 'Contact service is temporarily unavailable.' });
  }

  const services = selectedServices.join(', ') || (language === 'pt' ? 'Não especificado' : 'Not specified');
  const receivedAt = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'long',
    timeZone: 'America/Fortaleza',
  }).format(new Date());

  const ownerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:720px;margin:0 auto;color:#111">
      <p style="font-size:12px;letter-spacing:.08em;color:#666">PORTFOLIO CONTACT // ${escapeHtml(submissionId)}</p>
      <h1 style="font-size:26px">Novo contato de ${escapeHtml(name)}</h1>
      <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(description)}</p>
      <table style="width:100%;border-collapse:collapse;background:#f7f7f5">
        ${row('Nome', name)}
        ${row('Email', email)}
        ${row('Empresa', company)}
        ${row('Serviços', services)}
        ${row('Formato', selectedFormat)}
        ${row('Prazo de início', selectedTimeline)}
        ${row('Investimento', selectedBudget)}
        ${row('Mercado / moeda', [selectedMarket, selectedCurrency].filter(Boolean).join(' / '))}
        ${row('Prazo desejado', deadline)}
        ${row('Link de referência', referenceLink)}
        ${row('Recebido em', receivedAt)}
      </table>
    </div>`;

  const confirmation = language === 'pt'
    ? {
        subject: 'Recebi seu contato // David Salviano',
        heading: `Olá, ${name}. Recebi sua mensagem.`,
        body: 'Vou analisar o contexto enviado e responder em até 24–48 horas úteis. Você pode responder diretamente a este email se precisar complementar alguma informação.',
        label: 'Resumo do projeto',
      }
    : {
        subject: 'I received your message // David Salviano',
        heading: `Hi, ${name}. I received your message.`,
        body: 'I will review the context you shared and reply within 24–48 business hours. You can reply directly to this email if you need to add anything.',
        label: 'Project summary',
      };

  const confirmationHtml = `
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;color:#111">
      <p style="font-size:12px;letter-spacing:.08em;color:#666">DAVID SALVIANO // PRODUCT DESIGN</p>
      <h1 style="font-size:26px">${escapeHtml(confirmation.heading)}</h1>
      <p style="line-height:1.6">${escapeHtml(confirmation.body)}</p>
      <div style="margin-top:28px;padding:20px;background:#f7f7f5;border-left:4px solid #4056f4">
        <strong>${escapeHtml(confirmation.label)}</strong>
        <p style="white-space:pre-wrap;line-height:1.6;margin-bottom:0">${escapeHtml(description)}</p>
      </div>
      <p style="margin-top:28px;color:#666;font-size:13px">Reference: ${escapeHtml(submissionId)}</p>
    </div>`;

  try {
    await sendEmail(apiKey, {
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `Novo projeto // ${name}${company ? ` // ${company}` : ''}`,
      html: ownerHtml,
    }, `contact-owner-${submissionId}`);

    let confirmationSent = true;
    try {
      await sendEmail(apiKey, {
        from: fromEmail,
        to: [email],
        reply_to: toEmail,
        subject: confirmation.subject,
        html: confirmationHtml,
      }, `contact-confirmation-${submissionId}`);
    } catch (error) {
      confirmationSent = false;
      console.error('Contact confirmation email failed:', error);
    }

    return res.status(200).json({ ok: true, submissionId, confirmationSent });
  } catch (error) {
    console.error('Contact notification email failed:', error);
    return res.status(502).json({ error: 'Message could not be delivered.' });
  }
}
