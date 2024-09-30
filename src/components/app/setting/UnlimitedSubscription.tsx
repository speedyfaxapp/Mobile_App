//import libraries
import React, {useMemo} from 'react';
import {View, Text, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import SVG from '../../../assets/svg';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Style from '../../../constants/Style';
import Colors from '../../../theme/Colors';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import {useAppSelector} from '../../../store/Hooks';

interface Props extends ViewProps {}

// Component
const UnlimitedSubscription = (props: Props) => {
  const {style} = props;
  const creditCounts = useAppSelector(state => state.subscription.creditCount);
  const isLoggedIn = useAppSelector(state => state.auth.user) != null;
  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <View style={mainStyle}>
      <View style={styles.availableCreditsView}>
        <SVG.Doller width={30} height={30} />
        <View>
          <Text style={styles.availableCreditsTitle}>
            {AppLocalizedStrings.setting.availableCredits}
          </Text>
          <Text style={styles.creditss}>
            {AppLocalizedStrings.setting.fax1}
          </Text>
        </View>
      </View>
    
        <View style={styles.amountCreditsView}>
          <Text style={styles.amountCredits}>
            {isLoggedIn? ` ${creditCounts} ${AppLocalizedStrings.setting.credits}`:`${"0"+ AppLocalizedStrings.setting.credits}`}
          </Text>
        </View>
    
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  availableCreditsView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availableCreditsTitle: {
    ...Style.getTextStyle(16, 'Regular', Colors.accent),
    lineHeight: 20,
    paddingHorizontal: wp(2.5),
  },
  creditss: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.accent),
    lineHeight: 20,
    paddingHorizontal: wp(2.5),
  },
  amountCreditsView: {
    alignSelf: 'center',
  },
  amountCredits: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.primary),
  },
});

//export component
export default UnlimitedSubscription;
