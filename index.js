/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import setupKeyboard from './src/components/keyboard/KeyboardManager';
import InternetManager from './src/network/InternetManager';
import SocialLogin from './src/utility/firebase/SocialLogin';
import * as FirebaseNotification from './src/notification/FirebaseNotification';
import IAPManager from './src/network/IAP';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => {
  initialAppSetup();
  return App;
});

const initialAppSetup = () => {
  IAPManager.shared.setup();
  FirebaseNotification.configure();
  setupKeyboard();
  InternetManager.shared.setup();
  SocialLogin.configure();
};
