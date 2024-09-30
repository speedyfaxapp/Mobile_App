import {HomeStackParamList} from '../../../navigation/navigator/types';

export default interface Setting {
  title: string;
  routeName?: keyof Pick<
    HomeStackParamList,
    | 'FAQScreen'
    | 'EulaScreen'
    | 'PrivacyPolicyScreen'
    | 'TermAndConditionsScreen'
    | 'AboutUsScreen'
    | 'TutorialScreen'
  >;
}

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
