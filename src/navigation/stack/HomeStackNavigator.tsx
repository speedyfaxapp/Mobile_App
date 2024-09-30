import React from 'react';
import * as NavigationTheme from '../../theme/NavigationTheme';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigator/types';
import {StyleSheet} from 'react-native';
import FaxCoverPageScreen from '../../screens/tab/newfax/FaxCoverPageScreen';
import PreviewScreen from '../../screens/tab/newfax/PreviewScreen';
import PlaneScreen from '../../screens/tab/newfax/PlaneScreen';
import {AppLocalizedStrings} from '../../localization/Localization';
import FAQScreen from '../../screens/tab/setting/FAQScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import ForgotPasswordScreen from '../../screens/auth/ForgotPasswordScreen';
import OTPVerificationScreen from '../../screens/auth/OTPVerificationScreen';
import ResetPasswordScreen from '../../screens/auth/ResetPasswordScreen';
import TermAndConditionsScreen from '../../screens/tab/setting/TermAndConditionsScreen';
import PrivacyPolicyScreen from '../../screens/tab/setting/PrivacyPolicyScreen';
import EulaScreen from '../../screens/tab/setting/EulaScreen';
import AboutUsScreen from '../../screens/tab/setting/AboutUsScreen';
import ChangesPasswordScreen from '../../screens/auth/ChangesPasswordScreen';
import TutorialScreen from '../../screens/tab/setting/TutorialScreen';
import BottomTabNavigator from '../navigator/BottomTabNavigator';
import NotificationScreen from '../../screens/tab/setting/NotificationScreen';
import SigninWithNumberScreen from '../../screens/auth/SigninWithNumberScreen';
import SigninWithEmailScreen from '../../screens/auth/SigninWithEmailScreen';

const Stack = createStackNavigator<HomeStackParamList>();
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={NavigationTheme.stackOptions}>
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FaxCoverPageScreen"
        component={FaxCoverPageScreen}
        options={{title: AppLocalizedStrings.faxCoverPage.faxCoverPage}}
      />
      <Stack.Screen
        name="PreviewScreen"
        component={PreviewScreen}
        options={{title: AppLocalizedStrings.preview.preview}}
      />
      <Stack.Screen
        name="PlaneScreen"
        component={PlaneScreen}
        options={{title: AppLocalizedStrings.plan.plane, headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{title: AppLocalizedStrings.login.login}}
      />
      <Stack.Screen
        name="SigninWithEmailScreen"
        component={SigninWithEmailScreen}
        options={{title: AppLocalizedStrings.login.login}}
      />
      <Stack.Screen
        name="SigninWithNumberScreen"
        component={SigninWithNumberScreen}
        options={{title: AppLocalizedStrings.login.login}}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          title: AppLocalizedStrings.forgotPassword.forgotPasswordHeader,
        }}
      />
      <Stack.Screen
        name="OTPVerificationScreen"
        component={OTPVerificationScreen}
        options={{title: AppLocalizedStrings.otpVerification.otpVerification}}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{title: AppLocalizedStrings.resetPassword.resetPassword}}
      />
      <Stack.Screen
        name="FAQScreen"
        component={FAQScreen}
        options={{title: AppLocalizedStrings.FAQ.faq}}
      />
      <Stack.Screen
        name="TermAndConditionsScreen"
        component={TermAndConditionsScreen}
        options={{title: AppLocalizedStrings.TermAndCondition.termConditions}}
      />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={{title: AppLocalizedStrings.privacyPolicy.privacyPolicy}}
      />
      <Stack.Screen
        name="EulaScreen"
        component={EulaScreen}
        options={{title: AppLocalizedStrings.eula.eula}}
      />
      <Stack.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{title: AppLocalizedStrings.aboutUs.aboutUs}}
      />
      <Stack.Screen
        name="ChangesPasswordScreen"
        component={ChangesPasswordScreen}
        options={{title: AppLocalizedStrings.changesPassword.changesPassword}}
      />
      <Stack.Screen
        name="TutorialScreen"
        component={TutorialScreen}
        options={{title: AppLocalizedStrings.tutorial.tutorial}}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{title: AppLocalizedStrings.notification.notification}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
const styles = StyleSheet.create({});
