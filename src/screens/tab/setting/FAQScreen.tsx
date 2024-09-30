import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';
import ChipTitleView from '../../../components/app/common/FAQChipTitleView';
import {FAQ_DATA} from '../../../data/FAQDataProvider';

const FAQScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.appUsage}>{AppLocalizedStrings.FAQ.appUsage}</Text>
        {FAQ_DATA.map((item, index) => (
          <ChipTitleView
            key={index}
            title={item.title}
            content={item.content}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: Colors.aliceBlue},
  container: {
    paddingHorizontal: wp(5),
  },
  appUsage: {
    ...Style.getTextStyle(16, 'Bold', Colors.accent),
    paddingTop: hp(2),
  },
});
