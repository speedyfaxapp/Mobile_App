//import libraries
import React, {useMemo} from 'react';
import {
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {CountryCode} from 'react-native-country-picker-modal';
import Style from '../../constants/Style';
import Colors from '../../theme/Colors';

interface Props extends ViewProps {
  emoji: string | undefined;
  callingCode: string | undefined;
  countryCode: CountryCode;
  onPress: () => void;
}

// Component
const FlagButton = (props: Props) => {
  const {emoji = '', callingCode = '', style, countryCode, onPress} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <TouchableOpacity style={mainStyle} onPress={onPress}>
      <Text style={styles.emoji} allowFontScaling={false}>
        {emoji}
      </Text>
      {callingCode.length > 0 && (
        <Text style={styles.callingCode}>{`+${callingCode}`}</Text>
      )}
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: '100%',
  },
  emoji: {
    fontSize: 30,
  },
  callingCode: {
    marginLeft: 4,
    ...Style.getTextStyle(16, 'Regular', Colors.accent),
  },
});

//export component
export default FlagButton;
