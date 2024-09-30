//import libraries
import React, {useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  TextInput,
} from 'react-native';
import AdaptiveButton from '../../button/AdaptiveButton';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import FaxCoverPageTextInput from './FaxCoverPageTextInput';
import {AppLocalizedStrings} from '../../../localization/Localization';
import moment from 'moment';
import ViewShot, {captureScreen} from 'react-native-view-shot';
import CoverPage from '../../../models/interfaces/CoverPage';

interface Props extends ViewProps {
  coverPage: CoverPage | undefined;
  onCapture: (page: CoverPage) => void;
}
// Component

const dateTime = moment(new Date()).format('MM-DD-Y');

const FaxCoverPage = (props: Props) => {
  const {style, onCapture, coverPage} = props;
  const [to, setTo] = useState(coverPage?.to ?? '');
  const [from, setFrom] = useState(coverPage?.from ?? '');
  const [contact, setContact] = useState(coverPage?.contact ?? '');
  const [subject, setSubject] = useState(coverPage?.subject ?? '');
  const [message, setMessage] = useState(coverPage?.message ?? '');
  const viewShotRef = useRef<ViewShot>(null);

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const onCaptureHandler = async () => {
    try {
      const uri = await captureScreen({
        format: 'png',
        quality: 1.0,
      });
      onCapture({
        to: to,
        from: from,
        contact: contact,
        subject: subject,
        message: message,
        uri: uri,
      });
    } catch (error) {}
  };

  return (
    <View>
      <ViewShot
        ref={viewShotRef}
        options={{format: 'png', quality: 1.0, result: 'base64'}}>
        <View style={mainStyle}>
          <View style={styles.cradHeaderView}>
            <Text style={styles.recipientTitle}>
              {AppLocalizedStrings.faxCoverPage.recipient}
            </Text>
            <Text style={styles.recipientTitle}>{dateTime}</Text>
          </View>
          <FaxCoverPageTextInput
            value={to}
            title={AppLocalizedStrings.faxCoverPage.to}
            placeholderTitle={AppLocalizedStrings.faxCoverPage.recipientName}
            onChangText={setTo}
          />
        </View>
        <View style={mainStyle}>
          <View style={styles.cradHeaderView}>
            <Text style={styles.recipientTitle}>
              {AppLocalizedStrings.faxCoverPage.Sender}
            </Text>
          </View>
          <FaxCoverPageTextInput
            value={from}
            title={AppLocalizedStrings.faxCoverPage.from}
            placeholderTitle={AppLocalizedStrings.faxCoverPage.yourName}
            onChangText={setFrom}
          />
          <FaxCoverPageTextInput
            value={contact}
            title={AppLocalizedStrings.faxCoverPage.contact}
            placeholderTitle={AppLocalizedStrings.faxCoverPage.yourPhone}
            onChangText={setContact}
          />
          <FaxCoverPageTextInput
            value={subject}
            title={AppLocalizedStrings.faxCoverPage.subject}
            placeholderTitle={AppLocalizedStrings.faxCoverPage.faxAbout}
            onChangText={setSubject}
          />
        </View>
        <View style={mainStyle}>
          <View style={styles.cradHeaderView}>
            <Text style={styles.recipientTitle}>
              {AppLocalizedStrings.faxCoverPage.message}
            </Text>
          </View>
          <View style={styles.inputViewMassage}>
            <TextInput
              value={message}
              placeholder={AppLocalizedStrings.faxCoverPage.wrightMassage}
              style={styles.textInput}
              multiline
              onChangeText={setMessage}
            />
          </View>
        </View>
      </ViewShot>

      <AdaptiveButton
        title={AppLocalizedStrings.faxCoverPage.create}
        style={styles.buttonStyle}
        onPress={onCaptureHandler}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.aliceBlue,
    marginTop: hp(3),
    shadowOffset: {width: 0, height: 1},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    width: '90%',
    alignSelf: 'center',
  },
  cradHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
  },
  recipientTitle: {
    ...Style.getTextStyle(16, 'Bold', Colors.accent),
  },
  inputViewMassage: {
    borderWidth: 0.5,
    marginHorizontal: wp(3),
    marginBottom: hp(2),
    height: 100,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: wp(4),
    ...Style.getTextStyle(14, 'Regular', Colors.accent),
    borderWidth: 0,
  },
  buttonStyle: {
    backgroundColor: Colors.accent,
    alignSelf: 'center',
    paddingHorizontal: wp(14),
    marginVertical: hp(4),
  },
});

//export component
export default FaxCoverPage;
