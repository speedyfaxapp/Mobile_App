import React, {Dispatch, SetStateAction, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  ViewStyle,
  Text,
} from 'react-native';
import Style from '../../constants/Style';
import Colors from '../../theme/Colors';
import SVG from '../../assets/svg/index';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {wp} from '../../utility/responsive/ScreenResponsive';

interface PopupContainerProps {
  title?: string;
  visible: boolean;
  setVisble: Dispatch<SetStateAction<boolean>>;
  fromBottom?: boolean;
}

const PopupContainer = (
  props: React.PropsWithChildren<PopupContainerProps>,
) => {
  const insets = useSafeAreaInsets();
  const {
    visible = true,
    setVisble,
    children,
    title = '',
    fromBottom = false,
  } = props;

  const contentWrapperStyle: ViewStyle = useMemo(() => {
    return {...styles.contentWrapper, paddingBottom: insets.bottom / 2};
  }, [insets.bottom]);

  const onCloseHandler = () => {
    setVisble(false);
  };

  return (
    <Modal transparent visible={visible}>
      <View
        style={[
          styles.mainContainer,
          {justifyContent: fromBottom ? 'flex-end' : 'center'},
        ]}>
        <View
          style={[
            styles.subContenter,
            {borderTopRightRadius: fromBottom ? 15 : 0},
            {borderTopLeftRadius: fromBottom ? 15 : 0},
            {marginHorizontal: fromBottom ? undefined : wp(3)},
          ]}>
          <View style={contentWrapperStyle}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{title}</Text>
              <TouchableOpacity
                style={styles.btnClose}
                onPress={onCloseHandler}>
                <SVG.Cross width={20} height={20} />
              </TouchableOpacity>
            </View>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PopupContainer;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#00000070',
    flex: 1,
    justifyContent: 'flex-end',
  },
  subContenter: {
    paddingHorizontal: Style.screenPadding,
    paddingVertical: Style.screenPadding,
    backgroundColor: Colors.aliceBlue,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  contentWrapper: {},
  btnClose: {
    alignSelf: 'flex-end',
    paddingVertical: 3,
    paddingLeft: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    ...Style.getTextStyle(19, 'Bold', Colors.accent),
    paddingHorizontal: wp(5),
  },
});
