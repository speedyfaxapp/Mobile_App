//import libraries
import React, {useMemo} from 'react';
import {View, Text, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import SVG from '../../../assets/svg';
import Style from '../../../constants/Style';
import Colors from '../../../theme/Colors';
import {hp} from '../../../utility/responsive/ScreenResponsive';

interface Props extends ViewProps {
  title: string;
  content: string;
  titleSec?: string;
}

// Component
const AuthBanner = (props: Props) => {
  const {style, title, content, titleSec} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <View style={mainStyle}>
      <SVG.Logo width={100} height={100} style={styles.logo} />
      <View style={styles.titleView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title2}>{titleSec}</Text>
      </View>
      <Text style={styles.peragraph}>{content}</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    marginVertical: hp(4),
  },
  logo: {
    alignSelf: 'center',
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  title: {
    ...Style.getTextStyle(20, 'SemiBold', Colors.accent),
    textAlign: 'center',
  },
  title2: {
    ...Style.getTextStyle(20, 'SemiBold', Colors.green),
    textAlign: 'center',
  },
  peragraph: {
    ...Style.getTextStyle(18, 'Regular', Colors.accent),
    textAlign: 'center',
  },
});

//export component
export default AuthBanner;
