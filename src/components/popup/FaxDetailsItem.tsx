//import libraries
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  ScrollView,
} from 'react-native';
import PopupContainer from './PopupContainer';
import SVG from '../../assets/svg';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import moment from 'moment';
import AppLoader from '../indicator/AppLoader';
import * as HomeService from '../../network/service/HomeService';

interface Props extends ViewProps {
  faxDetails: boolean;
  setFaxDetails: Dispatch<SetStateAction<boolean>>;
  txtOrderNo: number | string;
}

// Component
const FaxDetailsItem = (props: Props) => {
  const {style, faxDetails, setFaxDetails, txtOrderNo} = props;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const dateTime = (date: number) => moment(date).format('MMM-DD  hh:mm A');

  const faxDetailsHandler = async () => {
    setLoading(true);
    try {
      const response = await HomeService.faxDetails({
        txtOrderNo: txtOrderNo,
      });
      setData(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (txtOrderNo != undefined) {
      faxDetailsHandler();
    }
  }, [txtOrderNo]);

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
        return styles.queued;
      case 'inprogress':
        return styles.inProgress;
      default:
    }
  };

  return (
    <PopupContainer visible={faxDetails} setVisble={setFaxDetails} fromBottom>
      <View style={mainStyle}>
        <Text style={styles.headerTitle}>
          {AppLocalizedStrings.faxUpdatepopup.faxDetails}
        </Text>
        <ScrollView>
          <View style={styles.logoView}>
            <SVG.Logo style={styles.logoIcon} />
            <View style={styles.thumbLogoMainView}>
              {data.txtStatus === 'success' ? (
                <SVG.ThumbUp style={styles.thumbLogo} />
              ) : (
                <SVG.ThumbUp style={styles.thumbLogo2} />
              )}
              <View style={[styles.updateView, statusHandler(data.txtStatus)]}>
                <Text style={styles.updateTitle}>{data.txtStatus}</Text>
              </View>
            </View>
          </View>
          <View style={styles.aboutFaxContainer}>
            <View style={styles.aboutFaxMainView}>
              <Text style={styles.aboutFaxkeyTitle}>To:</Text>
              <Text style={styles.aboutFaxValueTitle}>{data.r_number}</Text>
            </View>
            <View style={styles.aboutFaxMainView}>
              <Text style={styles.aboutFaxkeyTitle}>Subject:</Text>
              <Text style={styles.aboutFaxValueTitle}>{data.r_number}</Text>
            </View>
            <View style={styles.aboutFaxMainView}>
              <Text style={styles.aboutFaxkeyTitle}>Status:</Text>
              <Text style={styles.aboutFaxValueTitle}>{data.txtStatus}</Text>
            </View>
            <View style={styles.aboutFaxMainView}>
              <Text style={styles.aboutFaxkeyTitle}>Page Submited:</Text>
              <Text style={styles.aboutFaxValueTitle}>{data.txtNoOfPage}</Text>
            </View>
            <View style={styles.aboutFaxMainView}>
              <Text style={styles.aboutFaxkeyTitle}>Submit Time:</Text>
              <Text style={styles.aboutFaxValueTitle}>
                {dateTime(data.txtRequestedAt)}
              </Text>
            </View>
            <View style={styles.aboutFaxMainView}>
              <Text style={styles.aboutFaxkeyTitle}>Completion Time:</Text>
              <Text style={styles.aboutFaxValueTitle}>
                {dateTime(data.txtCompletedAt)}
              </Text>
            </View>
            <View style={styles.aboutFaxMainView}>
              <Text style={styles.aboutFaxkeyTitle}>Duration:</Text>
              <Text style={styles.aboutFaxValueTitle}>
                {data.txtTotalDuration}
              </Text>
            </View>
            <View style={styles.aboutFaxMainView}>
              <Text style={styles.aboutFaxkeyTitle}>Order Number:</Text>
              <Text style={styles.aboutFaxValueTitle}>{data.txtOrderNo}</Text>
            </View>
          </View>
          {/* <SVG.Eye style={styles.eyeIcon} />
          <Text style={styles.attached}>
            {AppLocalizedStrings.faxUpdatepopup.priviewAttached}
          </Text> */}
        </ScrollView>
        <AppLoader loading={loading} />
      </View>
    </PopupContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {},
  sending: {
    backgroundColor: Colors.orange,
  },
  pendingbatch: {
    backgroundColor: Colors.accent,
  },
  queued: {
    backgroundColor: Colors.accent,
  },
  updateView: {
    backgroundColor: Colors.green,
    borderRadius: 30,
    alignSelf: 'center',
    paddingHorizontal: wp(12),
    marginTop: hp(3),
  },
  notDelivered: {
    backgroundColor: Colors.monza,
  },
  inProgress: {
    backgroundColor: Colors.inProgress,
  },
  headerTitle: {
    ...Style.getTextStyle(30, 'SemiBold', Colors.accent),
    width: '94%',
    textAlign: 'center',
    paddingLeft: wp(5),
    marginTop: hp(-5.5),
  },
  logoView: {
    flexDirection: 'row',
    marginTop: hp(2),
  },
  logoIcon: {
    flex: 1,
  },
  thumbLogoMainView: {
    flex: 1,
  },
  thumbLogo: {
    alignSelf: 'center',
  },
  thumbLogo2: {
    alignSelf: 'center',
    transform: [{rotateX: '180deg'}],
  },
  updateTitle: {
    paddingVertical: hp(1),
    textAlign: 'center',
    ...Style.getTextStyle(19, 'SemiBold', Colors.white),
  },
  aboutFaxContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
  },
  aboutFaxMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aboutFaxkeyTitle: {
    paddingVertical: hp(0.3),
    ...Style.getTextStyle(15, 'SemiBold', Colors.accent),
  },
  aboutFaxValueTitle: {
    ...Style.getTextStyle(15, 'SemiBold', Colors.accent),
  },
  eyeIcon: {
    alignSelf: 'center',
    marginTop: hp(2),
  },
  attached: {
    ...Style.getTextStyle(19, 'SemiBold', Colors.accent),
    textAlign: 'center',
    paddingVertical: hp(1),
  },
});

//export component
export default FaxDetailsItem;
