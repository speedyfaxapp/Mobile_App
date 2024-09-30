//import libraries
import React, {Dispatch, SetStateAction, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  ScrollView,
} from 'react-native';
import PopupContainer from './PopupContainer';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import AdaptiveButton from '../button/AdaptiveButton';
import SVG from '../../assets/svg';
import {AppLocalizedStrings} from '../../localization/Localization';

interface Props extends ViewProps {
  secureVisible: boolean;
  setSecureVisible: Dispatch<SetStateAction<boolean>>;
  gotIt: () => void;
}

// Component
const SecureAppItem = (props: Props) => {
  const {style, secureVisible, setSecureVisible, gotIt} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <PopupContainer
      visible={secureVisible}
      setVisble={setSecureVisible}
      fromBottom>
      <ScrollView style={mainStyle}>
        <View>
          <Text style={styles.headerTitle}>
            {AppLocalizedStrings.popup.sellSubscriptions}
            <Text style={styles.headerTitleSec}>
              {AppLocalizedStrings.popup.yourData}
            </Text>
          </Text>
        </View>
        <SVG.Security style={styles.icon} />
        <View>
      
          <Text style={styles.paragraph}>
            {AppLocalizedStrings.popup.exclusively}
          </Text>
          <Text style={styles.supportTitle}>
            {AppLocalizedStrings.popup.contactSupport}
          </Text>
        </View>
        <AdaptiveButton
          title={AppLocalizedStrings.popup.gotIt}
          style={styles.buttonStyle}
          onPress={gotIt}
        />
      </ScrollView>
    </PopupContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {},
  headerTitle: {
    ...Style.getTextStyle(30, 'Bold', Colors.accent),
    textAlign: 'center',
  },
  headerTitleSec: {
    ...Style.getTextStyle(30, 'Bold', Colors.primary),
  },
  icon: {
    alignSelf: 'center',
  },
  paragraph: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.accent),
    lineHeight: 25,
    textAlign: 'center',
    paddingTop: hp(4),
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
    marginTop: hp(5),
  },
});

//export component
export default SecureAppItem;
