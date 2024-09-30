import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {BottomTabScreenProps} from '../../../navigation/navigator/types';
import Style from '../../../constants/Style';
import SettingHeaderBanner from '../../../components/app/setting/SettingHeaderBanner';
import {SETTING} from '../../../data/SettingDataProvider';
import SettingChipTitleView from '../../../components/app/common/SettingChipTitleView';
import {AppLocalizedStrings} from '../../../localization/Localization';
import * as HomeService from '../../../network/service/HomeService';
import History from '../../../models/interfaces/HistoryResponce';
import {useIsFocused} from '@react-navigation/native';
import {useAppSelector} from '../../../store/Hooks';
import AppLoader from '../../../components/indicator/AppLoader';
import Setting from '../../../models/interfaces/api/Setting';
import * as StoreReview from 'react-native-store-review';
import {updateCreditCount, updateRatingSubmission} from '../../../store/slices/SubscriptionSlice';
import {updateUser} from '../../../store/slices/AuthSlice';
import {store} from '../../../store/Store';
import {AppleLoginHelper} from '../../../utility/appleLoginHelper/appleLoginHelper';
import DeviceInfo from 'react-native-device-info';
import * as AuthService from '../../../network/service/Auth';
import * as FirebaseNotification from '../../../../src/notification/FirebaseNotification';

const SettingsScreen = (props: BottomTabScreenProps<'SettingsScreen'>) => {
  const {navigation} = props;

  const [subscription, setSubscription] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<History[]>();
  const isFocus = useIsFocused();

  const isLoggedIn = useAppSelector(state => state.auth.user) != null;

  useEffect(() => {
    navigation.setOptions({
      title: AppLocalizedStrings.bottomTabHeader.setting,
    });
  }, [navigation]);

  const signinWithMobile = async () => {
    const appleAuthRequestResponse = await AppleLoginHelper();
    console.log('response is', appleAuthRequestResponse);
    if (appleAuthRequestResponse) {
      onContinueHandler(
        appleAuthRequestResponse?.user,
        appleAuthRequestResponse?.email,
        'apple',
      );
    }
    // navigation.navigate('SigninWithNumberScreen');
  };
  const onContinueHandler = async (id: string, email: string, type: string) => {
    const deviceId = await DeviceInfo.getUniqueId();
    const fcm_token = await FirebaseNotification.getFCMToken();
    setLoading(true);
    try {
      const response = await AuthService.loginWithSocilMedia({
        txtDeviceId: deviceId,
        email: email,
        type: type,
        social_media_id: id,
        fcm_token: fcm_token,
      });
      setLoading(false);
      setLoading(true);
      try {
        const response = await HomeService.settingProfile();
        console.log(response);
        setData(response.data);
        store.dispatch(updateUser(response.data));
        store.dispatch(
          updateCreditCount(parseInt(response?.data?.txtTotalCredit)),
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const profilHandler = async () => {
    if (!isLoggedIn) {
      return;
    }
    setLoading(true);
    try {
      const response = await HomeService.settingProfile();
      console.log(response);
      setData(response.data);
      store.dispatch(updateUser(response.data));
      store.dispatch(
        updateCreditCount(parseInt(response?.data?.txtTotalCredit)),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    profilHandler();
  }, [isFocus]);

  const onActionHandler = (item: Setting) => {
    if (item.title === 'Rate Us') {
      StoreReview.requestReview();
       store.dispatch(
        updateRatingSubmission(true),
      );
    } else {
      item.routeName != undefined && navigation.navigate(item.routeName);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SettingHeaderBanner
          signinWithMobile={signinWithMobile}
          subscription={subscription}
          setSubscription={setSubscription}
          data={data}
        />
        <Text style={styles.appTitle}>
          {AppLocalizedStrings.setting.information}
        </Text>

        {SETTING.map((item, index) => (
          <SettingChipTitleView
            title={item.title}
            key={index}
            onPress={onActionHandler.bind(this, item)}
          />
        ))}
        <Text style={styles.copyRightTitle}>
          {AppLocalizedStrings.setting.copyright}
        </Text>
      </ScrollView>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default SettingsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softPeach,
  },
  copyRightTitle: {
    ...Style.getTextStyle(15, 'Regular', Colors.accent),
    textAlign: 'center',
    paddingVertical: hp(0.5),
  },
  appTitle: {
    ...Style.getTextStyle(16, 'Bold', Colors.accent),
    paddingTop: hp(1),
    paddingBottom: hp(1.5),
    paddingHorizontal: wp(5),
  },
});
