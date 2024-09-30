import {Platform} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';

const setupKeyboard = () => {
  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(true);
    KeyboardManager.setEnableDebugging(false);
    KeyboardManager.setKeyboardDistanceFromTextField(10);
    // KeyboardManager.setLayoutIfNeededOnUpdate(true);
    KeyboardManager.setEnableAutoToolbar(true);
    KeyboardManager.setToolbarDoneBarButtonItemText(AppLocalizedStrings.done);
    KeyboardManager.setToolbarManageBehaviourBy('subviews'); // "subviews" | "tag" | "position"
    KeyboardManager.setToolbarPreviousNextButtonEnable(false);
    KeyboardManager.setToolbarTintColor(Colors.accent); // Only #000000 format is supported
    KeyboardManager.setToolbarBarTintColor('#FFFFFF'); // Only #000000 format is supported
    KeyboardManager.setShouldShowToolbarPlaceholder(true);
    KeyboardManager.setOverrideKeyboardAppearance(false);
    KeyboardManager.setKeyboardAppearance('default'); // "default" | "light" | "dark"
    KeyboardManager.setShouldResignOnTouchOutside(true);
    KeyboardManager.setShouldPlayInputClicks(true);
    KeyboardManager.resignFirstResponder();
    // KeyboardManager.isKeyboardShowing().then(isShowing => {});
  }
};

export default setupKeyboard;
