import {Alert, Linking, Platform} from 'react-native';
// @ts-ignore
import {AppInstalledChecker} from 'react-native-check-app-install';
import launchMailApp from 'react-native-mail-launcher';

export const openMailApp = async () => {
  if (Platform.OS == 'ios') {
    let isGmail = await AppInstalledChecker.checkURLScheme('googlegmail');
    if (isGmail) {
      Linking.openURL('googlegmail://');
    } else {
      launchMailApp();
    }
  } else {
    launchMailApp();
  }
};
