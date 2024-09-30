//import libraries
import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {useAppSelector} from '../../../store/Hooks';
import DeviceInfo from 'react-native-device-info';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import appleAuth, {
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import * as AuthService from '../../../network/service/Auth';
import AppLoader from '../../indicator/AppLoader';
import {AppLocalizedStrings} from '../../../localization/Localization';

interface Props extends ViewProps {
  onEmailHandler: () => void;
}

// Component
const SigninMethodBanner = (props: Props) => {
  const {style, onEmailHandler} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const [loading, setLoading] = useState(false);
  const isLoggedIn = useAppSelector(state => state.auth.user) != null;

  const onContinueHandler = async (id: string, email: string, type: string) => {
    const deviceId = await DeviceInfo.getUniqueId();
    if (!isLoggedIn) {
      return;
    }
    setLoading(true);
    try {
      const response = await AuthService.loginWithSocilMedia({
        txtDeviceId: deviceId,
        email: email,
        type: type,
        social_media_id: id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const googleLoginHandler = async () => {
    try {
      const google = await GoogleSignin.signIn();
      onContinueHandler(google.user.id, google.user.email, 'google');
    } catch (error) {
      throw error;
    }
  };

  const appleLoginHandler = async () => {
    try {
      appleAuth.performRequest();
      const apple = await appleAuthAndroid.signIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={mainStyle}>
      <View style={styles.signinTypeView}>
        <Text style={styles.orTitle}>{AppLocalizedStrings.login.or}</Text>
        <Text style={styles.typesTitle}>
          {AppLocalizedStrings.login.signinMethod}
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={onEmailHandler} style={styles.button}>
          <SVG.Email width={35} height={35} fill={Colors.primary} />
          <Text style={styles.continue}>
            {AppLocalizedStrings.login.signinEmail}
          </Text>
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={googleLoginHandler} style={styles.button}>
          <SVG.Google width={35} height={35} fill={Colors.primary} />
          <Text style={styles.continue}>
            {AppLocalizedStrings.login.signinGoogle}
          </Text>
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={appleLoginHandler} style={styles.button}>
          <SVG.Apple fill={Colors.monza} width={35} height={35} />
          <Text style={styles.continue}>
            {AppLocalizedStrings.login.signinApple}
          </Text>
          <Text></Text>
        </TouchableOpacity>
      </View>
      <AppLoader loading={loading} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    marginVertical: hp(4),
  },
  signinTypeView: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.softPeach,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    borderRadius: 10,
    marginVertical: hp(0.7),
  },
  orTitle: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.accent),
  },
  typesTitle: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.accent),
    paddingBottom: hp(1),
  },
  continue: {
    textAlign: 'center',
    ...Style.getTextStyle(18, 'SemiBold', Colors.accent),
  },
});

//export component
export default SigninMethodBanner;
