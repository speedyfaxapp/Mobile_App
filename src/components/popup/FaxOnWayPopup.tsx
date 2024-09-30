//import libraries
import React, {Dispatch, SetStateAction, useMemo,} from 'react';
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
  navigation: () => void;
}

// Component
const FaxOnWayPopup = (props: Props) => {
  const {style, visible, setVisible, navigation} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <PopupContainer visible={visible} setVisble={setVisible}>
      <View style={mainStyle}>
        <View>
          <Text style={styles.contantTitle}>
            {AppLocalizedStrings.popup.itsWay}
          </Text>
        </View>
      </View>
      <AdaptiveButton
        title="OK"
        style={styles.buttonStyle}
        onPress={navigation}
      />
    </PopupContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {},
  contantTitle: {
    ...Style.getTextStyle(19, 'SemiBold', Colors.accent),
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: Colors.accent,
    alignSelf: 'center',
    paddingHorizontal: wp(14),
    marginTop: hp(2),
  },
});

//export component
export default FaxOnWayPopup;
