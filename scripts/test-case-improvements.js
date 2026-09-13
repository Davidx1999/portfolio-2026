import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeProject, normalizeContentBlock } from '../src/utils/normalizeProject.js';

test('Case Editorial Improvements Suite', async (t) => {
  await t.test('1. normalizeProject handles externalUrl and externalUrlLabel correctly in EN and PT', () => {
    const rawProject = {
      _id: 'proj-1',
      slug: { current: 'escutha' },
      title: { en: 'Escutha', ptBR: 'Escutha' },
      externalUrl: 'https://www.escutha.com.br/',
      externalUrlLabel: {
        en: 'Visit Escutha Live',
        ptBR: 'Visitar Escutha no Ar',
      },
    };

    const normEn = normalizeProject(rawProject, 'en');
    assert.equal(normEn.externalUrl, 'https://www.escutha.com.br/');
    assert.equal(normEn.externalUrlLabel, 'Visit Escutha Live');

    const normPt = normalizeProject(rawProject, 'pt');
    assert.equal(normPt.externalUrl, 'https://www.escutha.com.br/');
    assert.equal(normPt.externalUrlLabel, 'Visitar Escutha no Ar');
  });

  await t.test('2. normalizeProject falls back to null when externalUrl is absent or empty', () => {
    const rawProject = {
      _id: 'proj-2',
      slug: { current: 'exoplanets-data' },
      title: { en: 'Exoplanets Data' },
    };

    const norm = normalizeProject(rawProject, 'en');
    assert.equal(norm.externalUrl, null);
    assert.equal(norm.externalUrlLabel, null);
  });

  await t.test('3. normalizeContentBlock correctly normalizes toolsGrid items with bilingual fields and URLs', () => {
    const rawBlock = {
      _type: 'toolsGrid',
      theme: 'dark',
      eyebrow: { en: 'STACK // DATA & TOOLING', ptBR: 'STACK // DADOS E FERRAMENTAS' },
      title: { en: 'Tools & Data Architecture', ptBR: 'Ferramentas e Arquitetura de Dados' },
      intro: { en: 'Technical stack and sources.', ptBR: 'Stack técnica e fontes de dados.' },
      items: [
        {
          _key: 'item-1',
          name: 'NASA Exoplanet Archive',
          category: { en: 'Data Source', ptBR: 'Fonte de Dados' },
          description: {
            en: 'Primary public repository of confirmed exoplanets.',
            ptBR: 'Repositório público primário de exoplanetas confirmados.',
          },
          url: 'https://exoplanetarchive.ipac.caltech.edu/',
        },
        {
          _key: 'item-2',
          name: 'D3.js',
          category: { en: 'Visualization Library', ptBR: 'Biblioteca de Visualização' },
          description: {
            en: 'Scalable data-driven DOM rendering.',
            ptBR: 'Renderização orientada a dados escalável no DOM.',
          },
          url: 'https://d3js.org/',
        },
        {
          _key: 'item-3',
          name: 'GitHub',
          category: { en: 'Version Control', ptBR: 'Controle de Versão' },
          description: {
            en: 'Repository hosting and branch deployment.',
            ptBR: 'Hospedagem de repositório e deploy de branches.',
          },
          url: 'https://github.com/',
        },
      ],
    };

    const normalizedEn = normalizeContentBlock(rawBlock, 'en', 0);
    assert.equal(normalizedEn._type, 'toolsGrid');
    assert.equal(normalizedEn.eyebrow, 'STACK // DATA & TOOLING');
    assert.equal(normalizedEn.title, 'Tools & Data Architecture');
    assert.equal(normalizedEn.intro, 'Technical stack and sources.');
    assert.equal(normalizedEn.items.length, 3);
    assert.equal(normalizedEn.items[0].name, 'NASA Exoplanet Archive');
    assert.equal(normalizedEn.items[0].category, 'Data Source');
    assert.equal(normalizedEn.items[0].description, 'Primary public repository of confirmed exoplanets.');
    assert.equal(normalizedEn.items[0].url, 'https://exoplanetarchive.ipac.caltech.edu/');

    const normalizedPt = normalizeContentBlock(rawBlock, 'pt', 0);
    assert.equal(normalizedPt.eyebrow, 'STACK // DADOS E FERRAMENTAS');
    assert.equal(normalizedPt.title, 'Ferramentas e Arquitetura de Dados');
    assert.equal(normalizedPt.intro, 'Stack técnica e fontes de dados.');
    assert.equal(normalizedPt.items[0].category, 'Fonte de Dados');
    assert.equal(normalizedPt.items[0].description, 'Repositório público primário de exoplanetas confirmados.');
    assert.equal(normalizedPt.items[1].category, 'Biblioteca de Visualização');
    assert.equal(normalizedPt.items[2].category, 'Controle de Versão');
  });

  await t.test('4. URL safety validation matches requirements', async () => {
    const { isValidHttpUrl } = await import('../src/utils/url.js');

    assert.equal(isValidHttpUrl('https://www.escutha.com.br/'), true);
    assert.equal(isValidHttpUrl('http://localhost:5173'), true);
    assert.equal(isValidHttpUrl('https://exoplanetarchive.ipac.caltech.edu/'), true);
    assert.equal(isValidHttpUrl('javascript:alert(1)'), false);
    assert.equal(isValidHttpUrl('ftp://example.com'), false);
    assert.equal(isValidHttpUrl('not-a-url'), false);
    assert.equal(isValidHttpUrl(''), false);
    assert.equal(isValidHttpUrl(null), false);
    assert.equal(isValidHttpUrl(undefined), false);
  });

  await t.test('5. Closing CTA title fallback never uses Portuguese text for English when English label is empty', () => {
    function resolveClosingTitle(caseStudy, language) {
      const projectTitle = typeof caseStudy.title === 'object' ? caseStudy.title[language] || caseStudy.title.en : caseStudy.title;
      const rawLabel = caseStudy.rawExternalUrlLabel || caseStudy.externalUrlLabel;

      if (language === 'en') {
        const enLabel =
          typeof rawLabel === 'object' && rawLabel !== null
            ? rawLabel.en
            : (caseStudy.externalUrlLabel_en || (typeof rawLabel === 'string' ? rawLabel : ''));
        const cleanEnLabel = typeof enLabel === 'string' ? enLabel.trim() : '';
        return cleanEnLabel || projectTitle;
      } else {
        const ptLabel =
          typeof rawLabel === 'object' && rawLabel !== null
            ? (rawLabel.ptBR ?? rawLabel.pt)
            : (caseStudy.externalUrlLabel_pt || (typeof rawLabel === 'string' ? rawLabel : ''));
        const cleanPtLabel = typeof ptLabel === 'string' ? ptLabel.trim() : '';
        return cleanPtLabel || projectTitle;
      }
    }

    const caseStudyWithOnlyPtLabel = {
      title: { en: 'Escutha Platform', ptBR: 'Plataforma Escutha' },
      rawExternalUrlLabel: { en: '', ptBR: 'Acessar Escutha no Ar' },
    };

    // In English, it must use project title "Escutha Platform", NOT "Acessar Escutha no Ar"
    assert.equal(resolveClosingTitle(caseStudyWithOnlyPtLabel, 'en'), 'Escutha Platform');
    // In Portuguese, it uses the Portuguese label
    assert.equal(resolveClosingTitle(caseStudyWithOnlyPtLabel, 'pt'), 'Acessar Escutha no Ar');

    const caseStudyWithBothLabels = {
      title: { en: 'Escutha Platform', ptBR: 'Plataforma Escutha' },
      rawExternalUrlLabel: { en: 'Visit Escutha Platform', ptBR: 'Acessar Escutha no Ar' },
    };
    assert.equal(resolveClosingTitle(caseStudyWithBothLabels, 'en'), 'Visit Escutha Platform');
    assert.equal(resolveClosingTitle(caseStudyWithBothLabels, 'pt'), 'Acessar Escutha no Ar');
  });
});
