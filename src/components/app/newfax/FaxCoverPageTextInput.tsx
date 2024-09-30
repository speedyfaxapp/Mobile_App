//import libraries
import React, {useMemo} from 'react';
import {View, Text, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import Colors from '../../../theme/Colors';
import AdaptiveTextInput from '../../input/AdaptiveTextInput';

interface Props extends ViewProps {
  title: string;
  placeholderTitle: string;
  value: string;
  onChangText: (text: string) => void;
}

// Component
const FaxCoverPageTextInput = (props: Props) => {
  const {style, title, placeholderTitle, value, onChangText} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <View style={mainStyle}>
      <View style={styles.inputFirstView}>
        <Text style={styles.toTitle}>{title}</Text>
      </View>
      <AdaptiveTextInput
        value={value}
        placeholder={placeholderTitle}
        onChangeText={onChangText}
        style={styles.textInput}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    borderWidth: 0.5,
    marginHorizontal: wp(3),
    marginBottom: hp(2),
    height: 50,
  },
  inputFirstView: {
    borderRightWidth: 0.5,
    height: 50,
    justifyContent: 'center',
    width: 80,
  },
  toTitle: {
    paddingHorizontal: wp(3),
    ...Style.getTextStyle(12, 'Bold', Colors.accent),
  },
  textInput: {
    flex: 1,
    paddingHorizontal: wp(4),
    ...Style.getTextStyle(14, 'Regular', Colors.accent),
    borderWidth: 0,
    width: 247,
  },
});

//export component
export default FaxCoverPageTextInput;
