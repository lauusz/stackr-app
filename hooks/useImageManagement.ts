// hooks/useImageManagement.ts
import { useState, useMemo } from 'react';
import { ImageSourcePropType } from 'react-native';
import { overlayAssets } from '../assets/images/image';

interface SelectedImage {
  id: string;
  source: ImageSourcePropType;
  zIndex: number; // For layering
  order: number; // Order of selection
}

export const useImageManagement = () => {
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);
  const [selectionOrder, setSelectionOrder] = useState<string[]>([]); // To preserve order

  const addImage = (imageId: string) => {
    if (!selectedImageIds.includes(imageId)) {
      setSelectedImageIds((prev) => [...prev, imageId]);
      setSelectionOrder((prev) => [...prev, imageId]);
    }
  };

  const removeImage = (imageId: string) => {
    setSelectedImageIds((prev) => prev.filter((id) => id !== imageId));
    setSelectionOrder((prev) => prev.filter((id) => id !== imageId));
  };

  const layeredImages = useMemo(() => {
    return selectionOrder.map((id, index) => {
      const asset = overlayAssets.find((a) => a.id === id);
      if (asset) {
        const zIndex = selectionOrder.length - 1 - index;
        return {
          id: asset.id,
          source: asset.uri,
          zIndex: zIndex,
          order: index,
        };
      }
      return null;
    }).filter(Boolean) as SelectedImage[];
  }, [selectionOrder]);

  return {
    selectedImageIds,
    layeredImages,
    addImage,
    removeImage,
  };
};