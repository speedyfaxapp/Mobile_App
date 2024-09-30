//import libraries
import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import {AppLocalizedStrings} from '../../../localization/Localization';
import CountryPickerWithNumber from '../common/CountryPickerWithNumber';
import {
  CallingCode,
  Country,
  CountryCode,
  FlagType,
  getAllCountries,
} from 'react-native-country-picker-modal';
import {
  getCallingCodeFromPhoneNumber,
  fetchContact,
  getPhoneNumberWithoutCode,
} from '../../../utility/helper/contact';
import Toast from '../../../utility/toast/Toast';

interface Props extends ViewProps {
  countryCode: CountryCode | undefined;
  mobileNumber: string;
  onPhoneNumberChange: (text: string) => void;
  onCountryCodeChange: (countCode: CountryCode, callCode: CallingCode) => void;
}

// Component
const SendTo = (props: Props) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const {
    style,
    mobileNumber,
    countryCode,
    onPhoneNumberChange,
    onCountryCodeChange,
  } = props;

  useEffect(() => {
    getAllCountries(FlagType.EMOJI).then(result => setCountries(result));
  }, []);

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const onContactHandler = async () => {
    try {
      const contact = await fetchContact();
      if (contact != null) {
        onPhoneNumberChange(getPhoneNumberWithoutCode(contact));
        const callingCode = getCallingCodeFromPhoneNumber(contact);
        if (callingCode.length > 0) {
          const country = countries.find(country =>
            country.callingCode.includes(callingCode),
          );
          if (country != undefined) {
            onCountryCodeChange(country.cca2, country.callingCode?.[0]);
          }
        }
      }
    } catch (error) {
      Toast.showToast((error as Error).message, 'Failure');
    }
  };

  return (
    <View>
      <View style={mainStyle}>
        <Text style={styles.addDocImageTitle}>
          {AppLocalizedStrings.newFaxScreen.sendTo}
        </Text>
        <CountryPickerWithNumber
          countryCode={countryCode}
          mobileNumber={mobileNumber}
          style={styles.picker}
          placeholderTitle={AppLocalizedStrings.newFaxScreen.number}
          rightIcon={true}
          onCountryCodeChange={onCountryCodeChange}
          onPhoneNumberChange={onPhoneNumberChange}
          onPressRightIcon={onContactHandler}
        />
      </View>
      <Text style={styles.addDocImageTitle}>
        {AppLocalizedStrings.newFaxScreen.addDoc}
      </Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.white,
    paddingBottom: hp(2),
    marginVertical: hp(3),
  },
  chooseTitle: {
    paddingTop: hp(1),
    paddingBottom: hp(2),
    paddingLeft: wp(5),
    ...Style.getTextStyle(16, 'Bold', Colors.accent),
  },
  picker: {
    marginHorizontal: wp(6),
  },
  addDocImageTitle: {
    ...Style.getTextStyle(18, 'Medium', Colors.accent),
  },
});

//export component
export default SendTo;
