import React, {ReactNode} from 'react';
import NavigationOptionProps from '../../models/interfaces/navigation/NavigationOptionProps';
import Colors from '../../theme/Colors';
import {wp} from '../responsive/ScreenResponsive';
import {StyleSheet} from 'react-native';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import SVG from '../../assets/svg';

const getHeaderLeft = (
  canGoBack: boolean,
  navigation: NavigationOptionProps,
): ReactNode | undefined => {
  return canGoBack ? (
    <AdaptiveButton
      type="text"
      style={styles.btnBack}
      Icon={SVG.ArrowRight}
      iconSize={wp(5)}
      iconColor={Colors.accent}
      iconStyle={styles.logoBack}
      onPress={() => navigation.navigation.goBack()}
    />
  ) : undefined;
};

export default {getHeaderLeft};

const styles = StyleSheet.create({
  btnBack: {
    paddingHorizontal: 0,
    paddingEnd: 8,
    height: 'auto',
    paddingVertical: 8,
  },
  logoBack: {
    transform: [{rotate: '180deg'}],
  },
});
