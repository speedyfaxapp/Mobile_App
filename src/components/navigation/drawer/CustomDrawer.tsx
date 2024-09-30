import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {StyleSheet, View} from 'react-native';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';

const kPaddingHorizontal = wp('4%');

const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  return (
    <View style={styles.screen}>
      <DrawerContentScrollView
        contentContainerStyle={styles.drawerContainerStyle}>
        <View style={styles.itemList}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  btn: {
    height: 25,
    alignItems: 'flex-start',
    paddingHorizontal: 0,
    marginBottom: 5,
    borderWidth: 0,
  },
  btnText: {
    marginLeft: 5,
    ...Style.getTextStyle(16, 'Regular', Colors.accent),
  },
  drawerContainerStyle: {
    paddingTop: 0,
  },
  profilePic: {
    height: wp(18),
    aspectRatio: 1,
    borderRadius: wp(18) / 2,
    position: 'absolute',
    left: wp('4%'),
    bottom: -wp(18) / 2,
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: kPaddingHorizontal,
    marginBottom: hp('2.5%'),
    alignItems: 'center',
  },
  lineView: {
    flexShrink: 1,
    height: 1,
    backgroundColor: Colors.white,
    marginHorizontal: kPaddingHorizontal,
    marginBottom: hp('2.5%'),
  },
  itemList: {
    paddingHorizontal: kPaddingHorizontal,
  },
  userName: {
    ...Style.getTextStyle(20, 'Regular', Colors.accent),
  },
  userInfo: {
    ...Style.getTextStyle(16, 'Regular', Colors.accent),
  },
  icon: {
    paddingHorizontal: 10,
    height: 'auto',
    paddingVertical: 8,
    marginRight: wp('2%'),
  },
});
