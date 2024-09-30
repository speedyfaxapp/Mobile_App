//import libraries
import React, {Dispatch, SetStateAction, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import PopupContainer from './PopupContainer';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import AdaptiveButton from '../button/AdaptiveButton';
import SVG from '../../assets/svg';
import SecureAppItem from './SecureAppItem';
import {AppLocalizedStrings} from '../../localization/Localization';
import * as CrispChatSDK from 'react-native-crisp-chat-sdk';

interface Props extends ViewProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  cancel: () => void;
  navigation: () => void;
}

// Component
const FaxQuationItem = (props: Props) => {
  const {style, visible, setVisible, cancel, navigation} = props;
  const [secureVisible, setSecureVisible] = useState(false);

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const popupOpenHandler = () => {
    setSecureVisible(true);
  };

  const popupCloseHandler = () => {
    setSecureVisible(false);
  };

  const onSupportHandler = () => {
    CrispChatSDK.show();
  };

  return (
    <PopupContainer visible={visible} setVisble={setVisible} fromBottom>
      <View style={mainStyle}>
        <Text style={styles.headerTitle}>
          {AppLocalizedStrings.popup.haveQuestion}
        </Text>
        <View>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
          <TouchableOpacity style={styles.libraryView} onPress={navigation}>
            <Text style={styles.libraryTitle}>
              {AppLocalizedStrings.popup.faq}
            </Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
          <TouchableOpacity
            style={styles.libraryView}
            onPress={popupOpenHandler}>
            <Text style={styles.libraryTitle}>
              {AppLocalizedStrings.popup.howSecure}
            </Text>
          </TouchableOpacity>

          <SecureAppItem
            secureVisible={secureVisible}
            setSecureVisible={setSecureVisible}
            gotIt={popupCloseHandler}
          />

          <View style={styles.line}></View>
          <View style={styles.line}></View>
          <TouchableOpacity
            onPress={onSupportHandler}
            style={[styles.libraryView, styles.liveChat]}>
            <SVG.LiveChat width={50} height={30} style={styles.icon} />
            <Text style={styles.libraryTitle}>
              {AppLocalizedStrings.popup.contactSupport}
            </Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
        </View>
        <AdaptiveButton
          title={AppLocalizedStrings.popup.cancel}
          style={styles.buttonStyle}
          onPress={cancel}
        />
      </View>
    </PopupContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {},
  headerTitle: {
    width: '95%',
    paddingBottom: hp(2),
    ...Style.getTextStyle(20, 'Bold', Colors.accent),
    marginTop: hp(-5),
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor: Colors.border,
  },
  libraryView: {
    flexDirection: 'row',
    marginHorizontal: wp(3),
    marginVertical: hp(1),
    justifyContent: 'center',
  },
  liveChat: {
    flexDirection: 'row',
  },
  libraryTitle: {
    ...Style.getTextStyle(18, 'SemiBold', Colors.accent),
    paddingVertical: hp(0.5),
  },
  icon: {
    marginRight: wp(3),
    alignSelf: 'center',
    marginTop: hp(1),
  },
  buttonStyle: {
    backgroundColor: Colors.accent,
    alignSelf: 'center',
    paddingHorizontal: wp(14),
    marginTop: hp(3),
  },
});

//export component
export default FaxQuationItem;
