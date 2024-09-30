//import libraries
import React, {useMemo, useState} from 'react';
import {
  View,
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
  title: string;
  content: string;
}

// Component
const ChipTitleView = (props: Props) => {
  const {style, title, content} = props;
  const [open, setOpen] = useState(false);

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const toggleHandler = () => {
    setOpen(val => !val);
  };
  const bgColor = open ? Colors.accent : Colors.white;
  const textColor = open ? Colors.white : Colors.accent;

  return (
    <View style={mainStyle}>
      <TouchableOpacity
        style={[styles.container, {backgroundColor: bgColor}]}
        onPress={toggleHandler}>
        <Text style={[styles.title, {color: textColor}]}>{title}</Text>
        <SVG.ArrowRight
          width={10}
          height={10}
          style={styles.icon}
          fill={textColor}
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.contentView}>
          <Text style={styles.contentTitle}>{content}</Text>
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.white,
    marginTop: hp(1.5),
    justifyContent: 'space-between',
    shadowColor: Colors.accent,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  container: {
    backgroundColor: Colors.accent,
    flexDirection: 'row',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    ...Style.getTextStyle(16, 'Bold', Colors.white),
    paddingHorizontal: wp(2),
  },
  contentView: {
    backgroundColor: Colors.white,
  },
  contentTitle: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    ...Style.getTextStyle(16, 'SemiBold', Colors.accent),
  },
  icon: {
    transform: [{rotate: '90deg'}],
  },
});

//export component
export default ChipTitleView;
