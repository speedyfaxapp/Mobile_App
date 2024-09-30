//import libraries
import React, {Dispatch, SetStateAction, useMemo, useState} from 'react';
import {View, Text, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import PopupContainer from './PopupContainer';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import AdaptiveButton from '../button/AdaptiveButton';
import * as HomeService from '../../network/service/HomeService';
import {store} from '../../store/Store';
import SharedPreference from '../../storage/SharedPreference';
import {clearAuthSlice} from '../../store/slices/AuthSlice';
import AppLoader from '../indicator/AppLoader';
import {useAppSelector} from '../../store/Hooks';
import {AppLocalizedStrings} from '../../localization/Localization';

interface Props extends ViewProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

// Component
const UserDeletePopup = (props: Props) => {
  const {style, visible, setVisible} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const [loading, setLoading] = useState(false);
  const isLoggedIn = useAppSelector(state => state.auth.user) != null;

  const onDeleteAccountHandler = async () => {
    if (!isLoggedIn) {
      return;
    }
    setLoading(true);
    try {
      const response = await HomeService.deleteAccount();
      await SharedPreference.removeItem('user');
      store.dispatch(clearAuthSlice());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PopupContainer visible={visible} setVisble={setVisible}>
      <View style={mainStyle}>
        <Text style={styles.headerTitle}> </Text>
        <Text style={styles.popupContant}>
          {AppLocalizedStrings.popup.deleteAccount}
        </Text>
        <View style={styles.buttonMainView}>
          <AdaptiveButton
            title="Yes"
            onPress={onDeleteAccountHandler}
            style={styles.buttonStyle}
          />
          <AdaptiveButton
            title="No"
            onPress={() => setVisible(false)}
            style={styles.buttonStyle}
          />
        </View>
      </View>
      <AppLoader loading={loading} />
    </PopupContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {},
  headerTitle: {
    marginTop: hp(-2.5),
  },
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
export default UserDeletePopup;
