import React, {useMemo} from 'react';
import {
  StyleSheet,
  TextInput,
  TextStyle,
  ViewStyle,
  KeyboardType,
  View,
} from 'react-native';
import Style from '../../constants/Style';
import Colors from '../../theme/Colors';
import {wp} from '../../utility/responsive/ScreenResponsive';

interface AdaptiveTextInputProps {
  secureTextEntry?: boolean;
  value?: string;
  style?: TextStyle;
  containerStyle?: ViewStyle;
  keyboardType?: KeyboardType;
  placeholderTextColor?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  multiline?: boolean;
  numberOfLines?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
}

const AdaptiveTextInput: React.FC<AdaptiveTextInputProps> = props => {
  const {
    value,
    keyboardType = 'default',
    placeholderTextColor,
    placeholder,
    onChangeText,
    secureTextEntry = false,
    multiline = false,
    numberOfLines,
    containerStyle,
    autoCapitalize = 'words',
  } = props;

  const inputStyle: ViewStyle = useMemo(() => {
    let tempStyle = {...styles.textInput, ...(props.style ?? {})};

    return tempStyle;
  }, [props.style]);

  const style = useMemo(() => {
    return {...styles.main, ...containerStyle};
  }, [containerStyle]);

  return (
    <View style={style}>
      {/* <Text style={styles.placeholder}>{placeholder}</Text> */}
      <TextInput
        numberOfLines={numberOfLines}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        value={value}
        keyboardType={keyboardType}
        style={inputStyle}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor ?? Colors.accent}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

export default AdaptiveTextInput;

const styles = StyleSheet.create({
  main: {},
  textInput: {
    height: 50,
    borderWidth: 0.3,
    borderColor: Colors.accent,
    width: '100%',
    ...Style.getTextStyle(16, 'Regular', Colors.accent),
    paddingHorizontal: wp(3),
  },
});
