//import libraries
import React, {useMemo} from 'react';
import {
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import {AppLocalizedStrings} from '../../../localization/Localization';

interface Props extends ViewProps {
  faxCoverPageHandler: () => void;
}

// Component
const CoverPageBanner = (props: Props) => {
  const {style, faxCoverPageHandler} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <TouchableOpacity style={mainStyle} onPress={faxCoverPageHandler}>
      <SVG.Add
        width={16}
        height={16}
        style={styles.icon}
        fill={Colors.primary}
      />
      <View style={styles.textMainView}>
        <Text style={styles.chooseTitle}>
          {AppLocalizedStrings.newFaxScreen.add}
        </Text>
        <Text style={styles.freeText}>
          {AppLocalizedStrings.newFaxScreen.free}
        </Text>
        <Text style={styles.chooseTitle}>
          {AppLocalizedStrings.newFaxScreen.coverPage}
        </Text>
      </View>

      <SVG.ToolTip width={15} height={15} style={styles.icon} />
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(1.5),
  },
  icon: {
    marginBottom: hp(1),
  },
  chooseTitle: {
    paddingBottom: hp(1),
    ...Style.getTextStyle(18, 'Medium', Colors.accent),
    textAlign: 'center',
    paddingHorizontal: wp(2),
  },
  freeText: {
    ...Style.getTextStyle(23, 'Bold', Colors.primary),
    paddingBottom: hp(1),
  },
  textMainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

//export component
export default CoverPageBanner;
