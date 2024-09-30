//import libraries
import React, {Dispatch, SetStateAction, useMemo} from 'react';
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
import SVG from '../../assets/svg';
import {AppLocalizedStrings} from '../../localization/Localization';

interface Props extends ViewProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

// Component
const FeedBackPopup = (props: Props) => {
  const {style, visible, setVisible} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <PopupContainer visible={visible} setVisble={setVisible}>
      <View>
        <Text style={mainStyle}>{AppLocalizedStrings.popup.feedBack}</Text>
        <View style={styles.popupContentView}>
          <View style={styles.faxView}>
            <SVG.RoundRick />
            <Text style={styles.faxTitle}>
              {AppLocalizedStrings.popup.yourFax}
            </Text>
          </View>
          <Text style={styles.popupTitle}>
            <Text style={styles.popupTitleBold}>
              {AppLocalizedStrings.popup.delivered}
            </Text>
            {AppLocalizedStrings.popup.for}
            <Text style={styles.popupTitleBold}>
              {AppLocalizedStrings.popup.free}
            </Text>
            {AppLocalizedStrings.popup.taking}
            {AppLocalizedStrings.popup.moment}
            <Text style={styles.popupTitleBold}>
              {AppLocalizedStrings.popup.rate}
            </Text>
            {AppLocalizedStrings.popup.spread}
          </Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.line}></View>
        <TouchableOpacity>
          <Text style={styles.rateFax}>
            {AppLocalizedStrings.popup.rateSpeedyFax}
          </Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <View style={styles.line}></View>
        <TouchableOpacity>
          <Text style={styles.remind}>
            {AppLocalizedStrings.popup.remindLater}
          </Text>
        </TouchableOpacity>
      </View>
    </PopupContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    textAlign: 'center',
    marginTop: hp(-4.5),
    ...Style.getTextStyle(18, 'SemiBold', Colors.accent),
    alignSelf: 'center',
  },
  popupContentView: {
    marginVertical: hp(3),
  },
  faxView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  faxTitle: {
    ...Style.getTextStyle(14, 'SemiBold', Colors.accent),
    paddingLeft: wp(2),
  },
  popupTitle: {
    ...Style.getTextStyle(14, 'SemiBold', Colors.accent),
    textAlign: 'center',
  },
  popupTitleBold: {
    ...Style.getTextStyle(14, 'Bold', Colors.accent),
    textAlign: 'center',
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor: Colors.border,
  },
  rateFax: {
    ...Style.getTextStyle(13, 'SemiBold', Colors.primary),
    textAlign: 'center',
    paddingVertical: hp(1.5),
  },
  remind: {
    ...Style.getTextStyle(13, 'SemiBold', Colors.accent),
    textAlign: 'center',
    paddingTop: hp(1.5),
  },
});

//export component
export default FeedBackPopup;
