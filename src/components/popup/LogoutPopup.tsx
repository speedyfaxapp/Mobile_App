//import libraries
import React, {Dispatch, SetStateAction, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  Alert,
} from 'react-native';
import PopupContainer from './PopupContainer';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import AdaptiveButton from '../button/AdaptiveButton';
import History from '../../models/interfaces/HistoryResponce';
import {store} from '../../store/Store';
import SharedPreference from '../../storage/SharedPreference';
import {clearAuthSlice} from '../../store/slices/AuthSlice';
import {AppLocalizedStrings} from '../../localization/Localization';

interface Props extends ViewProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data?: History[] | undefined;
}

// Component
const LogoutPopup = (props: Props) => {
  const {style, visible, setVisible, data} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const onLogoutHandler = async () => {
    await SharedPreference.removeItem('user');
    store.dispatch(clearAuthSlice());
    Alert.alert('Logout');
  };

  return (
    <PopupContainer visible={visible} setVisble={setVisible}>
      <View>
        <Text style={mainStyle}> </Text>
        <Text style={styles.popupContant}>
          {AppLocalizedStrings.popup.logout}
        </Text>
        <View style={styles.buttonMainView}>
          <AdaptiveButton
            title="Yes"
            onPress={onLogoutHandler}
            style={styles.buttonStyle}
          />
          <AdaptiveButton
            title="No"
            onPress={() => setVisible(false)}
            style={styles.buttonStyle}
          />
        </View>
      </View>
    </PopupContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {marginTop: hp(-2.5)},
  popupContant: {
    ...Style.getTextStyle(18, 'SemiBold', Colors.accent),
    paddingBottom: hp(2),
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: Colors.accent,
    alignSelf: 'center',
    paddingHorizontal: wp(14),
  },
  buttonMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

//export component
export default LogoutPopup;
