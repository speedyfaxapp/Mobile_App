//import libraries
import React, {useMemo} from 'react';
import {Text, StyleSheet, TextProps, TextStyle} from 'react-native';
import Style from '../../constants/Style';
import Colors from '../../theme/Colors';

interface Props extends TextProps {
  focused: boolean;
  title: string;
}

// Component
const TabBarLable = (props: Props) => {
  const {style, focused, title} = props;

  const mainStyle = useMemo(() => {
    const currentStyle = focused
      ? styles.activeTabLable
      : styles.inActiveTabLable;
    return {...styles.main, ...(style as TextStyle), ...currentStyle};
  }, [style, focused]);

  return <Text style={mainStyle}>{title}</Text>;
};

// Styles
const styles = StyleSheet.create({
  main: {
    marginTop: 4,
  },
  activeTabLable: {
    ...Style.getTextStyle(15, 'SemiBold', Colors.primary),
  },
  inActiveTabLable: {
    ...Style.getTextStyle(15, 'SemiBold', Colors.mountainMist),
  },
});

//export component
export default TabBarLable;
