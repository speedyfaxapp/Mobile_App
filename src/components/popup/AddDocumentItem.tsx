//import libraries
import React, {Dispatch, SetStateAction, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
  Image,
} from 'react-native';
import PopupContainer from './PopupContainer';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Style from '../../constants/Style';
import {ADD_DOC_ITEM} from '../../data/AddDocItem';
import AdaptiveButton from '../button/AdaptiveButton';

interface Props extends ViewProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  cancel: () => void;
  gllaryHandler: () => void;
  scanHandler: () => void;
  documentHandler: () => void;
  coverPageHandler: () => void;
}

// Component
const AddDocumentItem = (props: Props) => {
  const {
    style,
    visible,
    setVisible,
    cancel,
    gllaryHandler,
    scanHandler,
    documentHandler,
    coverPageHandler,
  } = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const onItemPress = (title: string) => {
    if (title == 'Photo Library') {
      gllaryHandler();
    } else if (title == 'Scan Document') {
      scanHandler();
    } else if (title == 'Document Import') {
      documentHandler();
    } else if (title == 'Cover Page') {
      coverPageHandler();
    }
  };

  return (
    <PopupContainer
      fromBottom
      title={'ADD DOCUMENT / IMAGE'}
      visible={visible}
      setVisble={setVisible}>
      {ADD_DOC_ITEM.map((item, i) => (
        <View key={i}>
          <View style={styles.line}></View>
          <TouchableOpacity
            style={styles.libraryView}
            onPress={onItemPress.bind(this, item.title)}>
            {/* <item.Icon width={25} height={25} style={styles.icon} /> */}
            <Image
              source={item?.image}
              style={{height: 50, width: 50, resizeMode: 'cover'}}
            />
            <Text style={styles.libraryTitle}>{item.title}</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
        </View>
      ))}
      <AdaptiveButton
        title="CANCEL"
        style={styles.buttonStyle}
        onPress={cancel}
      />
    </PopupContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {},
  headerTitle: {
    paddingBottom: hp(2),
    ...Style.getTextStyle(19, 'Bold', Colors.accent),
    paddingHorizontal: wp(5),
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor: Colors.border,
  },
  libraryView: {
    flexDirection: 'row',
    marginHorizontal: wp(3),
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  libraryTitle: {
    paddingLeft: wp(3),
    ...Style.getTextStyle(20, 'Regular', Colors.accent),
    paddingVertical: hp(2),
  },
  icon: {
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: Colors.accent,
    alignSelf: 'center',
    paddingHorizontal: wp(5),
    marginTop: hp(3),
    borderRadius: 10,
  },
});

//export component
export default AddDocumentItem;
