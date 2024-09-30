import React, {useMemo} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';

interface Props extends ViewProps {
  width?: number | string;
  height?: number | string;
}

const Spacer = (props: Props) => {
  const {style, width, height} = props;
  const mainStyle: ViewStyle = useMemo(() => {
    return {
      width: width,
      height: height,
      ...(style as ViewStyle),
    };
  }, [width, height, style]);

  return <View style={mainStyle} />;
};

export default Spacer;
