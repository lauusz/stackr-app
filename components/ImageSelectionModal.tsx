// components/ImageSelectionModal.tsx
import React from 'react';
import { Modal, View, Text, Button, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { overlayAssets } from '../assets/images/image';

interface ImageSelectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectImage: (imageId: string) => void;
  onDeselectImage: (imageId: string) => void;
  selectedImageIds: string[]; // List ID gambar yang udah dipilih
}

const ImageSelectionModal: React.FC<ImageSelectionModalProps> = ({
  isVisible,
  onClose,
  onSelectImage,
  onDeselectImage,
  selectedImageIds,
}) => {
  const renderItem = ({ item }: { item: typeof overlayAssets[0] }) => {
    const isSelected = selectedImageIds.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.imageItem, isSelected && styles.selectedItem]}
        onPress={() => (isSelected ? onDeselectImage(item.id) : onSelectImage(item.id))}
      >
        <Image source={item.uri} style={styles.thumbnail} />
        <Text style={styles.imageName}>{item.name}</Text>
        {isSelected && <Text style={styles.checkedMark}>✅</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Pilih Gambar</Text>
          <FlatList
            data={overlayAssets}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
          <Button title="Selesai" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxHeight: '80%', // Batasi tinggi modal
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  imageItem: {
    alignItems: 'center',
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
  },
  selectedItem: {
    borderColor: 'purple', // Warna kalo terpilih
    borderWidth: 2,
  },
  thumbnail: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  imageName: {
    fontSize: 12,
    textAlign: 'center',
  },
  checkedMark: {
    position: 'absolute',
    top: 5,
    right: 5,
    fontSize: 18,
  }
});

export default ImageSelectionModal;