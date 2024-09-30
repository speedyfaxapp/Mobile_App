//import libraries
import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
  Image,
} from 'react-native';
import Style from '../../../constants/Style';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useNavigation} from '@react-navigation/native';
import {BottomTabScreenProps} from '../../../navigation/navigator/types';
import PromoCode from '../../popup/PromoCodeModal';
import UserDeletePopup from '../../popup/UserDeletePopup';
import * as CrispChatSDK from 'react-native-crisp-chat-sdk';
import {useAppSelector} from '../../../store/Hooks';
import Share from '../../../utility/share/Share';
import Toast from '../../../utility/toast/Toast';
import IAPManager, {IAP_PRODUCTS} from '../../../network/IAP';
import AppLoader from '../../indicator/AppLoader';
import LoginPopupAfterRestore from '../../popup/LoginPopup';
import {AppleLoginHelper} from '../../../utility/appleLoginHelper/appleLoginHelper';
import DeviceInfo from 'react-native-device-info';
import * as HomeService from '../../../network/service/HomeService';
import * as FirebaseNotification from '../../../../src/notification/FirebaseNotification';
import * as AuthService from '../../../network/service/Auth';
import {updateCreditCount} from '../../../store/slices/SubscriptionSlice';
import {store} from '../../../store/Store';
import LoginPopup from '../../popup/LoginPopup';
import {updateUser} from '../../../store/slices/AuthSlice';

interface Props extends ViewProps {
  data: any;
}

// Component
const GeneralInformationCard = (props: Props) => {
  const {style, data} = props;
  // const {connected, purchaseHistory, getPurchaseHistory} = useIAP();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleRestore, setVisibleRestore] = useState(false);
  const [promoModalVisible, setPromoModalVisible] = useState(false);
  const [promoCodeText, setPromoCodeText] = useState('');
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const navigation =
    useNavigation<BottomTabScreenProps<'SettingsScreen'>['navigation']>();

  const onNavigationHandler = () => {
    navigation.navigate('ChangesPasswordScreen');
  };

  const onNavigationFAQHandler = () => {
    navigation.navigate('FAQScreen');
  };

  const onNotificationNavigationHandler = () => {
    navigation.navigate('NotificationScreen');
  };

  const onSupportHandler = () => {
    CrispChatSDK.show();
  };
  const onSubmitPromo = async (promoCode: string) => {
    try {
      // setLoading(true);
      const response = await HomeService.postPromoCode({
        promoCode: promoCode,
      });
      setLoading(false);
      console.log('======================================', response);
     // console.log('======================================',response);
      if (response) {
        store.dispatch(updateCreditCount(parseInt(response?.data)));
        return Toast.showToast('Promo Code successfully redeemed');
      }
      if (response == undefined) {
        return Toast.showToast('Promo Code is invalid', 'Failure');
      }
    } catch (error) {
      console.log('error=========================>>', error);

      setLoading(false);
    }
  };
  const handleSubmit = (text: string) => {
    setPromoCodeText(text);
    onSubmitPromo(text);
    setPromoModalVisible(false);
  };
  const isLoggedIn = useAppSelector(state => state.auth.user) != null;

  const navigationOnWayHandlerPromoCode = async () => {
    setVisibleRestore(false);
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
      setLoading(false);
      setLoading(true);
      try {
        const response = await HomeService.settingProfile();
        console.log(response);
        setOpenLoginModal(false);
        setPromoModalVisible(true);
        store.dispatch(updateUser(response.data));
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
  const navigationOnWayHandlerRestore = async () => {
    setVisibleRestore(false);
    const appleAuthRequestResponse = await AppleLoginHelper();
    if (appleAuthRequestResponse) {
      onContinueAppleLoginRestoreHandler(
        appleAuthRequestResponse?.user,
        appleAuthRequestResponse?.email,
        'apple',
      );
    }
  };

  const onContinueAppleLoginRestoreHandler = async (
    id: string,
    email: string,
    type: string,
  ) => {
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
      try {
        setLoading(true);
        let result = await IAPManager.shared.restorePurchase();
        if (result) {
          Toast.showToast(result?.message);
        } else {
          Toast.showToast(result?.message);
        }
      } catch (error) {
        Toast.showToast((error as Error).message, 'Failure');
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onActionHandler = () => {
    Share.share(
      'https://apps.apple.com/in/app/speedyfax-send-fax-from-iphone/id1211097835',
    );
  };

  const onRestorePurchase = async () => {
    if (!isLoggedIn) {
      setVisibleRestore(true);
      return;
    }
    try {
      setLoading(true);
      let result = await IAPManager.shared.restorePurchase();
     // console.log('fgcnvc', result);
      if (result) {
        Toast.showToast(result?.message);
      } else {
        Toast.showToast(result?.message);
      }
    } catch (error) {
      Toast.showToast((error as Error).message, 'Failure');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <View style={styles.line}></View>
      <Text style={mainStyle}>{AppLocalizedStrings.setting.application}</Text>
      <View style={styles.line}></View>
      {/* <TouchableOpacity
        style={styles.informationMainView}
        onPress={onRestorePurchase}>
        <View style={styles.informationView}>
          <View style={styles.iconAndTitleView}>
            <View style={styles.iconView}>
              <Image
              source={require('../../../assets/images/restore_credits.png')}
              
                style={[styles.informationIcons,{width:20,height:20}]}
              />
            </View>
            <Text style={styles.informatioTitle}>
              {AppLocalizedStrings.setting.recoverCredits}
            </Text>
          </View>
        </View>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.informationMainView}
        onPress={onSupportHandler}>
        <View style={styles.informationView}>
          <View style={styles.iconAndTitleView}>
            <View style={styles.iconView}>
              <SVG.LiveChat
                width={20}
                height={20}
                style={styles.informationIcons}
              />
            </View>
            <Text style={styles.informatioTitle}>
              {AppLocalizedStrings.setting.contactSupport}
            </Text>
            <SVG.LiveChat width={55} height={55} style={styles.icon} />
          </View>
          <Text style={styles.informatioTitle}>{data?.txtName}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.informationMainView}
        onPress={() => {
          if (!isLoggedIn) {
            setOpenLoginModal(true);
            return;
          } else {
            setPromoModalVisible(true);
          }
        }}>
        <View style={styles.informationView}>
          <View style={styles.iconAndTitleView}>
            <View style={styles.iconView}>
              <Image
                source={require('../../../assets/images/promo_codes.png')}
                style={[styles.informationIcons, {width: 20, height: 20}]}
              />
            </View>
            <Text style={styles.informatioTitle}>
              {AppLocalizedStrings.setting.promoCode}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.line}></View>
      <TouchableOpacity
        style={styles.informationMainView}
        onPress={onNotificationNavigationHandler}>
        <View style={styles.informationView}>
          <View style={styles.iconAndTitleView}>
            <View style={styles.iconView}>
              <View style={styles.notificationView}>
                <Text style={styles.notificationNumber}>0</Text>
              </View>
              <SVG.Bell
                width={13}
                height={18}
                style={styles.informationIcons2}
              />
            </View>
            <Text style={styles.informatioTitle}>
              {AppLocalizedStrings.setting.enablePushNotification}
            </Text>
          </View>
          <Text style={styles.informatioTitle}>{data?.txtName}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.line}></View>
      <View style={styles.line}></View>
      <TouchableOpacity
        onPress={onNavigationFAQHandler}
        style={styles.informationMainView}>
        <View style={styles.informationView}>
          <View style={styles.iconAndTitleView}>
            <View style={styles.iconView}>
              <SVG.Quation
                width={20}
                height={20}
                style={styles.informationIcons}
              />
            </View>
            <Text style={styles.informatioTitle}>
              {AppLocalizedStrings.setting.faq}
            </Text>
          </View>
          <Text style={styles.informatioTitle}>{data?.txtName}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.line}></View>
      <View style={styles.line}></View>
      <TouchableOpacity
        onPress={onActionHandler}
        style={styles.informationMainView}>
        <View style={styles.informationView}>
          <View style={styles.iconAndTitleView}>
            <View style={styles.iconView}>
              <SVG.Share
                width={16}
                height={16}
                style={styles.informationIcons}
              />
            </View>
            <Text style={styles.informatioTitle}>
              {AppLocalizedStrings.setting.tellFriend}
            </Text>
          </View>
          <Text style={styles.informatioTitle}>{data?.txtName}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.line}></View>

      {isLoggedIn ? (
        <View>
          <View style={styles.line}></View>
          {/* <TouchableOpacity
            style={styles.informationMainView}
            onPress={onNavigationHandler}>
            <View style={styles.informationView}>
              <View style={styles.iconAndTitleView}>
                <View style={styles.iconView}>
                  <SVG.Lock
                    width={16}
                    height={16}
                    style={styles.informationIcons}
                  />
                </View>
                <Text style={styles.informatioTitle}>
                  {AppLocalizedStrings.setting.changePassword}
                </Text>
              </View>
              <Text style={styles.informatioTitle}>{data?.txtName}</Text>
            </View>
          </TouchableOpacity> */}
          <View style={styles.line}></View>
          <View style={styles.line}></View>
          <View style={styles.informationMainView}>
            <TouchableOpacity
              style={styles.informationView}
              onPress={() => setVisible(true)}>
              <View style={styles.iconAndTitleView}>
                <View style={styles.deleteIconView}>
                  <SVG.Delete
                    fill={Colors.monza}
                    width={15}
                    height={15}
                    style={styles.informationIcons}
                  />
                </View>
                <Text style={styles.deleteTitle}>
                  {AppLocalizedStrings.setting.delete}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      <UserDeletePopup visible={visible} setVisible={setVisible} />
      <AppLoader loading={loading} />
      <PromoCode
        visible={promoModalVisible}
        onClose={() => setPromoModalVisible(false)}
        onSubmit={handleSubmit}
      />
      <LoginPopup
        visible={openLoginModal}
        setVisible={setOpenLoginModal}
        navigation={navigationOnWayHandlerPromoCode}
      />
      <LoginPopupAfterRestore
        visible={visibleRestore}
        setVisible={setVisibleRestore}
        navigation={navigationOnWayHandlerRestore}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    ...Style.getTextStyle(16, 'Bold', Colors.accent),
    paddingTop: hp(1),
    paddingBottom: hp(1.5),
    paddingHorizontal: wp(5),
  },
  informationMainView: {
    backgroundColor: Colors.white,
    paddingVertical: hp(1.5),
  },
  informationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
  },
  iconAndTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  iconView: {
    backgroundColor: Colors.border,
    width: 31,
    height: 31,
    justifyContent: 'center',
    borderRadius: 100,
    marginRight: wp(3),
  },
  deleteIconView: {
    backgroundColor: '#F3C5C7',
    width: 31,
    height: 31,
    justifyContent: 'center',
    borderRadius: 100,
    marginRight: wp(3),
  },
  informationIcons: {
    alignSelf: 'center',
  },
  icon: {
    marginLeft: wp(4),
  },
  informationIcons2: {
    alignSelf: 'center',
    marginTop: hp(-0.5),
  },
  deleteTitle: {
    ...Style.getTextStyle(18, 'Regular', Colors.monza),
  },
  informatioTitle: {
    ...Style.getTextStyle(18, 'Regular', Colors.accent),
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor: '#e8e6e6',
  },
  notificationView: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    width: 14,
    height: 14,
    marginHorizontal: wp(5),
    marginTop: hp(-0.8),
  },
  notificationNumber: {
    textAlign: 'center',
    ...Style.getTextStyle(10, 'Medium', Colors.white),
    marginTop: hp(-0.1),
  },
});

//export component
export default GeneralInformationCard;
