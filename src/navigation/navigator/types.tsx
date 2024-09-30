import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabScreenProps as BTSP} from '@react-navigation/bottom-tabs';
import {AuthMode} from '../../models/types/types';
import {CallingCode, CountryCode} from 'react-native-country-picker-modal';
import CoverPage from '../../models/interfaces/CoverPage';

// RootStack
export type RootStackParamList = {
  SplashScreen: undefined;
  HomeStackNavigator: NavigatorScreenParams<HomeStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

// BottomStack
export type BottomTabParamList = {
  NewFaxScreen: undefined;
  HistoryScreen: undefined;
  SettingsScreen: undefined;
};

export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BTSP<BottomTabParamList, T>,
    CompositeScreenProps<
      HomeStackScreenProps<keyof HomeStackParamList>,
      RootStackScreenProps<keyof RootStackParamList>
    >
  >;

// HomeStack
export type HomeStackParamList = {
  NotificationScreen: undefined;
  BottomTabStack: NavigatorScreenParams<BottomTabParamList>;
  FaxCoverPageScreen: {
    coverPage: CoverPage | undefined;
    onCapture: (page: CoverPage) => void;
  };
  PreviewScreen: {
    media: string[];
    mobileNumber: string;
    callingCode: CallingCode | undefined;
    coverPage: CoverPage | undefined;
    cancelHandler: () => void;
  };
  PlaneScreen: undefined;
  WebViewScreen: {url: string};
  LoginScreen: {authMode: AuthMode};
  SigninWithNumberScreen: undefined;
  SigninWithEmailScreen: undefined;
  ForgotPasswordScreen: undefined;
  OTPVerificationScreen: {
    phone?: string;
    email?: string;
    password?: string;
    userId?: number;
    type: 'login' | 'forgot_password';
    otp: number;
  };
  ResetPasswordScreen: {user_id: number};
  FAQScreen: undefined;
  TermAndConditionsScreen: undefined;
  PrivacyPolicyScreen: undefined;
  EulaScreen: undefined;
  AboutUsScreen: undefined;
  ChangesPasswordScreen: undefined;
  TutorialScreen: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    StackScreenProps<HomeStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
