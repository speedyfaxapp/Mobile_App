//import libraries
import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
  Image,
} from 'react-native';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import {AppLocalizedStrings} from '../../../localization/Localization';
import SVG from '../../../assets/svg';
import LogoutPopup from '../../popup/LogoutPopup';

interface Props extends ViewProps {
  data: any;
}

// Component
const LogoutCard = (props: Props) => {
  const {style, data} = props;

  const [visible, setVisible] = useState(false);

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const onLogoutHandler = () => {
    setVisible(true);
  };

  return (
    <View style={mainStyle}>
      <Text style={styles.headerTitle}>
        {AppLocalizedStrings.setting.senderInformation}
      </Text>
      <View style={styles.idMainView}>
        <View style={styles.iconView}>
          {/* <SVG.User2 width={30} height={30} /> */}
          <Image
            source={require('../../../assets/images/appleIcon.png')}
            style={{height: 40, width: 40, resizeMode: 'cover'}}
          />
          <Text style={styles.idTitle}>
            Signed in with Apple
            {/* {data?.txtEmail || data?.txtPhone} */}
          </Text>
        </View>
        <TouchableOpacity onPress={onLogoutHandler}>
          <SVG.Logout width={26} height={26} />
        </TouchableOpacity>
      </View>
      <LogoutPopup visible={visible} setVisible={setVisible} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    marginVertical: hp(2),
    paddingHorizontal: wp(5),
  },
  headerTitle: {
    ...Style.getTextStyle(16, 'Bold', Colors.accent),
  },
  idMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2.5),
    alignItems:'center'
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  idTitle: {
    ...Style.getTextStyle(22, 'SemiBold', Colors.accent),
    paddingHorizontal: wp(4),
    marginTop:3
  },
});

//export component
export default LogoutCard;
