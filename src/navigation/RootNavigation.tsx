import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from './navigator/types';

class RootNavigation {
  private constructor() {}

  static navigation = createNavigationContainerRef<RootStackParamList>();

  static navigate = (
    name: keyof RootStackParamList,
    params?: StackScreenProps<RootStackParamList>['route']['params'],
  ) => {
    if (RootNavigation.navigation.isReady()) {
      // @ts-ignore
      RootNavigation.navigation.navigate(name, params);
    }
  };

  static replace = (name: keyof RootStackParamList, params?: {}) => {
    const navigation = RootNavigation.navigation;
    navigation.dispatch(StackActions.replace(name, params));
  };

  static resetRoot = (actions = []) => {
    const navigation = RootNavigation.navigation;
    // const rootState = navigation.getRootState();
    // const state = navigation.getState();
    navigation.dispatch(state => {
      let newState = JSON.parse(JSON.stringify(state));
      newState.routes.push(...actions);
      return CommonActions.reset({
        ...newState,
        index: newState.routes.length - 1,
        routes: newState.routes,
      });
    });
  };
}

export default RootNavigation;
