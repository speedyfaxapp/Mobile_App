//import libraries
import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {AppLocalizedStrings} from '../../../localization/Localization';
import SVG from '../../../assets/svg';
import AdaptiveButton from '../../button/AdaptiveButton';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';

interface Props extends ViewProps {
  planeHandler: () => void;
}

// Component
const PreviewBanner = (props: Props) => {
  const {style, planeHandler} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={mainStyle}>
          <Text style={styles.sendingTitle}>
            {AppLocalizedStrings.preview.sending}
          </Text>
          <View style={styles.headerView}>
            <SVG.FaxMachine style={styles.icon} />
            <Text style={styles.number}>
              +1(416)666-6666 {AppLocalizedStrings.preview.page}
            </Text>
          </View>
          <View style={styles.imageView}>
            <Image source={require('../../../assets/images/coverPage.png')} />
            <Image
              source={require('../../../assets/images/doc.png')}
              style={styles.image}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomView}>
        <Text style={styles.bottomTitle}>
          {AppLocalizedStrings.preview.machine}
        </Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={planeHandler}>
          <SVG.Send />
          <Text style={styles.buttonTitle}>
            {AppLocalizedStrings.preview.send}
          </Text>
        </TouchableOpacity>
        <AdaptiveButton
          title={AppLocalizedStrings.preview.cancel}
          style={styles.cancelStyle}
        />
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.cadetGray,
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginVertical: hp(3),
  },
  sendingTitle: {
    ...Style.getTextStyle(20, 'Bold', Colors.white),
  },
  headerView: {
    flexDirection: 'row',
    marginBottom: hp(2),
  },
  icon: {
    alignSelf: 'center',
    marginRight: wp(2),
  },
  number: {
    ...Style.getTextStyle(20, 'Bold', Colors.accent),
  },
  imageView: {
    alignItems: 'center',
    paddingVertical: hp(1.5),
  },
  image: {
    marginVertical: hp(2),
  },
  bottomView: {
    backgroundColor: Colors.accent,
  },
  bottomTitle: {
    ...Style.getTextStyle(16, 'Regular', Colors.white),
    textAlign: 'center',
    paddingTop: hp(1.5),
    paddingHorizontal: wp(5),
  },
  buttonStyle: {
    backgroundColor: Colors.blue,
    alignSelf: 'center',
    paddingHorizontal: wp(14),
    paddingVertical: hp(2),
    marginTop: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonTitle: {
    ...Style.getTextStyle(18, 'Bold', Colors.white),
    paddingHorizontal: wp(3),
  },
  cancelStyle: {
    backgroundColor: Colors.accent,
    alignSelf: 'center',
    paddingHorizontal: wp(14),
    marginTop: hp(2),
    marginBottom: hp(1.5),
  },
});

//export component
export default PreviewBanner;
