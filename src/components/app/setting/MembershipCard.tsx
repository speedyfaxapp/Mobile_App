//import libraries
import React, {useEffect, useMemo, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  Linking,
  Image,
} from 'react-native';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import Colors from '../../../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import {BottomTabScreenProps} from '../../../navigation/navigator/types';
import SubscriptionType from './SubscriptionType';
import UnlimitedSubscription from './UnlimitedSubscription';
import SubscriptionCard from './SubscriptionCard';
import {useAppSelector} from '../../../store/Hooks';
import AdaptiveButton from '../../button/AdaptiveButton';
import SVG from '../../../assets/svg';
import {IAP_PRODUCTS} from '../../../network/IAP';
import LoginPopup from '../../popup/LoginPopup';
import {AppleLoginHelper} from '../../../utility/appleLoginHelper/appleLoginHelper';
import DeviceInfo from 'react-native-device-info';
import * as FirebaseNotification from '../../../../src/notification/FirebaseNotification';
import * as AuthService from '../../../network/service/Auth';
import {store} from '../../../store/Store';
import {updateUser} from '../../../store/slices/AuthSlice';
interface Props extends ViewProps {}

// Component
const MembershipCard = (props: Props) => {
  const {style} = props;

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = useAppSelector(state => state.auth.user) != null;
  useEffect(() => {
    console.log('isLogedIn==>>', isLoggedIn);
  }, [isLoggedIn]);

  const navigation =
    useNavigation<BottomTabScreenProps<'SettingsScreen'>['navigation']>();

  const navigationHandler = () => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    } else {
      navigation.navigate('PlaneScreen');
    }
    //
  };

  const cancelSubbscriptionHandler = () => {
    Linking.openURL('https://apps.apple.com/account/subscriptions');
  };

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const subscription = useAppSelector(state => state.subscription);
  console.log('subscription active---->',subscription.isActiveSubscription)
  const navigationOnWayHandlerPromoCode = async () => {
    const appleAuthRequestResponse = await AppleLoginHelper();
    if (appleAuthRequestResponse) {
      onContinueHandler(
        appleAuthRequestResponse?.user,
        appleAuthRequestResponse?.email,
        'apple',
      );
    }
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
      try {
        setOpenLoginModal(false);
        store.dispatch(updateUser(response.data));
        navigation.navigate('PlaneScreen');
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
  return (
    <View style={mainStyle}>
      <Text style={styles.balanceTitle}>
        {AppLocalizedStrings.setting.membership}
      </Text>
      {<UnlimitedSubscription />}
      {!subscription.isActiveSubscription && <SubscriptionType />}

      {isLoggedIn && subscription.isActiveSubscription ? (
        <View>
          <View style={styles.mainView}>
            {/* <View style={styles.unlimitedFaxView}>
              <SVG.Crown width={30} height={30} />
              <Text style={styles.unlimitedTitle}>
                {AppLocalizedStrings.setting.unlimited}
              </Text>
            </View>
            <Text style={styles.activeTitle}>
              {IAP_PRODUCTS.find(
                i => i.productId == subscription.activeSubscription?.product_id,
              )?.title +  ' ' + 
                "Active"}
            </Text> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/images/www.jpeg')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
              <Text style={styles.activeTitle}>
                {'Unlimited Faxes\n'}
                <Text style={styles.subActiveTitle}>{'World Wide'}</Text>
              </Text>
            </View>
            <Text style={[styles.activeTitle, {color: Colors.lightGray}]}>
              {'Active'}
            </Text>
          </View>
          {/* {subscription?.isActiveSubscription &&
          subscription.activeSubscription?.txtCancelPlan == 0 ? (
            <AdaptiveButton
              title={AppLocalizedStrings.setting.cancelSubscription}
              style={styles.subscripitionButton}
              textStyle={styles.textStyle}
              onPress={cancelSubbscriptionHandler}
            />
          ) : (
            subscription?.isActiveSubscription &&
            subscription.activeSubscription?.txtCancelPlan == 1 && ( */}
          {/* <AdaptiveButton
            title={AppLocalizedStrings.setting.subscription}
            style={styles.subscripitionButton}
            textStyle={styles.textStyle}
            onPress={navigationHandler}
          /> */}
          {/* )
          )} */}
        </View>
      ) : (
        <View />
        // <SubscriptionCard />
      )}
      {/* {isLoggedIn == false ? ( */}
      <AdaptiveButton
        title={'Unlimited Faxes'}
        style={styles.subscripitionButton}
        textStyle={styles.textStyle}
        onPress={navigationHandler}
      />
      {/* ) : (
        <View></View>
      )} */}
      <LoginPopup
        visible={openLoginModal}
        setVisible={setOpenLoginModal}
        navigation={navigationOnWayHandlerPromoCode}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(2),
    backgroundColor: Colors.white,
  },
  balanceTitle: {
    ...Style.getTextStyle(16, 'Bold', Colors.accent),
    paddingTop: hp(1),
    paddingBottom: hp(2),
  },
  unlimitedFaxView: {
    flexDirection: 'row',
  },
  unlimitedTitle: {
    ...Style.getTextStyle(18, 'SemiBold', Colors.accent),
    paddingHorizontal: wp(2),
    paddingTop: hp(0.4),
  },
  activeTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  subActiveTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  subscripitionButton: {
    backgroundColor: Colors.blue,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: Colors.blue,
    borderRadius: 30,
  },
  textStyle: {
    ...Style.getTextStyle(17, 'Bold', Colors.white),
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

//export component
export default MembershipCard;
