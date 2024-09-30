//import libraries
import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {BottomTabScreenProps} from '../../../navigation/navigator/types';
import Style from '../../../constants/Style';
import Colors from '../../../theme/Colors';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import AdaptiveButton from '../../button/AdaptiveButton';
import {useAppSelector} from '../../../store/Hooks';
import * as HomeService from '../../../network/service/HomeService';

interface Props extends ViewProps {}

// Component
const SubscriptionCard = (props: Props) => {
  const {style} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const [loading, setLoading] = useState(false);
  const [plane, setPlane] = useState<any>();

  const isLoggedIn = useAppSelector(state => state.auth.user) != null;
  const isFocus = useIsFocused();

  const navigation =
    useNavigation<BottomTabScreenProps<'SettingsScreen'>['navigation']>();

  const navigationHandler = () => {
    navigation.navigate('PlaneScreen');
  };

  const onUserPlaneHandler = async () => {
    if (!isLoggedIn || !isFocus) {
      return;
    }
    setLoading(true);
    try {
      const response = await HomeService.userPlane();
      setPlane(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    onUserPlaneHandler();
  }, [isFocus]);

  return (
    <View style={mainStyle}>
      <AdaptiveButton
        title={AppLocalizedStrings.setting.unlimited}
        style={styles.subscripitionButton}
        textStyle={styles.textStyle}
        onPress={navigationHandler}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    marginTop: hp(2),
  },
  subscripitionButton: {
    backgroundColor: Colors.blue,
    alignSelf: 'center',
    width: 203,
    height: 53,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.blue,
    borderRadius: 30,
  },
  textStyle: {
    ...Style.getTextStyle(17, 'Bold', Colors.white),
  },
});

//export component
export default SubscriptionCard;
