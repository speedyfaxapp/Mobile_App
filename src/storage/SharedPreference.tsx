import RNSInfo from 'react-native-sensitive-info';

type SharedPreferenceKeys =
  | 'user'
  | 'apple_login'
  | 'event'
  | 'token'
  | 'CreditCnt'
  | 'active_subscription';

const options: RNSInfo.RNSensitiveInfoOptions = {
  sharedPreferencesName: 'sharedPrefs',
  keychainService: 'keychain',
};

class SharedPreference {
  static getItem = async <T,>(
    key: SharedPreferenceKeys,
  ): Promise<T | undefined> => {
    const item = await RNSInfo.getItem(key, options);
    if (item == undefined) {
      return undefined;
    }
    return JSON.parse(item) as T;
  };

  static setItem = async (key: SharedPreferenceKeys, value: string) => {
    return await RNSInfo.setItem(key, value, options);
  };

  static removeItem = async (key: SharedPreferenceKeys) => {
    await RNSInfo.deleteItem(key, options);
  };
}

export default SharedPreference;
