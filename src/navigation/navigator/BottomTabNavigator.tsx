import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as NavigationTheme from '../../theme/NavigationTheme';
import {BottomTabParamList} from './types';
import SVG from '../../assets/svg';
import Colors from '../../theme/Colors';
import TabBarLable from '../../components/navigation/TabBarLable';
import {AppLocalizedStrings} from '../../localization/Localization';
import NewFaxScreen from '../../screens/tab/newfax/NewFaxScreen';
import HistoryScreen from '../../screens/tab/history/HistoryScreen';
import SettingsScreen from '../../screens/tab/setting/SettingsScreen';
import {Text, TouchableOpacity} from 'react-native';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const tabBarIcon = ({
  focused,
  color,
  size,
}: {
  focused: boolean;
  color: string;
  size: number;
}) => {
  return focused && <SVG.Diamond color={Colors.white} width={12} height={12} />;
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={NavigationTheme.tabOptions}>
      <Tab.Screen
        name="NewFaxScreen"
        component={NewFaxScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <TabBarLable
              focused={focused}
              title={AppLocalizedStrings.bottomTab.NewFax}
            />
          ),
          tabBarIcon: ({focused}) => (
            <SVG.Fax2
              fill={focused ? Colors.primary : Colors.mountainMist}
              width={34}
              height={34}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity>
              <Text>{AppLocalizedStrings.newFaxStack.clear}</Text>
            </TouchableOpacity>
          ),
          headerStyle: {
            height: 120,
            backgroundColor: Colors.cadetGray,
            shadowColor: Colors.transparent,
          },
        }}
      />
      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <SVG.History
                fill={focused ? Colors.primary : Colors.mountainMist}
                width={34}
                height={34}
              />
            );
          },
          tabBarLabel: ({focused}) => (
            <TabBarLable
              focused={focused}
              title={AppLocalizedStrings.bottomTab.history}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <SVG.Setting
                fill={focused ? Colors.primary : Colors.mountainMist}
                width={30}
                height={30}
              />
            );
          },
          tabBarLabel: ({focused}) => (
            <TabBarLable
              focused={focused}
              title={AppLocalizedStrings.bottomTab.setting}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
