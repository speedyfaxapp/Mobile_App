import React, {useMemo} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';

interface RowProps extends ViewProps {}

const Row = (props: React.PropsWithChildren<RowProps>) => {
  const {style, children} = props;
  const mainStyle: ViewStyle = useMemo(() => {
    return {
      flexDirection: 'row',
      ...(style as ViewStyle),
    };
  }, [style]);

  return <View style={mainStyle}>{props.children}</View>;
};

export default Row;
