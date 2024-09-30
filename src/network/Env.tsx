import Config from 'react-native-config';

type NativeConfig = {
  APP_NAME: string;
  BASE_URL: string;
  PATH: string;
  WEB_CLIENT_ID_IOS: string;
  WEB_CLIENT_ID_ANDROID: string;
};

const ENV = Config as NativeConfig;
export default ENV;
