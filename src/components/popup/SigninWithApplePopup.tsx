//import libraries
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import PopupContainer from './PopupContainer';
import { hp, wp } from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import { AppLocalizedStrings } from '../../localization/Localization';
import SVG from '../../assets/svg';
import appleAuth, {
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';

interface Props extends ViewProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  appleLoginHandler: () => void;
}

// Component
const SigninWithApplePopup = (props: Props) => {
  const { style, visible, setVisible, appleLoginHandler } = props;

  const mainStyle = useMemo(() => {
    return { ...styles.main, ...(style as ViewStyle) };
  }, [style]);

  // const appleLoginHandler = async () => {
  //   try {
  //     appleAuth.performRequest();
  //     const apple = await appleAuthAndroid.signIn();
  //     setVisible(false);
  //   } catch (error) {
  //     console.log(error);
  //     setVisible(false);
  //   }
  // };

  return (
    <PopupContainer visible={visible} setVisble={setVisible}>
      <View>
        <Text style={mainStyle}>{AppLocalizedStrings.popup.loginFirst}</Text>
        <Text style={styles.popupContant}>
          {AppLocalizedStrings.popup.pleaseLogin}
        </Text>
        <TouchableOpacity
          onPress={appleLoginHandler}
          style={styles.appleButton}>
          <SVG.Apple width={20} height={20} />
          <Text style={styles.appleTitle}>
            {AppLocalizedStrings.popup.signinApple}
          </Text>
        </TouchableOpacity>
      </View>
    </PopupContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    textAlign: 'center',
    marginTop: hp(-4.5),
    ...Style.getTextStyle(18, 'SemiBold', Colors.accent),
    alignSelf: 'center',
  },
  popupContant: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.accent),
    paddingVertical: hp(2),
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: Colors.accent,
    alignSelf: 'center',
    paddingHorizontal: wp(14),
  },
  appleButton: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.mountainMist,
  },
  appleTitle: {
    ...Style.getTextStyle(17, 'SemiBold', Colors.accent),
    paddingLeft: wp(2),
    paddingVertical: hp(1),
  },
});

//export component
export default SigninWithApplePopup;
