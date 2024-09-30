import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {Switch} from 'react-native';
import SVG from '../../../assets/svg';
import {moderateScale} from 'react-native-size-matters';

const NotificationScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.headerTitle}>
          {AppLocalizedStrings.notification.notificationHeader}
        </Text>
        <View style={styles.freeTrailView}>
          <View style={styles.cardIconView}>
            <SVG.Bell width={19} height={22} />
            <Text style={styles.freeTrailTitle}>
              {AppLocalizedStrings.notification.pushNotifications}
            </Text>
          </View>
          <Switch
            trackColor={{false: Colors.grey, true: Colors.switchLightGray}}
            thumbColor={isEnabled ? Colors.blue : Colors.white}
            ios_backgroundColor={Colors.switchLightGray}
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.switch}
          />
        </View>
        <Text style={styles.bottomTitle}>
          {AppLocalizedStrings.notification.getNotified}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    ...Style.getTextStyle(16, 'Bold', Colors.accent),
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
  },
  freeTrailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    marginHorizontal: wp(5),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  freeTrailTitle: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.accent),
    paddingHorizontal: wp(2),
  },
  switch: {
    transform: [
      {scaleX: moderateScale(0.9, 0.0)},
      {scaleY: moderateScale(0.9, 0.0)},
    ],
  },
  bottomTitle: {
    ...Style.getTextStyle(16, 'Medium', Colors.accent),
    paddingVertical: hp(1.5),
    textAlign: 'center',
  },
});
