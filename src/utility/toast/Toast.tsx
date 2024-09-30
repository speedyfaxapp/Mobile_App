import Snackbar from 'react-native-snackbar';
import Colors from '../../theme/Colors';

class Toast {
  constructor() {}
  public static showToast = (
    message?: string,
    type: 'Success' | 'Failure' | 'Warning' | 'Alert' = 'Alert',
  ) => {
    if (message != null && message.length > 0) {
      Snackbar.show({
        text: message,
        backgroundColor: Toast.getColor(type),
        textColor: Colors.white,
        duration: 3000,
      });
    }
  };

  private static getColor = (
    type: 'Success' | 'Failure' | 'Warning' | 'Alert' = 'Alert',
  ) => {
    switch (type) {
      case 'Success':
        return Colors.green;
      case 'Failure':
        return Colors.orange;
      case 'Warning':
        return Colors.yellow;
      default:
        return Colors.primary;
    }
  };
}

export default Toast;
