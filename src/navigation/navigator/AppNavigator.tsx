import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from '../RootNavigation';
import {ExtendedTheme} from '../../theme/NavigationTheme';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../../screens/splash/SplashScreen';
import {RootStackParamList} from './types';
import HomeStackNavigator from '../stack/HomeStackNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer theme={ExtendedTheme} ref={RootNavigation.navigation}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false, animationEnabled: false}}
        />
        <Stack.Screen
          name="HomeStackNavigator"
          component={HomeStackNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
