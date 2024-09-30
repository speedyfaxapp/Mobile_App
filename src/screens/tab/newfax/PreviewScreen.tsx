//import libraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import {
  BottomTabScreenProps,
  HomeStackScreenProps,
} from '../../../navigation/navigator/types';
import SVG from '../../../assets/svg';
import AdaptiveButton from '../../../components/button/AdaptiveButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import ImageView from '../../../components/image/ImageView';
import DeviceInfo from 'react-native-device-info';
import * as HomeService from '../../../network/service/HomeService';
import {useNavigation} from '@react-navigation/native';
import FaxOnWayPopup from '../../../components/popup/FaxOnWayPopup';
import {useAppSelector} from '../../../store/Hooks';
import SigninWithApplePopup from '../../../components/popup/SigninWithApplePopup';
import {useIsFocused} from '@react-navigation/native';
import {updateCreditCount} from '../../../store/slices/SubscriptionSlice';
import {updateUser} from '../../../store/slices/AuthSlice';
import {store} from '../../../store/Store';
import {AppleLoginHelper} from '../../../utility/appleLoginHelper/appleLoginHelper';
import * as AuthService from '../../../network/service/Auth';
import * as FirebaseNotification from '../../../../src/notification/FirebaseNotification';

interface Props extends ViewProps {}

// Component
const PreviewScreen = (props: HomeStackScreenProps<'PreviewScreen'>) => {
  const {navigation, route} = props;

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);
  const isFocus = useIsFocused();

  const callingCode = route.params.callingCode;
  const mobileNumber = route.params.mobileNumber;
  const media: string[] = route.params.media;
  const coverPage = route.params.coverPage;
  const cancelHandler = route.params.cancelHandler;

  const corvBackImage = require('../../../../src/assets/images/corv2.png');

  useEffect(() => {
    profilHandler();
  }, [isFocus]);
  const creditCounts = useAppSelector(state => state.subscription.creditCount);
  const navigation2 =
    useNavigation<BottomTabScreenProps<'HistoryScreen'>['navigation']>();
  const profilHandler = async () => {
    if (!isLoggedIn || !isFocus) {
      return;
    }
    setLoading(true);
    try {
      const response = await HomeService.settingProfile();
      console.log(response);
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
    navigation.setOptions({
      title: 'Preview',
      headerRight: () => (
        <Text style={styles.creditsTitle}>
          {creditCounts}
          {AppLocalizedStrings.preview.credits}
        </Text>
      ),
    });
  }, [navigation, creditCounts]);

  const isLoggedIn = useAppSelector(state => state.auth.user);

  const appleLoginHandler = async () => {
    setVisibleLogin(false);
    const appleAuthRequestResponse = await AppleLoginHelper();
    console.log('response', appleAuthRequestResponse);
    if (appleAuthRequestResponse) {
      onContinueAppleLoginHandler(
        appleAuthRequestResponse?.user,
        appleAuthRequestResponse?.email,
        'apple',
      );
    }
  };

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
      const formData = new FormData();
      try {
        setLoading(true);
        formData.append('r_number', `+${callingCode}${mobileNumber}`);
        formData.append('txtDeviceId', deviceId);
        if (coverPage != undefined) {
          formData.append('fileToUpload', {
            uri:
              Platform.OS === 'ios'
                ? coverPage.uri.replace('file://', '')
                : coverPage.uri,
            name: 'cover',
          });
        }
        media.forEach(uri =>
          formData.append('fileToUpload', {
            uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
            name: 'image',
          }),
        );
        formData.append('txtCoverPage', coverPage == undefined ? '0' : '1');
        const response = await HomeService.sendNewFax(formData);
        console.warn('new fax res-->',response);
        setLoading(false);
        // navigationHandler();

        setVisible(true);
        cancelHandler();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const navigationHandler = () => {
    navigation2.navigate('HistoryScreen');
  };

  const onSendFaxHandler = async () => {
    const formData = new FormData();
    const deviceId = await DeviceInfo.getUniqueId();
    try {
      setLoading(true);
      formData.append('r_number', `+${callingCode}${mobileNumber}`);
      formData.append('txtDeviceId', deviceId);
      if (coverPage != undefined) {
        formData.append('fileToUpload', {
          uri:
            Platform.OS === 'ios'
              ? coverPage.uri.replace('file://', '')
              : coverPage.uri,
          name: 'image',
        });
      }
      media.forEach(uri =>
        formData.append('fileToUpload', {
          uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
          name: 'image',
        }),
      );
      formData.append('txtCoverPage', coverPage == undefined ? '0' : '1');
      const response = await HomeService.sendNewFax(formData);
      console.warn('new fax response---->',response)
      setLoading(false);
      // navigationHandler();

      // setVisible(true);
      Alert.alert('', AppLocalizedStrings.popup.itsWay, [
        {
          text: 'OK',
          onPress: () => {
            navigationHandler();
          },
        },
      ]);

      cancelHandler();
    } catch (error) {
      console.log('send fax err',error);
      setLoading(false);
    }
  };

  const goBackHandler = () => {
    navigation.goBack();
  };

  const onUserLoginHandler = () => {
    if (isLoggedIn) {
      onSendFaxHandler();
    } else {
      setVisibleLogin(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardMainView}>
        <View style={styles.headerMainView}>
          <Text style={styles.sendingTitle}>
            {AppLocalizedStrings.preview.sending}
          </Text>
          <View style={styles.headerView}>
            <SVG.FaxMachine width={17} height={17} style={styles.icon} />
            <Text style={styles.number}>
              {`+${callingCode} ${mobileNumber}`}
              {AppLocalizedStrings.preview.page + media.length}
            </Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {coverPage != undefined && (
            <ImageView source={coverPage?.uri} style={styles.image} />
          )}
          {media.map((item, index) => (
            <ImageView source={item} style={styles.image} key={index} />
          ))}
        </ScrollView>
      </View>
      <ImageBackground source={corvBackImage} style={styles.backgrundImage}>
        <View style={styles.deliveryTimeMain}>
          <Text style={styles.delivertTitle}>
            {AppLocalizedStrings.preview.deliveryTime}
          </Text>
          <View style={styles.timeView}>
            <Text style={styles.timeTitle}>
              {AppLocalizedStrings.preview.minutes}
            </Text>
          </View>
        </View>
        <View style={styles.sendButtonView}>
          <Text style={styles.bottomTitle}>
            {AppLocalizedStrings.preview.machine}
          </Text>
        </View>
        {!loading ? (
          <AdaptiveButton
            title={AppLocalizedStrings.preview.send}
            onPress={onUserLoginHandler}
            Icon={SVG.Send}
            iconSize={21}
            style={styles.buttonStyle}
          />
        ) : (
          <TouchableOpacity style={styles.buttonStyle2}>
            <ActivityIndicator size={'large'} color={Colors.white} />
            <Text style={styles.sending}>
              {AppLocalizedStrings.preview.sendingFax}
            </Text>
          </TouchableOpacity>
        )}
        {!loading ? (
          <AdaptiveButton
            title={AppLocalizedStrings.preview.cancel}
            style={styles.cancelStyle}
            type="light"
            onPress={goBackHandler}
          />
        ) : (
          <View style={styles.sandingFaxBottomView}>
            <Text style={styles.sandingFaxBottomTitle}>
              {AppLocalizedStrings.preview.hang}
            </Text>
            <SVG.Rocket width={15} height={15} />
          </View>
        )}

        <FaxOnWayPopup
          visible={visible}
          setVisible={setVisible}
          navigation={navigationHandler}
        />
        <SigninWithApplePopup
          visible={visibleLogin}
          setVisible={setVisibleLogin}
          appleLoginHandler={appleLoginHandler}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cadetGray,
    justifyContent: 'flex-end',
  },
  headerMainView: {
    backgroundColor: Colors.white,
    alignSelf: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(0.3),
    marginTop: hp(1),
  },
  creditsTitle: {
    ...Style.getTextStyle(16, 'Bold', Colors.primary),
  },
  cardMainView: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginTop: hp(2),
  },
  sendingTitle: {
    ...Style.getTextStyle(17, 'Bold', Colors.accent),
    textAlign: 'center',
  },
  sending: {
    ...Style.getTextStyle(18, 'Bold', Colors.white),
  },
  headerView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginRight: wp(2),
  },
  number: {
    ...Style.getTextStyle(17, 'Medium', Colors.accent),
  },
  image: {
    marginVertical: hp(2),
    width: 300,
    height: 350,
  },
  backgrundImage: {
    marginTop: hp(-10),
    elevation: 20,
    shadowColor: Colors.rangoonGreen,
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: -35,
  },
  bottomTitle: {
    ...Style.getTextStyle(15, 'Regular', Colors.accent),
    textAlign: 'center',
    paddingHorizontal: wp(5),
    width: wp(90),
    alignSelf: 'center',
    paddingTop: hp(0.4),
  },
  sendButtonView: {
    backgroundColor: Colors.seashell,
    marginHorizontal: wp(3),
    marginTop: hp(1),
  },
  buttonStyle: {
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.green,
    marginTop: hp(1.5),
    marginHorizontal: wp(5),
    borderRadius: 10,
  },
  buttonStyle2: {
    height: 80,
    width: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
    marginTop: hp(1),
  },
  cancelStyle: {
    backgroundColor: Colors.transparent,
    alignSelf: 'center',
    paddingHorizontal: wp(14),
    marginTop: hp(1),
    borderColor: Colors.transparent,
    marginBottom: hp(2),
  },
  sandingFaxBottomView: {
    flexDirection: 'row',
    paddingHorizontal: wp(5),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(1),
    marginBottom: hp(5),
  },
  sandingFaxBottomTitle: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.accent),
    paddingRight: wp(2),
    textAlign: 'center',
  },
  deliveryTimeMain: {
    paddingVertical: hp(4),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: hp(3),
    marginBottom: hp(-3),
  },
  timeView: {
    backgroundColor: Colors.blue,
    borderRadius: 10,
  },
  timeTitle: {
    ...Style.getTextStyle(16, 'Medium', Colors.white),
    paddingHorizontal: wp(2),
  },
  delivertTitle: {
    ...Style.getTextStyle(16, 'Medium', Colors.accent),
  },
});

//export component
export default PreviewScreen;
