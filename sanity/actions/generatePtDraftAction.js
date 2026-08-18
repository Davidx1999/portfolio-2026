import { useState } from 'react';

/**
 * Custom Sanity Document Action: "Generate PT-BR draft (DeepL)"
 *
 * Segurança:
 * - Não utiliza nem armazena nenhuma chave estática ou shared secret.
 * - Utiliza o token de sessão do usuário logado no Studio para autorizar o endpoint /api/translate.
 */
export function createGeneratePtDraftAction(context) {
  return function GeneratePtDraftAction(props) {
    const { id, type, draft, published } = props;
    const [isTranslating, setIsTranslating] = useState(false);

    const doc = draft || published;
    if (!doc) return null;

    // Apenas para tipos com tradução ativa
    const translatableTypes = ['project', 'aboutPage', 'letsTalkPage', 'playgroundProject'];
    if (!translatableTypes.includes(type)) {
      return null;
    }

    // Apenas para documentos originais em inglês (English-First)
    const isEn = !doc.language || doc.language === 'en';
    if (!isEn) {
      return null;
    }

    return {
      label: isTranslating ? 'Generating PT-BR draft...' : 'Generate PT-BR draft (DeepL)',
      disabled: isTranslating,
      title: 'Generates a PT-BR draft for human review via DeepL',
      onHandle: async () => {
        setIsTranslating(true);

        try {
          // Obtém o token de sessão do Studio via context.getClient
          const client = context.getClient({ apiVersion: '2024-01-01' });
          const userToken = client.config().token || (typeof window !== 'undefined' ? window.localStorage.getItem('__sanity_session_token') : null);

          if (!userToken) {
            alert('ℹ️ Translation API requires an active authenticated Sanity session token.');
            setIsTranslating(false);
            return;
          }

          const endpoint = '/api/translate';

          const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify({
              documentId: id,
              targetLanguage: 'pt-BR',
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || data.error || 'Failed to translate document.');
          }

          alert('✅ PT-BR Draft created successfully! It is now linked in Sanity and awaiting editorial review.');
        } catch (err) {
          console.error('Translation action error:', err);
          alert(`❌ Translation Failed: ${err.message || 'Could not connect to /api/translate'}`);
        } finally {
          setIsTranslating(false);
        }
      },
    };
  };
}
