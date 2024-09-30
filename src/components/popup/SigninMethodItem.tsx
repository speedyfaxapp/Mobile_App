//import libraries
import React, {Dispatch, SetStateAction, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  ScrollView,
} from 'react-native';
import PopupContainer from './PopupContainer';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Style from '../../constants/Style';
import {ABOUTSIGNINMETHOD} from '../../data/AboutSigninMethod';
import {AppLocalizedStrings} from '../../localization/Localization';

interface Props extends ViewProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

// Component
const SigninMethodItem = (props: Props) => {
  const {style, visible, setVisible} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  return (
    <PopupContainer
      title={AppLocalizedStrings.popup.SigninMethod}
      visible={visible}
      setVisble={setVisible}
      fromBottom>
      <View>
        <ScrollView>
          <Text style={styles.headerTitle}>
            {AppLocalizedStrings.popup.features}
          </Text>
          <View style={styles.titles}>
            {ABOUTSIGNINMETHOD.map((item, i) => (
              <View style={styles.listView} key={i}>
                <Text style={styles.listTitle}>
                  {'\u2022  '}
                  {item.title}
                </Text>
                {item.Icon != undefined && <item.Icon width={55} height={60} />}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </PopupContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {},
  headerTitle: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.primary),
    marginLeft: wp(3),
  },
  titles: {
    marginLeft: wp(3),
  },
  listView: {
    flexDirection: 'row',
  },
  listTitle: {
    paddingVertical: hp(1.5),
    paddingRight: wp(4),
    ...Style.getTextStyle(16, 'Regular', Colors.accent),
  },
});

//export component
export default SigninMethodItem;
