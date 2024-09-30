import React, {useMemo} from 'react';
import {View, ViewStyle} from 'react-native';

interface ColumnProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

const Column: React.FC<ColumnProps> = props => {
  const style: ViewStyle = useMemo(() => {
    return {
      flexDirection: 'column',
      ...props.style,
    };
  }, [props.style]);

  return <View style={style}>{props.children}</View>;
};

export default Column;
