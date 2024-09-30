import React, {useEffect} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import RootNavigation from '../../navigation/RootNavigation';
import Colors from '../../theme/Colors';
import Video from 'react-native-video';
import SharedPreference from '../../storage/SharedPreference';
import {updateUser} from '../../store/slices/AuthSlice';
import {updateRemindMe} from '../../store/slices/SubscriptionSlice';
import {store} from '../../store/Store';
import {User} from '../../models/interfaces/api/response/OTPVerificationResponse';
import {updateCreditCount} from '../../store/slices/SubscriptionSlice';
import {fetchSubscriptionFromServer} from '../../network/service/HomeService';
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';

const SplashScreen = () => {
  const inAppUpdates = new SpInAppUpdates(true);
  useEffect(() => {
    setTimeout(async () => {
      checkAppUpdate();
      const user = await SharedPreference.getItem<User>('user');
      const isRemindMe = await SharedPreference.getItem('remindMe');
      console.log('kghh', isRemindMe);
      store.dispatch(updateRemindMe(isRemindMe));
      if (user != null) {
        let savedTotalCredits = await SharedPreference.getItem<string>(
          'CreditCnt',
        );
        if (savedTotalCredits == null) {
          const txtTotalCredit =
            (typeof user.txtTotalCredit == 'string'
              ? parseInt(user.txtTotalCredit)
              : user?.txtTotalCredit) ?? 0;
          await SharedPreference.setItem('CreditCnt', `${txtTotalCredit}`);
          savedTotalCredits = `${txtTotalCredit}`;
        }
        store.dispatch(updateUser(user));
        store.dispatch(updateCreditCount(parseInt(savedTotalCredits)));
        try {
          await fetchSubscriptionFromServer();
        } catch (error) {}
      }
      RootNavigation.replace('HomeStackNavigator');
    }, 3000);
  }, []);

  const checkAppUpdate = () => {
    inAppUpdates
      .checkNeedsUpdate()
      .then(result => {
        if (result.shouldUpdate) {
          const updateOptions: StartUpdateOptions = Platform.select({
            ios: {
              title: 'Update available',
              message:
                'There is a new version of the app available on the App Store, do you want to update it?',
              buttonUpgradeText: 'Update',
              buttonCancelText: 'Cancel',
            },
            android: {
              updateType: IAUUpdateKind.FLEXIBLE,
            },
          });
          inAppUpdates.startUpdate(updateOptions);
        }
      })
      .catch(async error => {
        // alert(error)
        console.log('inappupdate catch error', error);
      });
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/video/video2.mp4')}
        repeat={true}
        resizeMode="cover"
        style={styles.backgroundVideo}
      />
    </View>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.aliceBlue,
  },
  backgroundVideo: {
    flex: 1,
  },
});
