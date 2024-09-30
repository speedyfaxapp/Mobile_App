//import libraries
import React, {Dispatch, SetStateAction, useMemo} from 'react';
import {View, Text, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import PopupContainer from './PopupContainer';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import AdaptiveButton from '../button/AdaptiveButton';
import {AppLocalizedStrings} from '../../localization/Localization';

interface Props extends ViewProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

// Component
const PurchaseSuccesPopup = (props: Props) => {
  const {style, visible, setVisible} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <PopupContainer visible={visible} setVisble={setVisible}>
      <View style={mainStyle}>
        <Text style={styles.headerTitle}>
          {AppLocalizedStrings.popup.allSet}
        </Text>
        <Text style={styles.popupContant}>
          {AppLocalizedStrings.popup.purchase}
        </Text>
        <AdaptiveButton
          title={AppLocalizedStrings.popup.ok}
          style={styles.buttonStyle}
        />
      </View>
    </PopupContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {},
  headerTitle: {
    textAlign: 'center',
    marginTop: hp(-4.5),
    ...Style.getTextStyle(18, 'SemiBold', Colors.accent),
    alignSelf: 'center',
  },
  popupContant: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.accent),
    paddingVertical: hp(2),
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: Colors.accent,
    alignSelf: 'center',
    paddingHorizontal: wp(14),
  },
});

//export component
export default PurchaseSuccesPopup;
