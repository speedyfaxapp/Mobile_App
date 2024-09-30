import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import AdaptiveTextInput from '../../components/input/AdaptiveTextInput';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import AuthBanner from '../../components/app/setting/AuthBanner';
import {AppLocalizedStrings} from '../../localization/Localization';
import {
  BottomTabScreenProps,
  HomeStackScreenProps,
} from '../../navigation/navigator/types';
import Toast from '../../utility/toast/Toast';
import * as AuthService from '../../network/service/Auth';
import AppLoader from '../../components/indicator/AppLoader';
import {useNavigation} from '@react-navigation/native';

const ResetPasswordScreen = (
  props: HomeStackScreenProps<'ResetPasswordScreen'>,
) => {
  const {route} = props;
  const [oldPassword, setOldPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const navigation =
    useNavigation<BottomTabScreenProps<'SettingsScreen'>['navigation']>();

  const onResetPasswordHandler = async () => {
    if (oldPassword != confirmPassword) {
      Toast.showToast('Old password and confirm password not same', 'Failure');
      return;
    }
    try {
      setLoading(true);
      const response = await AuthService.resetPassword({
        user_id: route.params.user_id,
        password: confirmPassword.trim(),
      });
      setLoading(false);
      navigation.navigate('SettingsScreen');
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AuthBanner
          title={AppLocalizedStrings.resetPassword.headerTitle}
          content={''}
        />
        <AdaptiveTextInput
          placeholder={AppLocalizedStrings.resetPassword.newPassword}
          style={styles.textInput}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <AdaptiveTextInput
          placeholder={AppLocalizedStrings.resetPassword.confirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <AdaptiveButton
          title={AppLocalizedStrings.resetPassword.resetNow}
          style={styles.buttonStyle}
          onPress={onResetPasswordHandler}
        />
      </ScrollView>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginHorizontal: wp(5),
  },
  buttonStyle: {
    backgroundColor: Colors.accent,
    alignSelf: 'center',
    paddingHorizontal: wp(14),
    marginTop: hp(3),
  },
  textInput: {
    marginBottom: hp(1.5),
  },
});
