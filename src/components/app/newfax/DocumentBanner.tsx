//import libraries
import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import ImageView from '../../image/ImageView';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';

interface Props extends ViewProps {
  title: string;
  image: string;
  onDelete: (value: string) => void;
  onZoomImage?: (value: any) => void;
  isUri?: boolean;
}

// Component
const DocumentBanner = (props: Props) => {
  const {style, title, image, onDelete, onZoomImage, isUri} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const removeMediaImage = () => {
    onDelete(image);
  };


  return (
    <View style={mainStyle}>
      <View style={styles.addDocContainer}>
        <TouchableOpacity onPress={onZoomImage}>
          <View style={styles.addDocView}>
            <ImageView
              source={isUri ? {uri: image} : image}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={removeMediaImage} style={styles.crossButton}>
          <SVG.RoundCross />
        </TouchableOpacity>
        <View style={styles.uploadView}>
          <Text style={styles.clickTitle}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.white,
    paddingTop: hp(2),
    marginVertical: hp(1),
  },
  addDocContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(5),
  },
  addDocView: {
    alignItems: 'center',
    width: 150,
    height: 130,
    marginBottom: hp(2),
    borderRadius: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    borderWidth: 1,
    justifyContent: 'center',
  },
  crossButton: {
    alignSelf: 'flex-start',
    marginLeft: wp(-3),
    padding: 4,
    marginTop: hp(-1.5),
  },
  uploadView: {
    marginLeft: wp(7),
    marginRight: wp(2),
  },
  clickTitle: {
    ...Style.getTextStyle(16, 'Regular', Colors.primary),
  },
  image: {
    width: 135,
    height: 120,
    borderRadius: 3,
  },
});

//export component
export default DocumentBanner;
