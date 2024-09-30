//import libraries
import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  Image,
} from 'react-native';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import {AppLocalizedStrings} from '../../../localization/Localization';
import SVG from '../../../assets/svg';

interface Props extends ViewProps {}

// Component
const PlanHeaderBanner = (props: Props) => {
  const {style} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <View style={mainStyle}>
      <Text style={styles.choosePlanTitle}>
        {AppLocalizedStrings.plan.choose}
      </Text>
      <View style={styles.headerIconMain}>
        <View style={styles.infoView}>
          <SVG.Unlimited width={30} height={30} style={styles.icon} />
          <Text style={styles.infoTitle2}>
            {AppLocalizedStrings.plan.unlimited}
          </Text>
        </View>
        <View style={[styles.infoView, styles.noAddView]}>
          <SVG.NoAdd width={25} height={25} style={styles.icon} />
          <Text style={[styles.infoTitle, styles.noAddTitle]}>
            {AppLocalizedStrings.plan.noAdd}
          </Text>
        </View>
        <View
          style={[
            styles.infoView,
            {
              justifyContent: 'center',
            },
          ]}>
          <Image
            style={{
              marginTop: 5,
              height: 20,
              width: 20,
              // resizeMode: 'contain',
              marginBottom: 12,
            }}
            source={require('../../../assets/images/notification.png')}
          />
          {/* <SVG.Tick width={30} height={30} style={styles.icon} /> */}
          <Text style={styles.infoTitle}>
            {AppLocalizedStrings.plan.tracking}
          </Text>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    marginBottom: hp(1),
    marginTop: hp(2),
  },
  headerIconMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  choosePlanTitle: {
    ...Style.getTextStyle(40, 'Bold', Colors.white),
    textAlign: 'center',
    lineHeight: 50,
    letterSpacing:2
    // paddingVertical: hp(3),
  },
  infoView: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: hp(1),
  },
  infoTitle: {
    ...Style.getTextStyle(20, 'Regular', Colors.white),
    textAlign: 'center',
    lineHeight: 24,
  },
  infoTitle2: {
    ...Style.getTextStyle(20, 'Regular', Colors.white),
    textAlign: 'center',
    lineHeight: 24,
    paddingTop: hp(0.5),
  },
  noAddView: {
    marginTop: hp(0.7),
  },
  noAddTitle: {
    paddingTop: hp(0.5),
  },
});

//export component
export default PlanHeaderBanner;
