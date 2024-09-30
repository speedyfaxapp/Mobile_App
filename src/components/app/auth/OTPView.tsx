//import libraries
import React, {useMemo} from 'react';
import {StyleSheet, ViewProps, ViewStyle, Platform} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import Colors from '../../../theme/Colors';

interface Props extends ViewProps {
  onSelect?: (arg0: string) => void;
  code?: string;
}

// Component
const OTPView = (props: Props) => {
  const {style, code, onSelect} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <OTPInputView
      code={code}
      style={mainStyle}
      pinCount={4}
      onCodeChanged={onSelect}
      autoFocusOnLoad
      codeInputFieldStyle={styles.underlineStyleBase}
      onCodeFilled={onSelect}
    />
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    width: '90%',
    height: 70,
    alignSelf: 'center',
  },
  underlineStyleBase: {
    height: wp(14),
    aspectRatio: 61 / 54,
    backgroundColor: '#D9D9D9',
    ...Style.getTextStyle(25, Style.kTextInputFontFamily, Colors.accent),
    lineHeight: Platform.OS === 'android' ? 27 : undefined,
  },
});

//export component
export default OTPView;
