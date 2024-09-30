import React, {memo, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import Style from '../../constants/Style';
import Colors from '../../theme/Colors';
import Spacer from '../layout/Spacer';
import {SvgProps} from 'react-native-svg';

type ButtonType = 'dark' | 'light' | 'text';

interface AdaptiveButtonProps {
  isReverse?: boolean;
  isDisable?: boolean;
  Icon?: React.FC<SvgProps>;
  iconColor?: string;
  iconSize?: number;
  iconStyle?: ViewStyle;
  spacing?: number;
  type?: ButtonType;
  title?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
}

interface ButtonStyle {
  textStyle: TextStyle;
  buttonStyle: ViewStyle;
}

const AdaptiveButton: React.FC<AdaptiveButtonProps> = props => {
  const {
    type = 'dark',
    isReverse = false,
    style,
    textStyle,
    isDisable = false,
    Icon,
    iconColor,
    title,
    iconSize = 15,
    spacing = 5,
    onPress,
    iconStyle,
  } = props;

  const btnStyles: ButtonStyle = useMemo(() => {
    let btnStyle: ButtonStyle = {
      textStyle: {},
      buttonStyle: {},
    };
    switch (type) {
      case 'light':
        btnStyle.buttonStyle = {...styles.btnLight, ...(style ?? {})};
        btnStyle.textStyle = {...styles.textLight, ...(textStyle ?? {})};
        break;
      case 'text':
        btnStyle.buttonStyle = {...styles.btnText, ...(style ?? {})};
        btnStyle.textStyle = {...styles.textText, ...(textStyle ?? {})};
        break;
      default:
        btnStyle.buttonStyle = {...styles.btnDark, ...(style ?? {})};
        btnStyle.textStyle = {...styles.textDark, ...(textStyle ?? {})};
        break;
    }
    btnStyle.buttonStyle.opacity = isDisable ? 0.5 : 1;
    return btnStyle;
  }, [type, style, textStyle, isDisable]);

  return (
    <TouchableOpacity
      style={btnStyles.buttonStyle}
      onPress={!isDisable ? onPress : undefined}>
      <View
        style={isReverse == true ? styles.containerReverse : styles.container}>
        <Text numberOfLines={1} style={btnStyles.textStyle}>
          {title}
        </Text>
        {Icon != null && title != null && <Spacer width={spacing} />}
        {Icon && (
          <Icon
            fill={iconColor}
            width={iconSize}
            height={iconSize}
            style={iconStyle}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(AdaptiveButton);

const styles = StyleSheet.create({
  btnText: {
    backgroundColor: Colors.transparent,
    height: Style.kButtonHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLight: {
    backgroundColor: Colors.white,
    height: Style.kButtonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  btnDark: {
    backgroundColor: Colors.primary,
    height: Style.kButtonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textLight: {
    textTransform: 'uppercase',
    ...Style.getTextStyle(
      Style.kButtonFontSize,
      Style.kButtonFontFamily,
      Colors.accent,
    ),
  },
  textText: {
    textTransform: 'uppercase',
    ...Style.getTextStyle(
      Style.kButtonFontSize,
      Style.kButtonFontFamily,
      Colors.accent,
    ),
  },
  textDark: {
    textTransform: 'uppercase',
    ...Style.getTextStyle(
      Style.kButtonFontSize,
      Style.kButtonFontFamily,
      Colors.white,
    ),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerReverse: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {},
  spacer: {
    width: 5,
  },
});
