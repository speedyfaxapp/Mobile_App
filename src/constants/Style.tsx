import {
  ColorValue,
  Dimensions,
  Platform,
  StatusBar,
  TextStyle,
} from 'react-native';
import Fonts, {FontType} from '../theme/Fonts';
import {hp, wp} from '../utility/responsive/ScreenResponsive';
import DeviceInfo from 'react-native-device-info';

const isIOS = Platform.OS == 'ios';

class Style {
  constructor() {}
  static windowHeight = Dimensions.get('window').height;
  static statusBarHeight = StatusBar.currentHeight ?? 0;
  static screenHeight = Style.windowHeight;
  static screenPadding = wp(6);
  static screenBottomPadding = DeviceInfo.hasNotch() ? 0 : hp(3);
  static kBorderRadius = 15;
  static kButtonHeight = 44;
  static kTextInputHeight = 44;
  static kButtonFontSize = 18;
  static kTextInputFontSize = 10;
  static kButtonFontFamily: FontType = 'Bold';
  static kTextInputFontFamily: FontType = 'Regular';

  static getTextStyle(
    fontSize: number,
    fontType: FontType,
    color: ColorValue,
  ): TextStyle {
    return {
      fontFamily: Fonts.getFontFamily(fontType),
      fontSize: Fonts.normalize(fontSize),
      color: color,
    };
  }
}

export default Style;
