import {Share as RNShare} from 'react-native';

class Share {
  constructor() {}

  public static share = async (data: string) => {
    try {
      const result = await RNShare.share({
        message: data,
      });
      if (result.action === RNShare.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === RNShare.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      throw error;
    }
  };
}

export default Share;
