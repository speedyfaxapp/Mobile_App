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
import {HomeStackScreenProps} from '../../navigation/navigator/types';
import {CallingCode, CountryCode} from 'react-native-country-picker-modal';
import CountryPickerWithNumber from '../../components/app/common/CountryPickerWithNumber';
import * as AuthService from '../../network/service/Auth';
import Validator from '../../utility/validation/Validator';
import Toast from '../../utility/toast/Toast';
import AppLoader from '../../components/indicator/AppLoader';

const ForgotPasswordScreen = (
  props: HomeStackScreenProps<'ForgotPasswordScreen'>,
) => {
  const {navigation} = props;
  const [countryCode, setCountryCode] = useState<CountryCode>();
  const [callingCode, setCallingCode] = useState<CallingCode>();
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  const onCountryCodeChange = (
    countCode: CountryCode,
    callCode: CallingCode,
  ) => {
    setCountryCode(countCode);
    setCallingCode(callCode);
  };

  const toggleAuthMode = () => {
    setIsMobile(!isMobile);
  };

  const onResetPasswordHandler = async () => {
    if (!Validator.isValidEmail(email)) {
      {
        !isMobile
          ? Toast.showToast('Please enter valid email', 'Failure')
          : Toast.showToast('Please enter valid number', 'Failure');
      }
      return;
    }
    try {
      setLoading(true);
      const response = await AuthService.forgotPassword({
        username: email.trim(),
      });
      setLoading(false);
      navigation.navigate('OTPVerificationScreen', {
        email: email.trim(),
        type: 'forgot_password',
        otp: response.data?.otp ?? 0,
        userId: response.data?.user_id,
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AuthBanner
          title={AppLocalizedStrings.forgotPassword.forgotPassword}
          content={AppLocalizedStrings.forgotPassword.content}
        />
        {isMobile ? (
          <CountryPickerWithNumber
            mobileNumber={mobileNumber}
            countryCode={countryCode}
            placeholderTitle={
              AppLocalizedStrings.forgotPassword.numberPlaceholder
            }
            onCountryCodeChange={onCountryCodeChange}
            onPhoneNumberChange={setMobileNumber}
            rightIcon={false}
          />
        ) : (
          <AdaptiveTextInput
            placeholder={
              AppLocalizedStrings.forgotPassword.enterRegisteredEmail
            }
            value={email}
            onChangeText={setEmail}
          />
        )}
        <TouchableOpacity
          onPress={toggleAuthMode}
          style={styles.fPMethadButton}>
          <Text style={styles.forgotPassword}>
            {!isMobile
              ? AppLocalizedStrings.forgotPassword.number
              : AppLocalizedStrings.forgotPassword.email}
          </Text>
        </TouchableOpacity>
        <AdaptiveButton
          title={AppLocalizedStrings.forgotPassword.resetPassword}
          style={styles.buttonStyle}
          onPress={onResetPasswordHandler}
        />
      </ScrollView>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginHorizontal: wp(5),
  },
  fPMethadButton: {
    alignSelf: 'flex-end',
  },
  forgotPassword: {
    ...Style.getTextStyle(16, 'Regular', Colors.primary),
    paddingVertical: hp(1),
  },
  buttonStyle: {
    backgroundColor: Colors.accent,
    alignSelf: 'center',
    paddingHorizontal: wp(14),
    marginTop: hp(3),
  },
});
