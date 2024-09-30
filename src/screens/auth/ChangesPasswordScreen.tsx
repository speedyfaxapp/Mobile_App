import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import AdaptiveTextInput from '../../components/input/AdaptiveTextInput';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import * as AuthService from '../../network/service/Auth';
import AppLoader from '../../components/indicator/AppLoader';
import Toast from '../../utility/toast/Toast';
import Validator from '../../utility/validation/Validator';
import RootNavigation from '../../navigation/RootNavigation';

const ChangesPasswordScreen = () => {
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmitHandler = async () => {
    if (!Validator.isValidPassword(oldPassword)) {
      Toast.showToast('Please enter old password', 'Failure');
      return;
    }
    if (newPassword != confirmPassword) {
      Toast.showToast('New password and confirm password not same', 'Failure');
      return;
    }
    try {
      setLoading(true);
      const response = await AuthService.changesPassword({
        old_password: oldPassword,
        new_password: newPassword,
      });
      setLoading(false);
      RootNavigation.navigate('HomeStackNavigator');
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.headerTitle}>
          {AppLocalizedStrings.changesPassword.changesPassword}
        </Text>
        <AdaptiveTextInput
          placeholder={AppLocalizedStrings.changesPassword.oldPassword}
          style={styles.textInput}
          onChangeText={o => {
            setOldPassword(o);
          }}
        />
        <AdaptiveTextInput
          placeholder={AppLocalizedStrings.changesPassword.newPassword}
          style={styles.textInput}
          onChangeText={n => setNewPassword(n)}
        />
        <AdaptiveTextInput
          placeholder={AppLocalizedStrings.changesPassword.confirmPassword}
          style={styles.textInput}
          onChangeText={c => setConfirmPassword(c)}
        />
        <AdaptiveButton
          title={AppLocalizedStrings.changesPassword.submit}
          style={styles.buttonStyle}
          onPress={onSubmitHandler}
        />
      </ScrollView>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default ChangesPasswordScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginHorizontal: wp(5),
  },
  headerTitle: {
    ...Style.getTextStyle(16, 'Bold', Colors.accent),
    paddingVertical: hp(2),
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
