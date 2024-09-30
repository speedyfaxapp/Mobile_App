//import libraries
import React, {Dispatch, SetStateAction, useMemo, useState} from 'react';
import {View, Text, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import PopupContainer from './PopupContainer';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import AdaptiveButton from '../button/AdaptiveButton';
import {AppLocalizedStrings} from '../../localization/Localization';
import History from '../../models/interfaces/HistoryResponce';
import * as HomeService from '../../network/service/HomeService';
import DeviceInfo from 'react-native-device-info';
import AppLoader from '../indicator/AppLoader';

interface Props extends ViewProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: History[] | undefined;
}

// Component
const ResendPopup = (props: Props) => {
  const {style, visible, setVisible, data} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const [loading, setLoading] = useState(false);

  const onResendHandler = async (txtOrderNo: any) => {
    const deviceId = await DeviceInfo.getUniqueId();
    try {
      setLoading(true);
      const response = await HomeService.resendFax({
        txtOrderNo: txtOrderNo,
        txtDeviceId: deviceId,
      });
      setVisible(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <PopupContainer visible={visible} setVisble={setVisible}>
      <View style={mainStyle}>
        <Text style={styles.headerTitle}> </Text>
        <Text style={styles.popupContant}>
          {AppLocalizedStrings.popup.reSend}
          {AppLocalizedStrings.popup.failedFax}
        </Text>
        <AdaptiveButton
          title={AppLocalizedStrings.popup.resend}
          onPress={() => onResendHandler(data)}
          style={styles.buttonStyle}
        />
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
});

//export component
export default ResendPopup;
