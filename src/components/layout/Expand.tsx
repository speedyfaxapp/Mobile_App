import React, {useMemo} from 'react';
import {View, ViewStyle} from 'react-native';

interface ExpandProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

const Expand: React.FC<ExpandProps> = props => {
  const style: ViewStyle = useMemo(() => {
    return {
      flex: 1,
      ...props.style,
    };
  }, [props.style]);

  return <View style={style}>{props.children}</View>;
};

export default Expand;
