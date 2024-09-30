import {PermissionsAndroid, Platform} from 'react-native';
import {selectContactPhone} from 'react-native-select-contact';

export const fetchContact = async () => {
  if (Platform.OS === 'android') {
    const request = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );

    // denied permission
    if (request === PermissionsAndroid.RESULTS.DENIED)
      throw Error('Permission Denied');
    // user chose 'deny, don't ask again'
    else if (request === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN)
      throw Error('Permission Denied');
  }

  // Here we are sure permission is granted for android or that platform is not android
  const selection = await selectContactPhone();
  if (!selection) {
    return null;
  }
  const {contact, selectedPhone} = selection;
  return selectedPhone.number;
};

export const normalizePhoneNumber = (internationalNumber: string) => {
  const normalNumber = internationalNumber.replace(/[()\s]/g, '');
  return normalNumber;
};

export const getPhoneNumberWithoutCode = (phoneNumber: string) => {
  const normalisedNumber = normalizePhoneNumber(phoneNumber);
  let countryCode = getCallingCodeFromPhoneNumber(phoneNumber);
  if (countryCode.length > 0) {
    countryCode = '+' + countryCode;
  }
  return normalisedNumber.replace(countryCode, '');
};

export const getCallingCodeFromPhoneNumber = (phoneNumber: string) => {
  const countryCodeMatch = phoneNumber.match(/\+(\d+)/);
  if (countryCodeMatch) {
    const countryCode = countryCodeMatch[1];
    return countryCode;
  }
  return '';
};
