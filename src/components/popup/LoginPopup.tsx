//import libraries
import React, {Dispatch, SetStateAction, useMemo} from 'react';
import {View, Text, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import PopupContainer from './PopupContainer';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import AdaptiveButton from '../button/AdaptiveButton';
import {AppLocalizedStrings} from '../../localization/Localization';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SVG from '../../assets/svg';

interface Props extends ViewProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  navigation: () => void;
}

// Component
const LoginPopup = (props: Props) => {
  const {style, visible, setVisible, navigation} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <PopupContainer visible={visible} setVisble={setVisible}>
      <View>
        <Text style={[mainStyle, {marginBottom: -10}]}>{'Authorization'}</Text>
        <Text style={styles.popupContant}>
          {'Please login to become a premium member!'}
        </Text>
        <TouchableOpacity onPress={navigation} style={[styles.btnContainer,{flexDirection:"row",alignItems:"center"}]}>
        <SVG.Apple width={20} height={20} style={{marginBottom:5,marginRight:5}} />
          <Text style={styles.textStyle}>Sign in with apple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={[
            styles.btnContainer,
            {marginTop: 0, backgroundColor: Colors.border},
          ]}>
          <Text style={styles.textStyle}>Cancel</Text>
        </TouchableOpacity>
        {/* <AdaptiveButton
          title="Login"
          style={styles.buttonStyle}
          onPress={navigation}
        /> */}
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
  popupContant: {
    ...Style.getTextStyle(16, 'Regular', Colors.mountainMist),

    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: Colors.accent,
    alignSelf: 'center',
    paddingHorizontal: wp(14),
  },
  btnContainer: {
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  textStyle: {
    fontWeight: '600',
    fontSize: 16,
  },
});

//export component
export default LoginPopup;
