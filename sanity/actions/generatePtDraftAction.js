import { useState } from 'react';

/**
 * Custom Sanity Document Action: "Generate / Update PT-BR with DeepL"
 *
 * Integração Field-Level:
 * - Lê os campos em 'en' da versão mais recente (draft ou publicado).
 * - Traduz e preenche os campos 'ptBR' dentro do MESMO documento.
 * - Oferece opções para preencher apenas campos vazios ou regenerar todos.
 * - Salva exclusivamente no draft do próprio documento.
 */
export function createGeneratePtDraftAction(context) {
  return function GeneratePtDraftAction(props) {
    const { id, type, draft, published } = props;
    const [isTranslating, setIsTranslating] = useState(false);

    const doc = draft || published;
    if (!doc) return null;

    // Apenas para tipos de estudo de caso / projeto na Fase 1
    if (type !== 'project') {
      return null;
    }

    return {
      label: isTranslating ? 'Traduzindo com DeepL...' : 'Generate / Update PT-BR with DeepL',
      disabled: isTranslating,
      title: 'Traduz os campos em inglês para português no mesmo documento via DeepL',
      onHandle: async () => {
        const hasExistingPt = !!(doc.title?.ptBR || doc.shortDescription?.ptBR || doc.overview?.ptBR);

        let mode = 'missing_only';
        if (hasExistingPt) {
          const userChoice = window.confirm(
            'Já existem traduções em português neste documento.\n\n' +
            'Clique [OK] para preencher APENAS os campos portugueses vazios.\n' +
            'Clique [Cancelar] para REGENERAR todas as traduções em português.'
          );
          mode = userChoice ? 'missing_only' : 'regenerate_all';

          if (!userChoice) {
            const doubleConfirm = window.confirm(
              '⚠️ ATENÇÃO: Você escolheu REGENERAR todas as traduções em português. Isso atualizará os textos em ptBR no draft atual. Deseja continuar?'
            );
            if (!doubleConfirm) {
              return;
            }
          }
        }

        setIsTranslating(true);

        try {
          // Obtém o token de sessão do Studio via context.getClient
          const client = context.getClient({ apiVersion: '2024-01-01' });
          const userToken = client.config().token || (typeof window !== 'undefined' ? window.localStorage.getItem('__sanity_session_token') : null);

          if (!userToken) {
            alert('ℹ️ A API de Tradução requer uma sessão autenticada no Sanity Studio.');
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
              mode,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || data.error || 'Falha ao processar tradução.');
          }

          alert(
            `✅ Tradução concluída com sucesso!\n\n` +
            `Os campos em português (ptBR) foram preenchidos no rascunho (draft) deste documento.\n` +
            `Revise os textos e clique em "Publish" quando estiver pronto.`
          );
        } catch (err) {
          console.error('Translation action error:', err);
          alert(`❌ Erro na tradução: ${err.message || 'Não foi possível conectar ao endpoint /api/translate'}`);
        } finally {
          setIsTranslating(false);
        }
      },
    };
  };
}
