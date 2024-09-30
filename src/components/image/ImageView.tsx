41;
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import FastImage, {
  ImageStyle,
  ResizeMode,
  Priority,
  Source,
} from 'react-native-fast-image';

interface ImageViewProps {
  source: Source | string | undefined;
  style?: ImageStyle;
  resizeMode?: ResizeMode;
  priority?: Priority;
}

const ImageView: React.FC<ImageViewProps> = props => {
  const {source, style, resizeMode, priority} = props;

  const mediaSource = useMemo(() => {
    return typeof source == 'string'
      ? {
          uri: source,
          priority: priority ?? FastImage.priority.high,
        }
      : source;
  }, [source]);

  return (
    <FastImage
      defaultSource={require('../../assets/images/placeholder.jpeg')}
      style={style}
      source={mediaSource}
      resizeMode={resizeMode ?? FastImage.resizeMode.cover}
    />
  );
};

export default ImageView;

const styles = StyleSheet.create({});
