import React from 'react';
import { Image, StyleSheet, ImageSourcePropType, ImageStyle } from 'react-native';

interface OverlayImageProps {
  source: ImageSourcePropType;
  style?: ImageStyle;
}

const OverlayImage: React.FC<OverlayImageProps> = ({ source, style }) => {
  return (
    <Image
      source={source}
      style={[styles.image, style]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  } as ImageStyle,
});

export default OverlayImage;