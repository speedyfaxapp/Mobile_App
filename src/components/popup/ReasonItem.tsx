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
  TouchableOpacity,
} from 'react-native';
import PopupContainer from './PopupContainer';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import AdaptiveButton from '../button/AdaptiveButton';
import SVG from '../../assets/svg';
import {AppLocalizedStrings} from '../../localization/Localization';
import moment from 'moment';
import * as HomeService from '../../network/service/HomeService';
import AppLoader from '../indicator/AppLoader';

interface Props extends ViewProps {
  reasonvisible: boolean;
  setReasonvisible: Dispatch<SetStateAction<boolean>>;
  popupGotitHandler: () => void;
  txtOrderNo: string | number;
}

// Component
const ReasonItem = (props: Props) => {
  const {
    style,
    reasonvisible,
    setReasonvisible,
    popupGotitHandler,
    txtOrderNo,
  } = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState<any>([]);

  let dateTime = (date: string) => moment(date).format('MM-DD-Y  hh:mm A');

  const faxDetailsHandler = async () => {
    setLoading(true);
    try {
      const response = await HomeService.faxDetails({
        txtOrderNo: txtOrderNo,
      });

      setReason(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    faxDetailsHandler();
  }, []);

  return (
    <PopupContainer
      visible={reasonvisible}
      setVisble={setReasonvisible}
      fromBottom>
      <Text style={styles.headerTitle}>Reason</Text>
      <View style={{height: '75%'}}>
        <ScrollView>
          <SVG.Security style={styles.icon} />
          <View style={{flex: 1}}>
            <View style={styles.titlesView}>
              <Text style={styles.keyTitle}>
                Fax status : - {reason?.txtStatus}
              </Text>
              <Text style={styles.valueTitle}>
                {dateTime(reason.txtRequestedAt)}
              </Text>
            </View>
            <View style={styles.titlesView}>
              <Text style={styles.keyTitle}>Status : -</Text>
              <Text style={styles.valueTitle}>{reason?.txtStatus}</Text>
            </View>
            <View style={styles.titlesView}>
              <Text style={styles.keyTitle}>Reason : -</Text>
              <Text style={styles.valueTitle}>{reason.r_error_msg}</Text>
            </View>
            <View style={styles.line}></View>
            <Text style={styles.reasonTitle}>Top reasons for a failed fax</Text>
            <View style={styles.titlesView}>
              <Text style={styles.keyTitle}>Reason 1 : -</Text>
              <Text style={styles.valueTitle}>
                The recipient's fax number you entered my be incorrect. Please
                double check it.
              </Text>
            </View>

            <View style={styles.titlesView}>
              <Text style={styles.keyTitle}>Reason 2 : -</Text>
              <Text style={styles.valueTitle}>
                If you (the sender) receive a "line busy error" notification,
                the receipient's fax machine may be receiving another fax
                transmission. Just wait a couple minutes and send your fax
                again.
              </Text>
            </View>

            <View style={styles.titlesView}>
              <Text style={styles.keyTitle}>Reason 3 : -</Text>
              <Text style={styles.valueTitle}>
                For all other failed faxes, dial the fax number using your
                mobile phone. If you do not hear a high pitch squealing sound,
                there's something wrong with the receiving fax machine. I
                suggest you call the person and/or business you are sending the
                fax to in order to resolve the issue.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity>
        <Text style={styles.supportTitle}>
          {AppLocalizedStrings.popup.contactSupport}
        </Text>
      </TouchableOpacity>
      <AdaptiveButton
        title={AppLocalizedStrings.popup.gotIt}
        style={styles.buttonStyle}
        onPress={popupGotitHandler}
      />
      <AppLoader loading={loading} />
    </PopupContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {},
  headerTitle: {
    ...Style.getTextStyle(30, 'SemiBold', Colors.accent),
    textAlign: 'center',
    marginTop: hp(-5.5),
    alignSelf: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginVertical: hp(2),
  },
  titlesView: {
    flexDirection: 'row',
  },
  keyTitle: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.accent),
    paddingRight: wp(2),
  },
  valueTitle: {
    ...Style.getTextStyle(16, 'Regular', Colors.accent),
    flex: 1,
    paddingVertical: hp(0.2),
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor: Colors.grey,
    marginVertical: hp(1),
  },
  reasonTitle: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.primary),
    paddingBottom: hp(2),
  },
  supportTitle: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.primary),
    textAlign: 'center',
    paddingTop: hp(2),
  },
  buttonStyle: {
    backgroundColor: Colors.accent,
    alignSelf: 'center',
    paddingHorizontal: wp(14),
    marginTop: hp(3),
  },
});

//export component
export default ReasonItem;
