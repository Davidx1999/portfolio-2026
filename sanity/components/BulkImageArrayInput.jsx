import React, { useState, useRef, useCallback } from 'react';
import { Stack, Button, Card, Text, Flex, Spinner, Box } from '@sanity/ui';
import { useClient } from 'sanity';

function UploadSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function ImagesSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

/**
 * BulkImageArrayInput
 * Custom input component for Sanity arrays of images/gallery items.
 * Allows editors to select multiple image files at once, uploading them directly
 * to the Sanity Asset pipeline and creating gallery items in the specified order.
 */
export function BulkImageArrayInput(props) {
  const { schemaType, value = [], onChange, renderDefault } = props;
  const client = useClient({ apiVersion: '2024-01-01' });
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleButtonClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  }, []);

  const handleFilesSelected = useCallback(
    async (event) => {
      const files = Array.from(event.target.files || []);
      if (files.length === 0) return;

      setIsUploading(true);
      setErrorMessage(null);
      setUploadProgress({ current: 0, total: files.length });

      try {
        const newItems = [];
        const itemSchemaType = schemaType.of?.[0];
        const itemTypeName = itemSchemaType?.name || 'object';

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          setUploadProgress({ current: i + 1, total: files.length });

          // Upload asset directly through Sanity asset pipeline
          const assetDoc = await client.assets.upload('image', file, {
            filename: file.name,
          });

          // Determine image field name (usually 'image' or 'media')
          const fields = itemSchemaType?.fields || [];
          const hasMediaField = fields.some((f) => f.name === 'media');
          const imageFieldName = hasMediaField ? 'media' : 'image';

          const itemKey = `img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

          const newItem = {
            _key: itemKey,
            _type: itemTypeName,
            [imageFieldName]: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: assetDoc._id,
              },
            },
          };

          // Initialize optional localized fields if defined
          if (fields.some((f) => f.name === 'caption')) {
            newItem.caption = { _type: 'localizedString', en: '', ptBR: '' };
          }
          if (fields.some((f) => f.name === 'alt')) {
            newItem.alt = { _type: 'localizedString', en: '', ptBR: '' };
          }

          newItems.push(newItem);
        }

        // Append new items to array
        const updatedValue = [...(value || []), ...newItems];

        // Use Sanity form onChange API
        onChange({
          type: 'set',
          value: updatedValue,
        });
      } catch (err) {
        console.error('Bulk image upload error:', err);
        setErrorMessage(err.message || 'Erro durante o upload das imagens.');
      } finally {
        setIsUploading(false);
      }
    },
    [client, onChange, schemaType, value]
  );

  return (
    <Stack space={3}>
      <Card padding={3} radius={2} tone="primary" border>
        <Flex align="center" justify="space-between" gap={3}>
          <Flex align="center" gap={2}>
            <Box style={{ color: '#C4FF00' }}>
              <ImagesSvg />
            </Box>
            <Stack space={1}>
              <Text size={1} weight="semibold">
                Upload de Imagens em Massa
              </Text>
              <Text size={0} muted>
                Selecione múltiplos arquivos para criar os itens da galeria de uma só vez.
              </Text>
            </Stack>
          </Flex>

          <Flex align="center" gap={2}>
            {isUploading ? (
              <Flex align="center" gap={2}>
                <Spinner size={1} />
                <Text size={1} muted>
                  Enviando {uploadProgress.current}/{uploadProgress.total}...
                </Text>
              </Flex>
            ) : (
              <Button
                icon={UploadSvg}
                text="Selecionar Imagens"
                tone="primary"
                mode="ghost"
                onClick={handleButtonClick}
                disabled={isUploading}
                fontSize={1}
                padding={2}
              />
            )}
          </Flex>
        </Flex>

        {errorMessage && (
          <Box marginTop={2}>
            <Text size={1} tone="critical">
              ⚠️ {errorMessage}
            </Text>
          </Box>
        )}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFilesSelected}
        />
      </Card>

      {/* Render standard array items with reordering and previews */}
      {renderDefault(props)}
    </Stack>
  );
}

export default BulkImageArrayInput;
