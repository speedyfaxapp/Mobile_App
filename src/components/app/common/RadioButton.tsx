//import libraries
import React, {useMemo} from 'react';
import {View, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import Colors from '../../../theme/Colors';

interface Props extends ViewProps {
  isSelected: boolean;
}

// Component
const RadioButton = (props: Props) => {
  const {style, isSelected} = props;

  const mainStyle = useMemo(() => {
    const tempStyle = isSelected ? styles.selected : styles.unselected;
    return {...tempStyle, ...(style as ViewStyle)};
  }, [style, isSelected]);

  return (
    <View style={mainStyle}>{isSelected && <View style={styles.dot} />}</View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {},
  unselected: {
    height: 14,
    width: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: Colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    borderRadius: 20,
    backgroundColor: Colors.white,
    height: '40%',
    width: '40%',
  },
});

//export component
export default RadioButton;
