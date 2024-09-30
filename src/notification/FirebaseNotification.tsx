import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';

const kChannelId = 'SpeedyFax-channel-id';
const kChannelName = 'SpeedyFax-channel';

// Get FCM token
export const getFCMToken = async () => {
  const fcmToken = await messaging().getToken();
  console.log('FCM Token:', fcmToken);
  return fcmToken;
};

// Create Channel for Android only
const createAndroidChannel = () => {
  PushNotification.createChannel(
    {
      channelId: kChannelId,
      channelName: kChannelName,
      importance: Importance.HIGH,
      playSound: true,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
};

export const configure = () => {
  // Create Channel for Android
  if (Platform.OS == 'android') {
    createAndroidChannel();
  }

  // Configure notifications
  PushNotification.configure({
    onRegister: token => {
      console.log('Device Token: ', token);
    },
    onNotification: message => {
      console.log('FCM Message: ', message);
      if (message.userInteraction == false) {
        showLocalNotification(message);
      } else {
        console.log('User Tapped On Notification');
      }
      message.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onRegistrationError: error => {
      console.log('Remote Error:', error);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};

// Show local notification
export const showLocalNotification = (remoteMessage: Record<string, any>) => {
  PushNotification.localNotification({
    title: remoteMessage['title'],
    message: remoteMessage['message'],
    vibrate: true,
    channelId: kChannelId,
    soundName: 'default',
  });
};
