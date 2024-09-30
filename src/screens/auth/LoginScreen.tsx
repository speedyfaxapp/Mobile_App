import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import AdaptiveTextInput from '../../components/input/AdaptiveTextInput';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import AuthBanner from '../../components/app/setting/AuthBanner';
import {AppLocalizedStrings} from '../../localization/Localization';
import CountryPickerWithNumber from '../../components/app/common/CountryPickerWithNumber';
import {CallingCode, CountryCode} from 'react-native-country-picker-modal';
import * as AuthService from '../../network/service/Auth';
import AppLoader from '../../components/indicator/AppLoader';
import Validator from '../../utility/validation/Validator';
import Toast from '../../utility/toast/Toast';
import DeviceInfo from 'react-native-device-info';
import {HomeStackScreenProps} from '../../navigation/navigator/types';

const LoginScreen = (props: HomeStackScreenProps<'LoginScreen'>) => {
  const {navigation, route} = props;
  const [countryCode, setCountryCode] = useState<CountryCode>();
  const [callingCode, setCallingCode] = useState<CallingCode>();
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const authMode = route.params.authMode;
  const isMobile = authMode == 'mobile';

  const onCountryCodeChange = (
    countCode: CountryCode,
    callCode: CallingCode,
  ) => {
    setCountryCode(countCode);
    setCallingCode(callCode);
  };

  const forgetPasswordHandler = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const onContinueHandler = async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    if (!Validator.isValidEmail(email)) {
      Toast.showToast('Please enter valid email', 'Failure');
      return;
    }
    if (!Validator.isValidPassword(password)) {
      Toast.showToast('Please enter valid password', 'Failure');
      return;
    }
    try {
      setLoading(true);
      const response = await AuthService.loginAccount({
        username: email.trim(),
        password: password.trim(),
        txtDeviceId: deviceId,
      });
      setLoading(false);
      navigation.navigate('OTPVerificationScreen', {
        email: email.trim(),
        password: password.trim(),
        type: 'login',
        otp: response.data?.otp ?? 0,
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AuthBanner
          title={AppLocalizedStrings.login.signInWithEmail}
          content={AppLocalizedStrings.login.contentEmail}
        />
        {isMobile ? (
          <CountryPickerWithNumber
            mobileNumber={mobileNumber}
            countryCode={countryCode}
            placeholderTitle={AppLocalizedStrings.login.number}
            onCountryCodeChange={onCountryCodeChange}
            onPhoneNumberChange={setMobileNumber}
            rightIcon={false}
          />
        ) : (
          <AdaptiveTextInput
            placeholder={AppLocalizedStrings.login.enterYourEmail}
            value={email}
            onChangeText={setEmail}
          />
        )}
        <AdaptiveTextInput
          placeholder={AppLocalizedStrings.login.password}
          value={password}
          onChangeText={setPassword}
          style={styles.password}
        />
        <TouchableOpacity onPress={forgetPasswordHandler}>
          <Text style={styles.forgotPassword}>
            {AppLocalizedStrings.login.forgotPassword}
          </Text>
        </TouchableOpacity>
        <AdaptiveButton
          title={AppLocalizedStrings.login.continue}
          style={styles.buttonStyle}
          onPress={onContinueHandler}
        />
      </ScrollView>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginHorizontal: wp(5),
  },
  password: {
    marginTop: hp(1.5),
  },
  forgotPassword: {
    ...Style.getTextStyle(16, 'Regular', Colors.primary),
    textAlign: 'right',
    paddingVertical: hp(1),
  },
  buttonStyle: {
    backgroundColor: Colors.accent,
    alignSelf: 'center',
    paddingHorizontal: wp(14),
    marginTop: hp(3),
  },
});
