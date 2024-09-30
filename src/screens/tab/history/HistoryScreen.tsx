import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  RefreshControl,
  Animated,
  Easing,
} from 'react-native';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Colors from '../../../theme/Colors';
import FaxHistoryBanner from '../../../components/app/history/FaxHistoryBanner';
import SVG from '../../../assets/svg';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import FaxQuationItem from '../../../components/popup/FaxQuationItem';
import type {BottomTabScreenProps} from '../../../navigation/navigator/types';
import * as HomeService from '../../../network/service/HomeService';
import type History from '../../../models/interfaces/HistoryResponce';
import {useAppSelector} from '../../../store/Hooks';
import {useIsFocused} from '@react-navigation/native';
import AppLoader from '../../../components/indicator/AppLoader';
import RateUsPopup from '../../../components/popup/RateUsPopup';
import ZoomInZoomOutPreview from '../../../components/ZoomInZoomOutPreview';
import {showLocalNotification} from '../../../notification/FirebaseNotification';

const HistoryScreen = (props: BottomTabScreenProps<'HistoryScreen'>) => {
  const {navigation} = props;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<History[]>([]);
  const [showPopup, setShowpopup] = useState(false);
  const [rateUs, setRateUs] = useState(false);
  const [remoindMeLater, setRemindMeLate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [zoomIndex, setZoomIndex] = useState<number>(0);
  const [isFaxImageDisplay, setIsFaxImageDisplay] = useState(false);
  const [displayImages, setDisplayImages] = useState([]);
  const isFocus = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const isLoggedIn = useAppSelector(state => state.auth.user) != null;
  const isRemindMe = useAppSelector(state => state.subscription.isRemindMe);
  const isRatingSubmit = useAppSelector(
    state => state.subscription.isRatingSubmit,
  );
  const onRefreshHandler = () => {
    isLoggedIn ? faxHistory() : null;
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    onRefreshHandler();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const timer = useRef<NodeJS.Timer>();

  useEffect(() => {
    navigation.setOptions({
      title: AppLocalizedStrings.bottomTabHeader.history,
      headerLeft: () => (
        <TouchableOpacity
          // style={[styles.headerLeft,{transform: [{rotate: spinInterpolate}]}]}
          // @ts-ignore
          style={[styles.headerLeft, {transform: [{rotate: spinInterpolate}]}]}
          onPress={() => {
            onRefreshHandler();
            spin();
          }}>
          <SVG.Refresh />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={popupOpenHandler} style={styles.headerRight}>
          <SVG.QuestionUnfill />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  useEffect(() => {
    // Fetch history data only when the screen is focused and user is logged in
    if (isFocus && isLoggedIn) {
      faxHistory();
    }
  }, [isFocus, isLoggedIn]);
  const popupOpenHandler = () => {
    setVisible(true);
  };

  const popupCloseHandler = () => {
    setVisible(false);
  };

  const faqNavigationHandler = () => {
    navigation.navigate('FAQScreen');
    setVisible(false);
  };

  const faxHistory = async () => {
    if (!isLoggedIn || !isFocus) {
      return;
    }
    setLoading(true);

    try {
      const response: any = await loadFaxHistories();

      if (response.data[0].txtStatus === 'queued') {
        setShowpopup(true);
        setTimeout(() => {
          setShowpopup(false);
        }, 10000);
      }
      console.warn('response--->', response.data[0]);
      if (response?.data[0]?.r_status === 'success') {
        if (isRatingSubmit === false) {
          if (!isRemindMe) {
            // store.dispatch(updateRemindMe(true));
            // if (isRemindMe) {
            setRateUs(true);
            // }
            const notificationData = {
              title: 'Fax Delivered Successfully',
              message:
                'Great News! Your Fax Has Been Successfully Sent & Delivered.',
            };
            showLocalNotification(notificationData);
            console.log('modal');
          } else {
          }
        }
      } else {
        console.log('NO');
        const notificationData = {
          title: 'Fax Delivery Failed',
          message:
            'Oops! Something went wrong with fax delivery. Please try again later.',
        };
        showLocalNotification(notificationData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = setInterval(loadFaxHistories, 10000);
    }
  };

  const loadFaxHistories = async () => {
    const response: any = await HomeService.history();
    const histories = response.data ?? [];

    setData(histories);

    const queuedHistories = histories.filter((v) => v.txtStatus === 'queued');
    if (queuedHistories.length === 0 && timer.current !== null) {
      clearInterval(timer.current);
    }

    return response;
  };

  // useEffect(() => {
  //   faxHistory();
  // }, [isFocus]);
  const spinValue = new Animated.Value(0);

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000, // Adjust as needed for rotation speed
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      if (refreshing) spin();
    });
  };

  const spinInterpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <SafeAreaView style={styles.container}>
      <RateUsPopup
        setVisible={setRateUs}
        visible={rateUs}
        setRemindMeLate={setRemindMeLate}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {data?.length > 0 && isLoggedIn ? (
          <View>
            <FaxHistoryBanner
              data={data}
              setZoomIndex={setZoomIndex}
              visible={rateUs}
              faxHistoryFn={faxHistory}
              zoomImage={() => setIsModalOpen(true)}
              onImageClick={index => {
                setZoomIndex(index);
                let tempArray = data[index].images,
                  newTempArray = [];
                for (let i = 0; i < tempArray?.length; i++) {
                  newTempArray.push({url: tempArray[i]});
                }
                setDisplayImages(newTempArray);
                setIsFaxImageDisplay(true);
              }}
            />
          </View>
        ) : (
          <>
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',

                height: 500,
              }}>
              <Text
                style={{
                  color: '#bd37f4',
                  fontSize: 24,
                }}>
                No record found
              </Text>
            </View>
          </>
        )}

        <FaxQuationItem
          visible={visible}
          setVisible={setVisible}
          cancel={popupCloseHandler}
          navigation={faqNavigationHandler}
        />
      </ScrollView>
      {showPopup && (
        <View
          style={{
            height: 250,
            width: '100%',
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
          }}>
          <View
            style={{
              width: '90%',
              height: '90%',
              backgroundColor: '#d3d3d3',
              alignSelf: 'center',
              marginTop: '10%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 10,
                fontSize: 20,
                fontWeight: '600',
                letterSpacing: 1,
                color: 'purple',
              }}>
              Your fax is being transmitted to {data[0]?.mobile}. This may take
              several minutes. We will notify you once it has been delivered or
              fails to and the reason why.
            </Text>
          </View>
        </View>
      )}
      {isFaxImageDisplay == true && (
        <Modal
          onBackButtonPress={() => {
            setIsFaxImageDisplay(false);
          }}
          style={styles.modalContainer}
          isVisible={isFaxImageDisplay}>
          <View style={styles.zoomContainer}>
            <View style={styles.crossContainer}>
              <TouchableOpacity
                onPress={() => {
                  setIsFaxImageDisplay(false);
                }}>
                <SVG.Close
                  width={16}
                  height={16}
                  fill={Colors.white}
                  style={{padding: 10}}
                />
              </TouchableOpacity>
            </View>
            <ImageViewer imageUrls={displayImages || []} />
          </View>
        </Modal>
        // <Modal visible={isFaxImageDisplay} transparent={true}>
        //   <ImageViewer imageUrls={displayImages || []} />
        // </Modal>
      )}
      {data != null ? (
        <ZoomInZoomOutPreview
          data={data[zoomIndex]?.images || []}
          isModalVisible={isModalOpen}
          hideModal={() => setIsModalOpen(false)}
          index={zoomIndex}
        />
      ) : (
        <View />
      )}
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softPeach,
  },
  headerLeft: {
    marginLeft: wp(5),
  },
  headerRight: {
    marginRight: wp(5),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '90%',
    padding: 10,
    borderWidth: 0.4,
    backgroundColor: 'white',
  },
  crossContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    zIndex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  crossImg: {
    width: 30,
    height: 30,
  },
  imagePreview: {
    width: 400,
    height: 400,
  },
  modalContainer: {
    backgroundColor: 'black',
    margin: 0,
  },
  zoomContainer: {
    flex: 1,
    marginTop: wp(5),
  },
  downloadContainer: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    bottom: 30,
    alignSelf: 'center',
  },
});
