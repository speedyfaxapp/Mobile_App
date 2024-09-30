import {Dimensions, PixelRatio, Platform} from 'react-native';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const scale = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) / 420;

export type FontType = 'Regular' | 'Medium' | 'SemiBold' | 'Bold' | 'ExtraBold';

class Fonts {
  static regular: string = 'BalooPaaji2-Regular';
  static medium: string = 'BalooPaaji2-Medium';
  static semiBold: string = 'BalooPaaji2-SemiBold';
  static bold: string = 'BalooPaaji2-Bold';
  static extraBold: string = 'BalooPaaji2-ExtraBold';

  static normalize = (size: number) => {
    const newSize = size * scale;
    // return size;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  };

  static getFontFamily(type: FontType) {
    switch (type) {
      case 'Regular':
        return Fonts.regular;
      case 'Medium':
        return Fonts.medium;
      case 'SemiBold':
        return Fonts.semiBold;
      case 'Bold':
        return Fonts.bold;
      case 'ExtraBold':
        return Fonts.extraBold;
    }
  }
}
export default Fonts;
