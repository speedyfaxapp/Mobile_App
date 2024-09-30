import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import AuthBanner from '../../components/app/setting/AuthBanner';
import {AppLocalizedStrings} from '../../localization/Localization';
import OTPView from '../../components/app/auth/OTPView';
import {
  BottomTabScreenProps,
  HomeStackScreenProps,
} from '../../navigation/navigator/types';
import Toast from '../../utility/toast/Toast';
import * as AuthService from '../../network/service/Auth';
import DeviceInfo from 'react-native-device-info';
import AppLoader from '../../components/indicator/AppLoader';
import {useNavigation} from '@react-navigation/native';

const formatTime = (seconds: number) => {
  if (seconds <= 0) {
    return ' ';
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
};

const OTPVerificationScreen = (
  props: HomeStackScreenProps<'OTPVerificationScreen'>,
) => {
  const {navigation, route} = props;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(59);
  const [formattedTime, setFormattedTime] = useState('00:59');
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const timer = useRef<NodeJS.Timer>();
  const type = route.params.type;

  const navigation2 =
    useNavigation<BottomTabScreenProps<'SettingsScreen'>['navigation']>();

  useEffect(() => {
    if (isTimerRunning) {
      const updateTimer = () => {
        setTimeInSeconds(prevTime => prevTime - 1);
      };
      timer.current = setInterval(updateTimer, 1000);
      return () => clearInterval(timer.current);
    }
  }, [isTimerRunning]);

  useEffect(() => {
    if (timeInSeconds <= 0) {
      setIsTimerRunning(false);
    }
    setFormattedTime(formatTime(timeInSeconds));
  }, [timeInSeconds]);

  const onVerifyHandler = () => {
    const sentOTP = route.params.otp;
    if (otp.trim().length != 4) {
      Toast.showToast('Please enter valid otp', 'Failure');
      return;
    }
    if (`${sentOTP}` == otp) {
      if (type == 'login') {
        loginVerificationHandler();
      } else {
        navigation.navigate('ResetPasswordScreen', {
          user_id: route.params.userId ?? 0,
        });
      }
    } else {
      Toast.showToast('Please enter correct OTP', 'Failure');
      setOtp('');
    }
  };

  const loginVerificationHandler = async () => {
   
    const email = (route.params.email || route.params.phone) ?? '';
    const password = route.params.password ?? '';
    const deviceId = await DeviceInfo.getUniqueId();
    try {
      setLoading(true);
      const response = await AuthService.otpVerification({
        txtDeviceId: deviceId,
        username: email,
        password: password,
        txtTotalCredit: null,
      });
      setLoading(false);
      navigation2.navigate('SettingsScreen');
    } catch (error) {
      setLoading(false);
    }
  };

  const onResendOTPHandler = () => {
    if (type == 'login') {
      setLoading(true);
      navigation.setParams({
        otp: 200,
      });
      setLoading(false);
    } else {
    }
    setTimeInSeconds(59);
    setIsTimerRunning(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AuthBanner
          title={AppLocalizedStrings.otpVerification.verificationCode}
          content={AppLocalizedStrings.otpVerification.conent}
        />
        <OTPView code={otp} onSelect={setOtp} />
        <AdaptiveButton
          title={AppLocalizedStrings.otpVerification.verifyNew}
          style={styles.buttonStyle}
          onPress={onVerifyHandler}
        />
        <TouchableOpacity style={styles.timerView} onPress={onResendOTPHandler}>
          <Text style={styles.resend}>
            {AppLocalizedStrings.otpVerification.resendIn +
              `: ${formattedTime}`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: wp(5),
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
  timerView: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: hp(3),
  },
  resend: {
    ...Style.getTextStyle(16, 'Regular', Colors.primary),
  },
});
