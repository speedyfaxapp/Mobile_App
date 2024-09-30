//import libraries
import React, {useMemo} from 'react';
import {View, Text, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useAppSelector} from '../../../store/Hooks';

interface Props extends ViewProps {}

// Component
const SubscriptionType = (props: Props) => {
  const {style} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const isActiveSubscription = useAppSelector(
    state => state.subscription.isActiveSubscription,
  );

  return (
    <View>
      {isActiveSubscription ? (
        <Text style={styles.balenceCard}>
          {AppLocalizedStrings.setting.faxAvailable}
        </Text>
      ) : (
        <></>
        // <View style={mainStyle}>
        //   <View style={styles.iconView}>
        //     <SVG.Unlimited color={Colors.accent} />
        //     <Text style={styles.iconBottomTitle}>
        //       {AppLocalizedStrings.plan.unlimitedFax}
        //     </Text>
        //   </View>
        //   <View style={styles.iconView}>
        //     <SVG.NoAdd color={Colors.accent} />
        //     <Text style={styles.iconBottomTitle}>
        //       {AppLocalizedStrings.setting.noAds}
        //     </Text>
        //   </View>
        //   <View style={styles.iconView}>
        //     <SVG.Tick color={Colors.accent} style={styles.tickIcon} />
        //     <Text style={styles.iconBottomTitle}>
        //       {AppLocalizedStrings.setting.deliveryTracking}
        //     </Text>
        //   </View>
        // </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconView: {
    width: '30%',
    alignItems: 'center',
  },
  iconBottomTitle: {
    textAlign: 'center',
    paddingVertical: hp(1),
  },
  tickIcon: {
    marginBottom: hp(-1),
  },
  balenceCard: {
    ...Style.getTextStyle(18, 'SemiBold', Colors.primary),
    textAlign: 'center',
    paddingBottom: hp(1),
  },
});

//export component
export default SubscriptionType;
