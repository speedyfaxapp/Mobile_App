//import libraries
import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  type ViewProps,
  type ViewStyle,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import SVG from '../../../assets/svg';
import moment from 'moment';
import FaxDocumentItem from '../../popup/FaxDocumentItem';
import ReasonItem from '../../popup/ReasonItem';
import ImageView from '../../image/ImageView';
import AppLoader from '../../indicator/AppLoader';
import * as HomeService from '../../../network/service/HomeService';
import type History from '../../../models/interfaces/HistoryResponce';
import ResendPopup from '../../popup/ResendPopup';
import * as CrispChatSDK from 'react-native-crisp-chat-sdk';
import {updateRatingSubmission} from '../../../store/slices/SubscriptionSlice';
import {useAppSelector} from '../../../store/Hooks';
import * as StoreReview from 'react-native-store-review';
import {store} from '../../../store/Store';

interface Props extends ViewProps {
  data: History[];
  faxHistoryFn?: () => Promise<void>;
  setZoomIndex?: (index: number) => void;
}

// Component
const FaxHistoryBanner = (props: Props) => {
  const {style, data, zoomImage, faxHistoryFn, setZoomIndex, onImageClick} =
    props;
  const [visible, setVisible] = useState(false);
  const [resend, setResend] = useState(false);
  const [reasonvisible, setReasonvisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState<any>();
  const [deleteFaxIndex, setDeleteFaxIndex] = useState<number>(0);
  const isRemindMe = useAppSelector(state => state.subscription.isRemindMe);
  // const spinValue = useRef(new Animated.Value(0)).current;
  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const dateTime = (date: number) => moment(date).format('MMM-DD HH:mm');

  const popupOpenHandler = () => {
    setVisible(true);
  };

  const popupCloseHandler = () => {
    setVisible(false);
  };

  const popupGotitHandler = () => {
    setReasonvisible(false);
  };

  const reasonPopupOpenHandler = () => {
    setReasonvisible(true);
  };

  const statusHandler = (status: string) => {
    switch (status) {
      case 'partialsuccess':
        return styles.sending;
      case 'success':
        return styles.updateView;
      case 'failure':
        return styles.notDelivered;
      case 'pendingbatch':
        return styles.pendingbatch;
      case 'queued':
        return styles.sending;
      case 'inprogress':
        return styles.inProgress;
      default:
    }
  };

  const spinValue = new Animated.Value(0);

  useEffect(() => {
    spin();
  });

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000, // Adjust as needed for rotation speed
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };

  const spinInterpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const deleteFaxHandler = async (txtOrderNo: number) => {
    setLoading(true);
    try {
      const response = await HomeService.deleteFax({
        txtOrderNo: txtOrderNo,
      });

      setVisible(false);
      await faxHistoryFn?.();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const subscription = useAppSelector(state => state.subscription);
  console.log('subss---->', subscription.isActiveSubscription);

  const onSupportHandler = () => {
    CrispChatSDK.show();
  };
  //console.log("==================>>",modalData.images);

  return (
    <View>
      <View style={styles.supportView} />
      {/* <TouchableOpacity style={styles.supportView} onPress={onSupportHandler}>
        <Text style={styles.supportTitle}>
          {AppLocalizedStrings.history.contactSupport}
        </Text>
        <SVG.ContactIcon width={30} height={30} />
      </TouchableOpacity> */}
      {data[0]?.r_status == 'success' && isRemindMe == true ? (
        <TouchableOpacity
          onPress={() => {
            StoreReview.requestReview();
            store.dispatch(updateRatingSubmission(true));
          }}
          style={styles.ratingContainer}>
          <Image
            source={require('../../../assets/images/rating.jpeg')}
            style={{width: 100, height: 30}}
          />
          <Text
            style={{
              marginTop: 10,
              width: 200,
              fontSize: 16,
              fontWeight: '500',
            }}>
            Rate us in the App Store
          </Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
      {data && (
        <>
          {data?.map((item: any, index: number) =>
            !item?.isDelete ? (
              <View key={index}>
                <TouchableOpacity
                  style={mainStyle}
                  onPress={() => {
                    popupOpenHandler();
                    setModalData(item);
                    setDeleteFaxIndex(index);
                  }}>
                  <TouchableOpacity
                    onPress={
                      () => {
                        onImageClick(index);
                      }
                      /* () => {
                      if (setZoomIndex) {
                        setZoomIndex(index);
                      }

                      if (zoomImage) {
                        zoomImage(index);
                      }
                    } */
                    }
                    style={styles.pdfView}>
                    {item.txtStatus === 'queued' ? (
                      <Animated.View
                        style={{transform: [{rotate: spinInterpolate}]}}>
                        <SVG.Sending width={32} style={styles.sendingIcon} />
                      </Animated.View>
                    ) : (
                      <ImageView
                        source={item.images[0]}
                        style={styles.pdfTite}
                      />
                    )}
                  </TouchableOpacity>
                  <View style={styles.detelsMainView}>
                    <View style={styles.numberAndUpdateView}>
                      <Text style={styles.faxNumber}>{item.mobile}</Text>
                      <View
                        style={[styles.sending, statusHandler(item.txtStatus)]}>
                        <Text style={styles.sendingTitle}>
                          {item.txtStatus === 'success'
                            ? 'Delivered'
                            : item.txtStatus === 'failure'
                            ? 'Not Delivered'
                            : item.txtStatus === 'queued'
                            ? 'Sending'
                            : item.txtStatus}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.numberAndUpdateView}>
                      <Text style={styles.dateAndTime}>
                        <Text style={styles.pageTitle}>
                          {item.txtNoOfPage} {AppLocalizedStrings.history.page}
                        </Text>
                        {dateTime(item.txtRequestedAt)}
                      </Text>
                      {item.txtStatus === 'success' ? (
                        <View style={styles.faxSent}>
                          <Text style={styles.faxSentTitle}>
                            {AppLocalizedStrings.history.faxSent}
                          </Text>
                          {/* <SVG.QuestionFill
                            style={styles.icon}
                            width={15}
                            height={15}
                            fill={Colors.primary}
                          /> */}
                        </View>
                      ) : (
                        <TouchableOpacity
                          style={styles.faxSent}
                          onPress={() => {
                            reasonPopupOpenHandler();
                            if (item.txtStatus === 'queued') {
                              setModalData(null);
                            } else {
                              setModalData(item);
                            }
                          }}>
                          <Text
                            style={[styles.faxSentTitle, styles.seeWayTitle]}>
                            {AppLocalizedStrings.history.seeWay}
                          </Text>
                          <SVG.QuestionFill
                            style={styles.icon}
                            width={15}
                            height={15}
                            fill={Colors.monza}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>

                {/* {item.txtStatus === 'success' ? (
                  <View></View>
                ) : (
                  <AdaptiveButton
                    type="text"
                    title="TRY TO RESEND"
                    onPress={() => {
                      setResend(true);
                      setModalData(item);
                    }}
                    textStyle={{color: Colors.primary}}
                    style={styles.resendButton}
                  />
                )} */}
                {data[0]?.txtStatus === 'success' && visible && (
                  <TouchableOpacity
                    onPress={() => {
                      StoreReview.requestReview();
                      store.dispatch(updateRatingSubmission(true));
                    }}
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      alignSelf: 'center',
                    }}>
                    <Image
                      source={require('../../../assets/images/rating.jpeg')}
                      style={{width: 100, height: 30}}
                    />
                    <Text
                      style={{
                        marginLeft: 10,
                        ...Style.getTextStyle(18, 'Bold', Colors.blackBlue),
                      }}>
                      Rate Us On App Store
                    </Text>
                  </TouchableOpacity>
                )}
                <View style={styles.line} />
              </View>
            ) : null,
          )}
        </>
      )}
      <FaxDocumentItem
        visible={visible}
        setVisible={setVisible}
        cancel={popupCloseHandler}
        deleteFaxIndex={deleteFaxIndex}
        data={data}
        orderID={modalData?.txtOrderNo}
        deleteFaxHandler={() => {
          deleteFaxHandler(modalData?.txtOrderNo);
        }}
        imageSelected={modalData?.images}
      />
      {modalData && (
        <ReasonItem
          reasonvisible={reasonvisible}
          setReasonvisible={setReasonvisible}
          popupGotitHandler={popupGotitHandler}
          txtOrderNo={modalData?.txtOrderNo}
        />
      )}
      <ResendPopup
        visible={resend}
        setVisible={setResend}
        data={modalData?.txtOrderNo}
      />

      <AppLoader loading={loading} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    marginHorizontal: wp(5),
    shadowColor: Colors.accent,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  mainStyle2: {
    marginTop: hp(2),
  },
  supportView: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginVertical: hp(2.5),
    marginHorizontal: wp(5),
  },
  supportTitle: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.accent),
    paddingRight: wp(3),
  },
  pdfView: {
    backgroundColor: Colors.white,
    marginVertical: hp(1),
    marginLeft: wp(3),
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#171717',
    shadowOpacity: 0.1,
    shadowRadius: 7,
    alignSelf: 'center',
  },
  pdfTite: {
    width: 50,
    height: 65,
  },
  detelsMainView: {
    justifyContent: 'space-evenly',
    marginLeft: wp(5),
    flex: 1,
  },
  numberAndUpdateView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faxNumber: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.accent),
    flex: 1,
    flexWrap: 'wrap',
  },
  sending: {
    backgroundColor: Colors.orange,
    borderRadius: 20,
    marginHorizontal: wp(2),
    marginVertical: hp(1),
  },
  pendingbatch: {
    backgroundColor: Colors.accent,
  },
  queued: {
    backgroundColor: Colors.accent,
  },
  updateView: {
    backgroundColor: Colors.green,
  },
  notDelivered: {
    backgroundColor: Colors.monza,
  },
  inProgress: {
    backgroundColor: Colors.inProgress,
  },
  sendingIcon: {
    marginHorizontal: wp(1),
    marginVertical: hp(1),
  },
  faxSent: {
    marginHorizontal: wp(2),
    flexDirection: 'row',
  },
  sendingTitle: {
    // paddingVertical: hp(0),
    paddingHorizontal: wp(4),
    ...Style.getTextStyle(16, 'Regular', Colors.white),
    textAlign: 'center',
  },
  faxSentTitle: {
    paddingVertical: hp(0.4),
    paddingHorizontal: wp(2),
    ...Style.getTextStyle(16, 'SemiBold', Colors.primary),
    textAlign: 'center',
  },
  seeWayTitle: {
    color: Colors.monza,
  },
  pageTitle: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.accent),
  },
  dateAndTime: {
    ...Style.getTextStyle(16, 'Regular', Colors.accent),
    flex: 1,
    flexWrap: 'wrap',
  },
  icon: {
    alignSelf: 'center',
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor: Colors.border,
    marginVertical: hp(1.8),
  },
  resendButton: {
    alignSelf: 'flex-end',
    marginHorizontal: wp(5),
    marginBottom: hp(-1),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '90%',
    padding: 10,
    borderWidth: 0.4,
    backgroundColor: 'white',
    marginBottom: 10,
  },
});

//export component
export default FaxHistoryBanner;
