//import libraries
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import {wp} from '../../utility/responsive/ScreenResponsive';
import FlagButton from './FlagButton';
import RNCountryPicker, {
  CallingCode,
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import {
  getCountryCallingCodeAsync,
  getEmojiFlagAsync,
} from 'react-native-country-picker-modal/lib/CountryService';
import {getCountry} from 'react-native-localize';
const nodeEmoji = require('node-emoji');

interface Props extends ViewProps {
  countryISOCode: CountryCode | undefined;
  onValueChange: (countryCode: CountryCode, callingCode: CallingCode) => void;
}

// Component
const CountryPicker = (props: Props) => {
  const {
    style,
    countryISOCode = getCountry() as CountryCode,
    onValueChange,
  } = props;
  const [visible, setVisible] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>(countryISOCode);
  const [emoji, setEmoji] = useState<string | undefined>();
  const [callingCode, setCallingCode] = useState<string>();

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  useEffect(() => {
    updatePickerValues(countryCode);
  }, [countryCode]);

  useEffect(() => {
    setCountryCode(countryISOCode);
  }, [countryISOCode]);

  const renderFlagButton = useCallback(
    () => (
      <FlagButton
        emoji={emoji}
        callingCode={callingCode}
        countryCode={countryCode}
        onPress={() => setVisible(true)}
      />
    ),
    [countryCode, callingCode, countryCode, emoji],
  );

  const updatePickerValues = async (code: CountryCode) => {
    const callingCode = await getCountryCallingCodeAsync(code);
    const emoji = await getEmojiFlagAsync(code);
    setCallingCode(callingCode);
    setEmoji(nodeEmoji.get(emoji));
    setCountryCode(code);
    setVisible(false);
    onValueChange(code, callingCode);
  };

  const onCountrySelect = async (country: Country) => {
    await updatePickerValues(country.cca2);
  };

  return (
    <View style={mainStyle}>
      <RNCountryPicker
        visible={visible}
        theme={styles.theme}
        withFilter
        withCallingCodeButton
        withEmoji
        withCallingCode
        countryCode={countryCode}
        onSelect={onCountrySelect}
        containerButtonStyle={styles.containerButtonStyle}
        renderFlagButton={renderFlagButton}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  theme: {
    fontSize: Fonts.normalize(16),
    fontFamily: Fonts.regular,
    onBackgroundTextColor: Colors.accent,
  },
  containerButtonStyle: {
    paddingHorizontal: wp(1),
  },
});

//export component
export default CountryPicker;
