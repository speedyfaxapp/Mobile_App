//import libraries
import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import {AppLocalizedStrings} from '../../../localization/Localization';
import SVG from '../../../assets/svg';

interface Props extends ViewProps {
  popupOpenHandler: () => void;
  signinWithMobile: () => void;
}

const image = require('../../../assets/images/boarder.png');

// Component
const SigninMethodCard = (props: Props) => {
  const {style, popupOpenHandler, signinWithMobile} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <View style={mainStyle}>
      <TouchableOpacity onPress={popupOpenHandler} style={styles.featureView}>
        <Text style={styles.featureTitle}>
          {AppLocalizedStrings.setting.features}
        </Text>
        <SVG.ToolTip
          width={15}
          height={15}
          fill={Colors.primary}
          style={styles.icon}
        />
      </TouchableOpacity>
     
        <TouchableOpacity
          onPress={signinWithMobile}
          style={styles.signinButton}>
          <View style={styles.signinTitleView}>
             <SVG.Apple width={20} height={20} style={{marginBottom:5}} />
            <Text style={styles.signinTitle}>
              {AppLocalizedStrings.setting.signin}
            </Text>
            <Text style={styles.signinTitle}>
              {AppLocalizedStrings.setting.with}
            </Text>
            <Text style={styles.signinTitle}>
              {AppLocalizedStrings.setting.type}
            </Text>
          </View>
          {/*   <Text style={styles.signinType}>
            {AppLocalizedStrings.setting.type}
          </Text> */}
        </TouchableOpacity>
     
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    backgroundColor: Colors.white,
  },
  featureView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  icon: {
    marginTop: hp(-1),
    marginLeft: wp(1),
  },
  backImage: {
    width: wp(90),
    height: hp(10),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  signinButton: {
    alignItems: 'center',
    marginBottom: hp(1.3),
    borderWidth:1.5,
    padding:15,
    marginHorizontal:10
  },
  featureTitle: {
    ...Style.getTextStyle(15, 'SemiBold', Colors.accent),
    textAlign: 'center',
    paddingBottom: hp(1),
  },
  signinTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signinWith: {
    ...Style.getTextStyle(17, 'Regular', Colors.accent),
    paddingRight: wp(2),
  },
  signinTitle: {
    ...Style.getTextStyle(19, 'SemiBold' ),
    marginLeft:5

  },
  signinType: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.accent),
  },
});

//export component
export default SigninMethodCard;
