//import libraries
import React, {useMemo} from 'react';
import {
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';

interface Props extends ViewProps {
  title: String;
  onPress: () => void;
}

// Component
const SettingChipTitleView = (props: Props) => {
  const {style, title, onPress} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <TouchableOpacity style={mainStyle} onPress={onPress}>
      <Text style={styles.cardTitle}>{title}</Text>
      <SVG.ArrowRight width={10} height={10} />
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.5),
    marginTop: hp(1.5),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp(5),
  },
  cardTitle: {
    ...Style.getTextStyle(16, 'Regular', Colors.accent),
  },
});

//export component
export default SettingChipTitleView;
