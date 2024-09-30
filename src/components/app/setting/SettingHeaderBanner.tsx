//import libraries
import React, {useMemo, useState} from 'react';
import {View, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import Colors from '../../../theme/Colors';
import SigninMethodItem from '../../popup/SigninMethodItem';
import GeneralInformationCard from './GeneralInformationCard';
import SigninMethodCard from './SigninMethodCard';
import MembershipCard from './MembershipCard';
import LogoutCard from './LogoutCard';
import History from '../../../models/interfaces/HistoryResponce';
import {useAppSelector} from '../../../store/Hooks';
import {hp} from '../../../utility/responsive/ScreenResponsive';

interface Props extends ViewProps {
  signinWithMobile: () => void;
  subscription: boolean;
  setSubscription: (value: boolean) => void;
  data: History[] | undefined;
}

// Component
const SettingHeaderBanner = (props: Props) => {
  const {style, signinWithMobile, data} = props;
  const [visible, setVisible] = useState(false);

  const isLoggedIn = useAppSelector(state => state.auth.user) != null;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const popupOpenHandler = () => {
    setVisible(true);
  };

  return (
    <View style={mainStyle}>
      {isLoggedIn ? (
        <LogoutCard data={data} />
      ) : (
        <SigninMethodCard
          signinWithMobile={signinWithMobile}
          popupOpenHandler={popupOpenHandler}
        />
      )}
      <View style={mainStyle}></View>
      <MembershipCard />
      <View style={styles.cardView}>
        <View style={mainStyle}></View>
        <GeneralInformationCard data={data} />
      </View>
      <SigninMethodItem visible={visible} setVisible={setVisible} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    borderBottomWidth: 1,
    borderColor: Colors.overlay,
  },
  cardView: {
    marginBottom: hp(3),
  },
});

//export component
export default SettingHeaderBanner;
