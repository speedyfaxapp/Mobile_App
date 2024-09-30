//import libraries
import React, {useMemo, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Switch,
  Platform,
  Dimensions,
} from 'react-native';
import Style from '../../../constants/Style';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useNavigation} from '@react-navigation/native';
import {HomeStackScreenProps} from '../../../navigation/navigator/types';
import IAPManager, {IAP_PRODUCTS} from '../../../network/IAP';
import PlanHeaderBanner from './PlanHeaderBanner';
import {useAppSelector} from '../../../store/Hooks';
import AdaptiveButton from '../../button/AdaptiveButton';
import Toast from '../../../utility/toast/Toast';
import PlanCard from '../history/PlanCard';
import LoginPopup from '../../popup/LoginPopup';
import LoginPopupAfterRestore from '../../popup/LoginPopup';
import AppLoader from '../../indicator/AppLoader';
import {PLANEITEM} from '../../../data/PlaneItem';
import {SubscriptionIOS} from 'react-native-iap';
import AnimatedButton from '../../button/AnimatedButton';
import GradientButton from '../../button/LinearGradientButton';
import {AppleLoginHelper} from '../../../utility/appleLoginHelper/appleLoginHelper';
import DeviceInfo from 'react-native-device-info';
import * as AuthService from '../../../network/service/Auth';
import * as FirebaseNotification from '../../../../src/notification/FirebaseNotification';
import * as RNIap from 'react-native-iap';

interface Props extends ViewProps {}
const image = require('../../../assets/images/plane.jpg');

const items = Platform.select({
  ios: [
    'com.reed.speedyfax.yearly',
    'com.reed.speedyfax.weekly',
    'com.reed.speedyfax.monthly',
  ],
});

let purchaseUpdatedListener = null;
let purchaseErrorListener = null;
// Component
const PlanPage = (props: Props) => {
  const {style} = props;

  const getSubscription = (sku: string) => {
    return subscription.subscriptions.find(
      i => i.productId == sku,
    ) as SubscriptionIOS;
  };
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleRestore, setVisibleRestore] = useState(false);

  const [isPressed, setIsPressed] = useState(false);
  const subscription = useAppSelector(state => state.subscription);
  const isFreeTrail = useAppSelector(state => state?.auth?.user?.is_free_trail);
  const [plan, setPlan] = useState(
    getSubscription('com.reed.speedyfax.weekly'),
  );

  const [isEnabled, setIsEnabled] = useState(isFreeTrail == 0 ? true : false);
  useEffect(() => {
    getPayments();
    return () => {
      if (purchaseUpdatedListener) {
        purchaseUpdatedListener.remove();
      }
      if (purchaseErrorListener) {
        purchaseErrorListener.remove();
      }
    };
  }, []);
  const getPayments = async () => {
    if (Platform.OS == 'ios') {
      RNIap.clearProductsIOS();
      RNIap.clearTransactionIOS();
    } else if (Platform.OS == 'android') {
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
    }
    setLoading(true);
    RNIap.getProducts({skus: items})
      .then(response => {
        // let tempArray = [];
        // for (i = 0; i < items.length; i++) {
        //   for (let j = 0; j < response.length; j++) {
        //     if (items[i] == response[j].productId) {
        //       tempArray.push(response[j]);
        //     }
        //   }
        // }
        // console.log(
        //   "Products------------------------------------------>",
        //   items,
        //   response
        //   // tempArray
        // );
        // setProducts(tempArray);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        // AlertComponent({
        //   msg: error,
        // });
        // console.log(
        //   "Error getSubscriptions-------------------------------------------->",
        //   error
        // );
      });
    purchaseUpdatedListener = RNIap.purchaseUpdatedListener(async purchase => {
      try {
        // console.log(
        //   "checking the transactionReceipt------------>>RNIap purchaseUpdatedListener",
        //   purchase
        // );
        const receipt = purchase?.transactionReceipt;
        if (receipt) {
          try {
            const ackResult = await RNIap.finishTransaction(purchase);

            setLoading(false);
          } catch (ackErr) {
            // setLoading(false);
            console.warn('ackErr', ackErr);
          }
        }
      } catch (error) {
        setLoading(false);
        // console.log("error", error);
        let RESPONSE_CODE = 'E_ALREADY_OWNED';
        if (error.code === RESPONSE_CODE) {
          AlertComponent({
            msg: 'This payment account is already linked with another user.',
          });
        }
        // console.log("Error purchaseUpdatedListener.", error);
      }
    });

    purchaseErrorListener = RNIap.purchaseErrorListener(error => {
      setLoading(false);
      console.log('Error purchaseErrorListener', error);
      if (error.code) console.log('Error Code', error.code);
      if (error.message) console.log('Error Message', error.message);
      if (error.responseCode === 2) console.log('User Cancelled the purchase');
    });
  };

  let currentPlan: SubscriptionIOS | undefined;
  let period = '';
  if (isEnabled) {
    currentPlan = getSubscription('com.reed.speedyfax.weekly');
    period = 'week';
    // setPlan(getSubscription('com.reed.speedyfax.weekly'))
  }
  //  else if (isPressed) {
  //     currentPlan = getSubscription('com.reed.speedyfax.yearly');
  //     period = 'year';
  //   } /* else if (isEnabled) {
  //     currentPlan = getSubscription('com.reed.speedyfax.weekly');
  //     period = 'week';
  //   } */ else {
  //     currentPlan = getSubscription('com.reed.speedyfax.monthly');
  //     period = 'month';
  //   }

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const isLoggedIn = useAppSelector(state => state.auth.user) != null;

  const navigation =
    useNavigation<HomeStackScreenProps<'PlaneScreen'>['navigation']>();

  const navigationOnWayHandler = async () => {
    setVisible(false);
    const appleAuthRequestResponse = await AppleLoginHelper();
    console.log('response', appleAuthRequestResponse);
    if (appleAuthRequestResponse) {
      onContinueAppleLoginHandler(
        appleAuthRequestResponse?.user,
        appleAuthRequestResponse?.email,
        'apple',
      );
    }
    // navigation.navigate('SigninWithNumberScreen');
  };
  // const navigationOnWayHandlerRestore = async () => {
  //   setVisibleRestore(false);
  //   const appleAuthRequestResponse = await AppleLoginHelper()
  //   console.log("response", appleAuthRequestResponse)
  //   if (appleAuthRequestResponse) {
  //     onContinueAppleLoginRestoreHandler(appleAuthRequestResponse?.user, appleAuthRequestResponse?.email, 'apple');
  //   }
  //   // navigation.navigate('SigninWithNumberScreen');

  // };

  // const onContinueAppleLoginRestoreHandler = async (id: string, email: string, type: string) => {
  //   const deviceId = await DeviceInfo.getUniqueId();
  //   const fcm_token = await FirebaseNotification.getFCMToken()
  //   setLoading(true);
  //   try {
  //     const response = await AuthService.loginWithSocilMedia({
  //       txtDeviceId: deviceId,
  //       email: email,
  //       type: type,
  //       social_media_id: id,
  //       fcm_token: fcm_token
  //     });
  //     setLoading(false);
  //     if (currentPlan == null) {
  //       Toast.showToast('Please select any subscription plan');
  //       return;
  //     }
  //     try {
  //       setLoading(true);
  //       let result = await IAPManager.shared.restorePurchase();
  //       if (result) {
  //         Toast.showToast(
  //           'Congratulations, you have successfully restore your credit.',
  //           'Success',
  //         );
  //         setTimeout(() => {
  //           navigation.goBack();
  //         }, 2000);
  //       } else {
  //         Toast.showToast(
  //           'You have not pucrhaed any credit.',
  //           'Failure',
  //         );
  //         navigation.goBack();

  //       }

  //     } catch (error) {
  //       Toast.showToast((error as Error).message, 'Failure');
  //     } finally {
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onContinueAppleLoginHandler = async (
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
      if (currentPlan == null) {
        Toast.showToast('Please select any subscription plan');
        return;
      }
      if (
        currentPlan?.productId != subscription.activeSubscription?.product_id
      ) {
        try {
          setLoading(true);
          await IAPManager.shared.requestSubscriptionIOS(
            currentPlan?.productId,
            isEnabled,
          );
          Toast.showToast(
            'Congratulations, you have successfully subscribed',
            'Success',
          );
          setTimeout(() => {
            navigation.goBack();
          }, 2000);
        } catch (error) {
          Toast.showToast((error as Error).message, 'Failure');
        } finally {
          setLoading(false);
        }
      } else {
        Toast.showToast('You already subscribed this plan', 'Failure');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onTermNavigationHandler = () => {
    navigation.navigate('TermAndConditionsScreen');
  };

  const onPrivayNavigationHandler = () => {
    navigation.navigate('PrivacyPolicyScreen');
  };

  const handleButtonPress = () => {
    setIsPressed(!isPressed);
    setIsEnabled(false);
  };

  const onContinueHandler = async () => {
    if (!isLoggedIn) {
      setVisible(true);
      return;
    }
    // if (currentPlan == null) {
    //   Toast.showToast('Please select any subscription plan');
    // }
    // console.log(currentPlan?.productId,plan?.productId)
    // return
    if (plan?.productId != subscription.activeSubscription?.product_id) {
      try {
        setLoading(true);
        await IAPManager.shared.requestSubscriptionIOS(
          plan?.productId,
          isEnabled,
        );
        Toast.showToast(
          'Congratulations, you have successfully subscribed',
          'Success',
        );
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      } catch (error) {
        Toast.showToast((error as Error).message, 'Failure');
      } finally {
        setLoading(false);
      }
    } else {
      Toast.showToast('You already subscribed this plan', 'Failure');
    }
  };

  const onGoBackHandler = () => {
    navigation.goBack();
  };

  const onPurchaseCredit = async id => {
    try {
      const purchase = await RNIap.requestPurchase({sku: id});
      // Handle the successful purchase here
      console.log('Purchase successful:', purchase);
      // You can also call a server API to validate the purchase and provide the user with the purchased content
    } catch (err) {
      if (err.code === 'E_USER_CANCELLED') {
        console.log('User cancelled the purchase');
      } else {
        console.warn(err.code, err.message);
        alert(
          'Error',
          'There was an error with the purchase. Please try again later.',
        );
      }
    }
  };
  const onRestorePurchase = async () => {
    if (!isLoggedIn) {
      setVisibleRestore(true);
      return;
    }

    try {
      setLoading(true);
      let result = await IAPManager.shared.restorePurchase();
      if (result) {
        Toast.showToast(
          'Congratulations, you have successfully restore your credit.',
          'Success',
        );
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      } else {
        Toast.showToast('You have not pucrhaed any credit.', 'Failure');
        navigation.goBack();
      }
    } catch (error) {
      Toast.showToast((error as Error).message, 'Failure');
    } finally {
      setLoading(false);
    }
  };

  // const introductoryPriceNumberOfPeriodsIOS =
  //   currentPlan.introductoryPriceNumberOfPeriodsIOS ?? '';
  // const introductoryPriceSubscriptionPeriodIOS =
  //   currentPlan.introductoryPriceSubscriptionPeriodIOS ?? '';
  const introductoryPricePaymentModeIOS =
    currentPlan?.introductoryPricePaymentModeIOS ?? '';

  const offerString =
    introductoryPricePaymentModeIOS.length > 0
      ? '3-days free trail, then '
      : '';
  const calculateWeeklyAmount = from => {
    const currencyCode = getSubscription('com.reed.speedyfax.yearly')?.currency;
    const currencySymbol = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).formatToParts(1)[0].value;
    if (from == 'yearly') {
      let amount =
        (getSubscription('com.reed.speedyfax.yearly').price / 365) * 7;
      return currencySymbol + ' ' + amount.toFixed(2);
    } else if (from == 'monthly') {
      let amount =
        (getSubscription('com.reed.speedyfax.monthly').price / 30) * 7;
      return currencySymbol + ' ' + amount.toFixed(2);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.container}>
          <View style={{flex: 1.5}} />
          <PlanHeaderBanner />
          {isEnabled && (
            <Text
              style={[
                styles.freeTrailTitle,
                {
                  color: Colors.white,
                  alignSelf: 'center',
                },
              ]}>
              {'3-day free trial, then ' +
                getSubscription('com.reed.speedyfax.weekly')?.localizedPrice +
                '/week'}
            </Text>
          )}
          {isFreeTrail == 1 ? (
            <TouchableOpacity
              style={[
                styles.freeTrailView,
                {
                  borderColor:
                    plan?.productId == 'com.reed.speedyfax.weekly'
                      ? Colors.lightBlue
                      : Colors.white,
                },
              ]}
              onPress={() => {
                currentPlan = getSubscription('com.reed.speedyfax.weekly');
                period = 'week';
                setPlan(getSubscription('com.reed.speedyfax.weekly'));
                setIsEnabled(false);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    borderColor: Colors.white,
                    borderWidth: 2,
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    marginRight: 10,
                  }}>
                  {plan?.productId == 'com.reed.speedyfax.weekly' && (
                    <View
                      style={{
                        backgroundColor:
                          plan?.productId == 'com.reed.speedyfax.weekly'
                            ? Colors.lightBlue
                            : Colors.white,
                        borderWidth: 2,
                        height: 16,
                        width: 16,
                        borderRadius: 8,
                      }}
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.freeTrailTitle,
                    {
                      color:
                        plan?.productId == 'com.reed.speedyfax.weekly'
                          ? Colors.lightBlue
                          : Colors.white,
                    },
                  ]}>
                  {'Weekly'}
                </Text>
              </View>
              <Text
                style={[
                  styles.noPaymentTitle,
                  {
                    color:
                      plan?.productId == 'com.reed.speedyfax.weekly'
                        ? Colors.lightBlue
                        : Colors.white,
                  },
                ]}>
                {' '}
                {`${
                  getSubscription('com.reed.speedyfax.weekly')?.localizedPrice
                }/week`}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.freeTrailView,
                {borderColor: isEnabled ? Colors.lightBlue : Colors.white},
              ]}
              onPress={() => {
                currentPlan = getSubscription('com.reed.speedyfax.weekly');
                period = 'week';
                setPlan(getSubscription('com.reed.speedyfax.weekly'));
                setIsEnabled(true);
              }}>
              <Text
                style={[
                  styles.freeTrailTitle,
                  {
                    color:
                      plan?.productId == 'com.reed.speedyfax.weekly'
                        ? Colors.lightBlue
                        : Colors.white,
                  },
                ]}>
                {isEnabled
                  ? AppLocalizedStrings.plan.enableFreeTrial
                  : AppLocalizedStrings.plan.enable}
              </Text>
              <Switch
                trackColor={{false: Colors.grey, true: Colors.blue}}
                thumbColor={isEnabled ? Colors.white : Colors.white}
                ios_backgroundColor={Colors.switchLightGray}
                disabled
                onValueChange={val => {
                  setIsEnabled(val);
                  setIsPressed(false);
                }}
                value={isEnabled}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.freeTrailView,
              {
                borderColor:
                  plan?.productId == 'com.reed.speedyfax.yearly'
                    ? Colors.lightBlue
                    : Colors.white,
              },
            ]}
            onPress={() => {
              currentPlan = getSubscription('com.reed.speedyfax.yearly');
              console.log(currentPlan);
              period = 'year';
              setPlan(getSubscription('com.reed.speedyfax.yearly'));
              setIsEnabled(false);
            }}>
            <View style={styles.saveView}>
              <Text style={styles.saveTitle}>
                {AppLocalizedStrings.plan.save} 89%
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  borderColor:
                    plan?.productId == 'com.reed.speedyfax.yearly'
                      ? Colors.lightBlue
                      : Colors.white,
                  borderWidth: 2,
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  marginRight: 10,
                }}>
                {plan?.productId == 'com.reed.speedyfax.yearly' && (
                  <View
                    style={{
                      backgroundColor:
                        plan?.productId == 'com.reed.speedyfax.yearly'
                          ? Colors.lightBlue
                          : Colors.white,
                      borderWidth: 2,
                      height: 16,
                      width: 16,
                      borderRadius: 8,
                    }}
                  />
                )}
              </View>
              <View style={{alignItems: 'flex-start'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color:
                      plan?.productId == 'com.reed.speedyfax.yearly'
                        ? Colors.lightBlue
                        : Colors.white,
                  }}>
                  {'Yearly'}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color:
                      plan?.productId == 'com.reed.speedyfax.yearly'
                        ? Colors.lightBlue
                        : Colors.white,
                  }}>
                  {`${
                    getSubscription('com.reed.speedyfax.yearly')?.localizedPrice
                  }/year`}
                </Text>
              </View>
            </View>
            <Text style={styles.noPaymentTitle}>{`${calculateWeeklyAmount(
              'yearly',
            )}/week`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.freeTrailView,
              {
                borderColor:
                  plan?.productId == 'com.reed.speedyfax.monthly'
                    ? Colors.lightBlue
                    : Colors.white,
              },
            ]}
            onPress={() => {
              currentPlan = getSubscription('com.reed.speedyfax.monthly');
              period = 'month';
              setPlan(getSubscription('com.reed.speedyfax.monthly'));
              setIsEnabled(false);
            }}>
            <View style={styles.saveView}>
              <Text style={styles.saveTitle}>
                {AppLocalizedStrings.plan.save} 67%
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  borderColor:
                    plan?.productId == 'com.reed.speedyfax.monthly'
                      ? Colors.lightBlue
                      : Colors.white,
                  borderWidth: 2,
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  marginRight: 10,
                }}>
                {plan?.productId == 'com.reed.speedyfax.monthly' && (
                  <View
                    style={{
                      backgroundColor:
                        plan?.productId == 'com.reed.speedyfax.monthly'
                          ? Colors.lightBlue
                          : Colors.white,
                      borderWidth: 2,
                      height: 16,
                      width: 16,
                      borderRadius: 8,
                    }}
                  />
                )}
              </View>
              <View style={{alignItems: 'flex-start'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color:
                      plan?.productId == 'com.reed.speedyfax.monthly'
                        ? Colors.lightBlue
                        : Colors.white,
                  }}>
                  {'Monthly'}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color:
                      plan?.productId == 'com.reed.speedyfax.monthly'
                        ? Colors.lightBlue
                        : Colors.white,
                  }}>
                  {`${
                    getSubscription('com.reed.speedyfax.monthly')
                      ?.localizedPrice
                  }/month`}
                </Text>
              </View>
            </View>
            <Text style={styles.noPaymentTitle}>{`${calculateWeeklyAmount(
              'monthly',
            )}/week`}</Text>
          </TouchableOpacity>
          <GradientButton
            onPress={onContinueHandler}
            title={isEnabled ? '3 Day Free Trial' : 'Continue'}
          />
          {/* <TouchableOpacity
            onPress={handleButtonPress}
            style={
              isPressed ? styles.subscribeView : styles.subscribeViewBgColor
            }>
            <View style={styles.saveView}>
              <Text style={styles.saveTitle}>
                {AppLocalizedStrings.plan.save} 89%
              </Text>
            </View>
            <Text style={styles.subscribeTitle}>
              {`Subscribe Annually \n${getSubscription('com.reed.speedyfax.yearly')?.localizedPrice
                }`}
            </Text>
          </TouchableOpacity> */}

          {isEnabled ? (
            <View style={styles.noPaymentView}>
              <SVG.Score />
              <Text
                style={[styles.noPaymentTitle, {marginTop: 0, marginLeft: 5}]}>
                {AppLocalizedStrings.plan.noPayment}
              </Text>
            </View>
          ) : (
            <View style={styles.noPaymentView}>
              <SVG.Score />
              {plan?.productId == 'com.reed.speedyfax.monthly' ?
              <Text
                style={[styles.noPaymentTitle, {marginTop: 0, marginLeft: 5}]}>
                {`Just ${calculateWeeklyAmount('monthly')}/week`}
              </Text>
              :
               <Text
                style={[styles.noPaymentTitle, {marginTop: 0, marginLeft: 5}]}>
                {`Just ${calculateWeeklyAmount('yearly')}/week`}
              </Text>
              }
            </View>
          )}

          {/* {isPressed ? (
            <View style={styles.noPaymentView}>
              <SVG.Score />
              <Text style={styles.noPaymentTitle}>eeeeeeeee</Text>
            </View>
          ) : null} */}

          {/* <AdaptiveButton
            onPress={onRestorePurchase}
            title={AppLocalizedStrings.plan.restor}
            style={styles.restorButton}
          /> */}

          {/* <AdaptiveButton
            onPress={() => { onPurchaseCredit("com.reed.speedyfax.150credits") }}
            title={"Purchase Credit"}
            style={styles.restorButton}
          /> */}
          {/* <AdaptiveButton
            onPress={() => { onPurchaseCredit("com.reed.speedyfax.10credits") }}
            title={"Purchase Credit two"}
            style={styles.restorButton}
          /> */}
          {/* <View style={{flex: 0.5}} /> */}
          <View style={styles.policyView}>
            <TouchableOpacity onPress={onTermNavigationHandler}>
              <Text style={styles.policyTitle}>
                {AppLocalizedStrings.plan.terms}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPrivayNavigationHandler}>
              <Text style={styles.policyTitle}>
                {AppLocalizedStrings.plan.privacyPolicy}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      {/* <View style={styles.paragraphView}>
        <Text style={styles.notesTitle}>{AppLocalizedStrings.plan.notes}</Text>
        <Text style={styles.notesTitle}>
          {AppLocalizedStrings.plan.subscriptions}
        </Text>
        {PLANEITEM.map((item, index) => (
          <View key={index}>
            <Text style={styles.paragraphTitle}>{item.title}</Text>
          </View>
        ))}
      </View> */}
      <AppLoader loading={loading} />
      <LoginPopup
        visible={visible}
        setVisible={setVisible}
        navigation={navigationOnWayHandler}
      />
      {/* <LoginPopupAfterRestore
        visible={visibleRestore}
        setVisible={setVisibleRestore}
        navigation={navigationOnWayHandlerRestore}
      /> */}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    marginHorizontal: wp(7),
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  continueButton: {
    backgroundColor: Colors.blue,
    marginTop: hp(1.3),
    height: 50,
    borderRadius: 8,
  },
  animationView: {
    height: 50,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  animationText: {
    ...Style.getTextStyle(19, 'Bold', Colors.white),
  },
  titleView: {
    height: hp(8),
    justifyContent: 'center',
  },
  restorButton: {
    marginTop: hp(3),
    alignSelf: 'center',
  },
  saveView: {
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 30,
    // marginTop: hp(-0.8),
    position: 'absolute',
    right: 1,
    top: 0,
    zIndex: 123,
  },
  saveTitle: {
    ...Style.getTextStyle(12, 'Bold', Colors.accent),
    paddingHorizontal: wp(7),
  },
  subscribeView: {
    backgroundColor: Colors.blackBlue,
    borderRadius: 13,
    marginTop: hp(2),
  },
  subscribeViewBgColor: {
    borderRadius: 13,
    marginTop: hp(2),
    backgroundColor: Colors.grey,
  },
  subscribeTitle: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.white),
    textAlign: 'center',
    lineHeight: 18,
    paddingTop: hp(0.7),
  },
  policyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2.5),
    marginTop: hp(2),
  },
  policyTitle: {
    ...Style.getTextStyle(13, 'Regular', Colors.grey),
    textDecorationLine: 'underline',
  },
  paragraphView: {
    paddingTop: hp(1),
    paddingBottom: hp(3),
    backgroundColor: Colors.accent,
    paddingHorizontal: wp(5),
  },
  notesTitle: {
    ...Style.getTextStyle(16, 'Regular', Colors.white),
    lineHeight: 20,
  },
  paragraphTitle: {
    ...Style.getTextStyle(16, 'Regular', Colors.white),
    paddingVertical: hp(0.5),
  },
  // headerIcon: {
  //   padding: 10,
  // },
  // {}
  freeTrailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, .2)',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginHorizontal: -20,
    paddingVertical: hp(1),
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    borderRadius: 35,
    height: 60,
    marginTop: hp(2),
  },
  freeTrailTitle: {
    ...Style.getTextStyle(18, 'SemiBold', Colors.white),
  },
  title: {
    ...Style.getTextStyle(18, 'SemiBold', Colors.white),
    textAlign: 'center',
    lineHeight: 22,
  },
  noPaymentView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(2),
  },
  noPaymentTitle: {
    ...Style.getTextStyle(16, 'Bold', Colors.white),
    paddingHorizontal: wp(2),
    marginTop: 12,
    marginLeft: 25,
  },
});

//export component
export default PlanPage;

// export default AnimatedButton;
