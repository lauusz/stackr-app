// app/main/index.tsx (atau app/index.tsx kalo gak pake nested main folder)
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ImageSelectionModal from '../components/ImageSelectionModal';
import OverlayImage from '../components/OverlayImage';
import { useImageManagement } from '../hooks/useImageManagement';

const { width, height } = Dimensions.get('window');

const MainScreen: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { selectedImageIds, layeredImages, addImage, removeImage } = useImageManagement();

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.container}>
        <View style={styles.imageCanvas}>
          {layeredImages.map((img) => (
            <OverlayImage
              key={img.id}
              source={img.source}
              style={{
                zIndex: img.zIndex,
                width: width * 0.8, 
                height: height * 0.4,
                alignSelf: 'center', 
              }}
            />
          ))}
        </View>

        {/* Tombol Add Image */}
        <View style={styles.buttonContainer}>
          <Button title="Tambah Gambar" onPress={() => setModalVisible(true)} />
        </View>

        {/* Modal Pemilihan Gambar */}
        <ImageSelectionModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onSelectImage={addImage}
          onDeselectImage={removeImage}
          selectedImageIds={selectedImageIds}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  imageCanvas: {
    width: '90%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default MainScreen;