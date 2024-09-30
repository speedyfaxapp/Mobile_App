import {Platform, StyleSheet} from 'react-native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {DrawerNavigationOptions} from '@react-navigation/drawer';
import {DefaultTheme} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import NavigationOptionProps from '../models/interfaces/navigation/NavigationOptionProps';
import HeaderElements from '../utility/navigation/HeaderElements';
import {wp} from '../utility/responsive/ScreenResponsive';
import Style from '../constants/Style';
import Colors from './Colors';
import Fonts from './Fonts';
import {hasNotch} from 'react-native-device-info';

export const TAB_BAR_HEIGHT =
  60 + (Platform.OS == 'ios' && hasNotch() ? 34 : 8);

export const stackOptions = (
  stackProps: NavigationOptionProps,
): StackNavigationOptions => {
  return {
    // headerTitleAlign: 'left',
    // headerShown: false,
    headerLeftContainerStyle: styles.leftContainer,
    headerRightContainerStyle: styles.rightContainer,
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: Colors.cadetGray,
    },
    headerTitleStyle: {
      ...Style.getTextStyle(25, 'Bold', Colors.accent),
    },
    headerTintColor: Colors.accent,
    headerBackTitleVisible: false,
    headerLeft: props =>
      HeaderElements.getHeaderLeft(props.canGoBack == true, stackProps),
  };
};

export const tabOptions = (): BottomTabNavigationOptions => {
  return {
    // headerShown: false,
    tabBarItemStyle: {
      marginTop: 10,
    },
    tabBarStyle: {
      borderTopWidth: 0,
      height: TAB_BAR_HEIGHT,
      backgroundColor: Colors.aliceBlue,
      shadowColor: Colors.primary,
      shadowOffset: {width: 0, height: -1},
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    headerTitleAlign: Platform.OS == 'android' ? 'left' : 'center',
    headerStyle: {
      backgroundColor: Colors.cadetGray,
      shadowColor: Colors.transparent,
    },
    headerTintColor: Colors.accent,
    headerTitleStyle: {
      ...Style.getTextStyle(23, 'Bold', Colors.accent),
    },
  };
};

export const drawerOptions = (): DrawerNavigationOptions => {
  return {
    headerStyle: {backgroundColor: Colors.white},
    headerTintColor: Colors.white,
    drawerType: 'front',
    headerShown: false,
    drawerItemStyle: {
      marginHorizontal: -6,
      marginVertical: -5,
    },
    drawerActiveBackgroundColor: Colors.transparent,
    drawerInactiveBackgroundColor: Colors.transparent,
  };
};

const styles = StyleSheet.create({
  tabBarLabel: {
    color: '#292929',
    fontSize: Fonts.normalize(14),
  },
  leftContainer: {paddingLeft: wp(4)},
  rightContainer: {paddingRight: wp(4)},
});

export const ExtendedTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
    primary: Colors.primary,
    card: Colors.accent,
  },
};
