type ImageAsset = {
  id: string;
  uri: any;
  name: string;
};

export const overlayAssets: ImageAsset[] = [
  { id: '1', uri: require('./packaging.png'), name: 'Packaging 1' },
  { id: '2', uri: require('./packaging2.png'), name: 'Packaging 2' },
  { id: '3', uri: require('./warna_hijau.png'), name: 'Warna Hijau' },
  { id: '4', uri: require('./warna_merah.png'), name: 'Warna Merah' },
];