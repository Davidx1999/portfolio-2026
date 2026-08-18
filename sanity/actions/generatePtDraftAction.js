import { useState } from 'react';

/**
 * Custom Sanity Document Action: "Generate PT-BR draft (DeepL)"
 * Disponível para documentos em inglês ('en' ou sem language) de tipos selecionados.
 * Chama com segurança o endpoint /api/translate sem expor write tokens ou chaves DeepL.
 */
export function createGeneratePtDraftAction() {
  return function GeneratePtDraftAction(props) {
    const { id, type, draft, published } = props;
    const [isTranslating, setIsTranslating] = useState(false);

    const doc = draft || published;
    if (!doc) return null;

    // Apenas para tipos traduzíveis
    const translatableTypes = ['project', 'aboutPage', 'letsTalkPage', 'playgroundProject'];
    if (!translatableTypes.includes(type)) {
      return null;
    }

    // Apenas para documentos em inglês (English-First)
    const isEn = !doc.language || doc.language === 'en';
    if (!isEn) {
      return null;
    }

    return {
      label: isTranslating ? 'Generating PT-BR draft...' : 'Generate PT-BR draft (DeepL)',
      disabled: isTranslating,
      title: 'Automatically generates a PT-BR draft for human editorial review via DeepL API',
      onHandle: async () => {
        setIsTranslating(true);

        try {
          const endpoint = '/api/translate';

          const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              documentId: id,
              targetLanguage: 'pt-BR',
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || data.details || 'Failed to translate document.');
          }

          alert('✅ PT-BR Draft created successfully! It is now available in Sanity for editorial review.');
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
