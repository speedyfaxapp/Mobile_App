import {
  Alert,
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../../theme/Colors';
import SendTo from '../../../components/app/newfax/SendTo';
import AddDocumentBanner from '../../../components/app/newfax/AddDocumentBanner';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import FreeFaxBanner from '../../../components/app/newfax/FreeFaxBanner';
import {BottomTabScreenProps} from '../../../navigation/navigator/types';
import {CallingCode, CountryCode} from 'react-native-country-picker-modal';
import Style from '../../../constants/Style';
import DocumentScanner from 'react-native-document-scanner-plugin';
import DocumentPicker from 'react-native-document-picker';
import DocumentBanner from '../../../components/app/newfax/DocumentBanner';
import ImagePicker from 'react-native-image-crop-picker';
import AppLoader from '../../../components/indicator/AppLoader';
import {convertImageToGreyScale} from '../../../utility/helper/image';
import CoverPage from '../../../models/interfaces/CoverPage';
import AdaptiveButton from '../../../components/button/AdaptiveButton';
import SVG from '../../../assets/svg';
import CoverPageBanner from '../../../components/app/newfax/CoverPageBanner';
import * as AuthService from '../../../network/service/Auth';
import * as HomeService from '../../../network/service/HomeService';
import * as FirebaseNotification from '../../../../src/notification/FirebaseNotification';
import DeviceInfo from 'react-native-device-info';
import ZoomInZoomOutPreview from '../../../components/ZoomInZoomOutPreview';
import LoginPopup from '../../../components/popup/LoginPopup';
import {AppleLoginHelper} from '../../../utility/appleLoginHelper/appleLoginHelper';
import IAPManager from '../../../network/IAP';
import Toast from '../../../utility/toast/Toast';
import {useAppSelector} from '../../../store/Hooks';
import History from '../../../models/interfaces/HistoryResponce';
import {store} from '../../../store/Store';
import {updateCreditCount} from '../../../store/slices/SubscriptionSlice';
import {updateUser} from '../../../store/slices/AuthSlice';
import {useFocusEffect} from '@react-navigation/native';
import DocumentScannerCamera from './DocumentScannerCamera';

const NewFaxScreen = (props: BottomTabScreenProps<'NewFaxScreen'>) => {
  const {navigation, route} = props;
  const [countryCode, setCountryCode] = useState<CountryCode>();
  const [callingCode, setCallingCode] = useState<CallingCode>();
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [media, setMedia] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clearImage, setClearImage] = useState(false);
  const [coverPage, setCoverPage] = useState<CoverPage | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [data, setData] = useState<History[]>();
  const [visibleRestore, setVisibleRestore] = useState(false);
  const [showScanner,setShowScanner] = useState(false);

  console.log('==>>>', route?.params?.imageData);

  useEffect(() => {
    navigation.setOptions({
      title: AppLocalizedStrings.bottomTabHeader.newFax,
      headerLeft: () => (
        <AdaptiveButton
          title="Clear"
          type="text"
          style={styles.headerLeftButton}
          textStyle={styles.clearTitle}
          onPress={cancelHandler}
        />
      ),
      headerRight: () => (
        <View>
          {mobileNumber.length != 10 || media.length == 0 ? (
            <AdaptiveButton
              title="Next"
              style={styles.headerRightButton2}
              Icon={() => (
                <SVG.ArrowRight width={12} height={12} fill={Colors.white} />
              )}
              textStyle={styles.headerTextStyle}
            />
          ) : (
            <AdaptiveButton
              title="Next"
              style={styles.headerRightButton}
              onPress={nextPreviewHandler}
              Icon={() => (
                <SVG.ArrowRight width={12} height={12} fill={Colors.white} />
              )}
              textStyle={styles.headerTextStyle}
            />
          )}
        </View>
      ),
      headerTitleStyle: {
        marginBottom: hp(-3.5),
        ...Style.getTextStyle(23, 'Bold', Colors.accent),
      },
    });
  }, [navigation, media, mobileNumber]);
  useEffect(() => {
    if (clearImage) {
      setMedia([]);
      setCoverPage(undefined);
      setMobileNumber('');
    } else if (route?.params?.imageData) {
      const images = route?.params?.imageData;
      if (images && images.length > 0) {
        setMedia(images);
      }
    }
  }, [route?.params?.imageData, clearImage]);
  console.log('clearImage=========>', clearImage);
  useFocusEffect(
    React.useCallback(() => {
      setClearImage(false);
      return () => {
        // Cleanup function if needed
      };
    }, []),
  );
  const isLoggedIn = useAppSelector(state => state.auth.user) != null;

  const handleImagePress = index => {
    setIsModalOpen(true);
    setModalImageIndex(index);
  };

  const cancelHandler = () => {
    props.navigation.setParams({imageData: null});
    setMedia([]);
    setCoverPage(undefined);
    setMobileNumber('');
    setClearImage(true);
  };

  const onCountryCodeChange = (
    countCode: CountryCode,
    callCode: CallingCode,
  ) => {
    setCountryCode(countCode);
    setCallingCode(callCode);
  };
  console.log('media====>', media);

  const faxCoverPageHandler = () => {
    navigation.navigate('FaxCoverPageScreen', {
      coverPage: coverPage,
      onCapture: page => {
        setCoverPage(page);
        props.navigation.goBack();
      },
    });
  };

  const navigationOnWayHandlerRestore = async () => {
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
        setData(response.data);
        store.dispatch(updateUser(response.data));
        store.dispatch(
          updateCreditCount(parseInt(response?.data?.txtTotalCredit)),
        );
        navigation.navigate('PreviewScreen', {
          media: media,
          mobileNumber: mobileNumber,
          callingCode: callingCode,
          coverPage: coverPage,
          cancelHandler: cancelHandler,
        });
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

const photoLibraryHandler = async () => {
  try {
    setLoading(true);
    setVisible(false);
    const {width,height} = Dimensions.get('window');
    setTimeout(async () => {
      const image = await ImagePicker.openPicker({
        cropping: true,
        width:0,
        height:0,
       freeStyleCropEnabled: true,
      });

      console.warn('imagess----', image.path);
      const path = await convertImageToGreyScale(image.path);
      setMedia([...media, path]);

      setLoading(false);
    }, 500);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};


  const scanDocument = async () => {
    setVisible(false);
    // setShowScanner(true)
    setTimeout(async () => {
      if (
        Platform.OS === 'android' &&
        (await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        )) !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        Alert.alert(
          'Error',
          'User must grant camera permissions to use document scanner.',
        );
        return;
      }
      const imageDoc = await DocumentScanner.scanDocument();
      const scannedImages: any = imageDoc.scannedImages;
      if (scannedImages != undefined) {
        const path = await Promise.all(
          scannedImages.map(convertImageToGreyScale),
        );
       setMedia([...media, ...path]);
      }
    }, 500);
  };

    const subscription = useAppSelector(state => state.subscription);
    console.log('subss---->', subscription.isActiveSubscription);

  const documentPickHandler = async () => {
    setLoading(true);
    setVisible(false);
    setTimeout(async () => {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        const uri = res[0]?.uri;
        if (uri != null) {
          const path = await convertImageToGreyScale(uri);
          setMedia([...media, path]);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }, 500);
  };

  const nextPreviewHandler = async () => {
    console.log('isLogin==>>', isLoggedIn);

    if (!isLoggedIn) {
      console.log('=-=-=-=-=');

      return setVisibleRestore(true);
    } else {
      navigation.navigate('PreviewScreen', {
        media: media,
        mobileNumber: mobileNumber,
        callingCode: callingCode,
        coverPage: coverPage,
        cancelHandler: cancelHandler,
      });
    }
  };

  const onDeleteMediaHandler = (uri: string) => {
    setMedia(media.filter(item => item != uri));
  };

    if (showScanner) {
      return(
        <View style={{flex:1}} >
        <DocumentScannerCamera close={()=>setShowScanner(false)} />
        </View>
      )
    }

  return (
    <SafeAreaView style={styles.cotainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FreeFaxBanner />

        <SendTo
          countryCode={countryCode}
          mobileNumber={mobileNumber}
          onCountryCodeChange={onCountryCodeChange}
          onPhoneNumberChange={setMobileNumber}
        />
        {/* {coverPage == null && (
          <CoverPageBanner faxCoverPageHandler={faxCoverPageHandler} />
        )} */}
        {coverPage != undefined && (
          <TouchableOpacity>
            <DocumentBanner
              title={`Free Cover`}
              image={coverPage.uri}
              onDelete={() => setCoverPage(undefined)}
            />
          </TouchableOpacity>
        )}
        {media.map((item, index) => {
          return (
            <DocumentBanner
              title={`Doc ${index + 1}`}
              key={index}
              image={item}
              onDelete={onDeleteMediaHandler}
              onZoomImage={() => handleImagePress(index)}
              isUri={route?.params?.resendData ? true : false}
            />
          );
        })}

        <AddDocumentBanner
          coverPage={coverPage}
          visible={visible}
          setVisible={setVisible}
          imagePicker={photoLibraryHandler}
          scanDoc={scanDocument}
          documentPick={documentPickHandler}
          popupOpenHandler={() => setVisible(true)}
          popupCloseHandler={() => setVisible(false)}
          faxCoverPageHandler={faxCoverPageHandler}
        />
      </ScrollView>
      <ZoomInZoomOutPreview
        data={media}
        isModalVisible={isModalOpen}
        hideModal={() => setIsModalOpen(false)}
        index={modalImageIndex}
      />
      <LoginPopup
        visible={visibleRestore}
        setVisible={setVisibleRestore}
        navigation={navigationOnWayHandlerRestore}
      />
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default NewFaxScreen;

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    backgroundColor: Colors.softPeach,
    paddingHorizontal: wp(5),
  },
  headerTextStyle: {
    paddingRight: wp(1),
  },
  clearTitle: {
    textTransform: 'none',
    ...Style.getTextStyle(14, 'Bold', Colors.monza),
  },
  headerRightButton: {
    backgroundColor: Colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    height: 32,
    marginBottom: hp(-3.5),
  },
  headerRightButton2: {
    backgroundColor: Colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    height: 32,
    marginBottom: hp(-3.5),
  },
  headerLeftButton: {
    marginLeft: wp(5),
    paddingHorizontal: wp(2),
    marginBottom: hp(-3.5),
  },
});
