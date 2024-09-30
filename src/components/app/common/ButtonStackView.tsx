import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {SvgProps} from 'react-native-svg';
import Colors from '../../../theme/Colors';
import Spacer from '../../layout/Spacer';

interface Props {
  items: React.FC<SvgProps>[];
  color?: string;
}

const ButtonStackView = (props: Props) => {
  const {items, color = Colors.accent} = props;
  const count = items.length;
  return (
    <View style={styles.main}>
      {items.map((Icon, index) => (
        <TouchableOpacity key={index} style={styles.btn}>
          <Icon color={color} width={18} height={18} fill={color} />
          <Spacer width={count > 1 && index < items.length - 1 ? 10 : 0} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default memo(ButtonStackView);

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
  },
  btn: {
    flexDirection: 'row',
  },
});
