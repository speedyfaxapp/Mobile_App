//import libraries
import React, {useMemo} from 'react';
import {View, Text, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import SVG from '../../../assets/svg';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useAppSelector} from '../../../store/Hooks';

interface Props extends ViewProps {}

// Component
const FreeFaxBanner = (props: Props) => {
  const {style} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const subscription = useAppSelector(state => state.subscription);

  return (
    <View style={mainStyle}>
      <Text style={styles.headerTitle}>
        {subscription.isActiveSubscription
          ? AppLocalizedStrings.newFaxScreen.subscribe
          : AppLocalizedStrings.newFaxScreen.sendFaxes}
      </Text>
      <SVG.Rocket width={27} height={27} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    backgroundColor: Colors.blue,
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: hp(3),
    paddingVertical: hp(1.3),
    paddingHorizontal: wp(5),
    alignItems: 'center',
  },
  headerTitle: {
    alignSelf: 'center',
    ...Style.getTextStyle(20, 'Bold', Colors.white),
  },
});

//export component
export default FreeFaxBanner;
