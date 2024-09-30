//import libraries
import React, {useMemo} from 'react';
import {View, StyleSheet, ViewProps, ViewStyle, TextInput} from 'react-native';
import CountryPicker from '../../country_picker/CountryPicker';
import {CallingCode, CountryCode} from 'react-native-country-picker-modal';
import Colors from '../../../theme/Colors';
import {TouchableOpacity} from 'react-native';
import SVG from '../../../assets/svg';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';

interface Props extends ViewProps {
  placeholderTitle: string;
  mobileNumber?: string;
  countryCode?: CountryCode | undefined;
  onPhoneNumberChange: (text: string) => void;
  onCountryCodeChange: (countCode: CountryCode, callCode: CallingCode) => void;
  rightIcon?: boolean;
  onPressRightIcon?: () => void;
}

// Component
const CountryPickerWithNumber = (props: Props) => {
  const {
    mobileNumber,
    countryCode,
    style,
    placeholderTitle,
    onCountryCodeChange,
    onPhoneNumberChange,
    rightIcon = true,
    onPressRightIcon,
  } = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <View style={mainStyle}>
      <View style={styles.flagView}>
        <CountryPicker
          countryISOCode={countryCode}
          onValueChange={onCountryCodeChange}
        />
      </View>
      <TextInput
        value={mobileNumber}
        placeholder={placeholderTitle}
        placeholderTextColor={Colors.accent}
        style={styles.textInput}
        maxLength={20}
        onChangeText={onPhoneNumberChange}
        keyboardType="number-pad"
      />
      {rightIcon && (
        <TouchableOpacity
          style={styles.userIconButton}
          onPress={onPressRightIcon}>
          <SVG.User />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    borderWidth: 0.3,
    borderColor: Colors.accent,
    flexDirection: 'row',
    height: 50,
  },
  flagView: {
    borderRightWidth: 0.3,
    borderColor: Colors.accent,
    height: 50,
    justifyContent: 'center',
  },
  flahIcon: {
    ...Style.getTextStyle(16, 'Bold', Colors.accent),
    paddingLeft: wp(3),
  },
  textInput: {
    flex: 1,
    paddingHorizontal: wp(3),
    ...Style.getTextStyle(19, 'Regular', Colors.accent),
  },
  userIconButton: {
    paddingHorizontal: wp(3),
    justifyContent: 'center',
  },
});

//export component
export default CountryPickerWithNumber;
