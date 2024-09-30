//import libraries
import React, {Dispatch, SetStateAction, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import {AppLocalizedStrings} from '../../../localization/Localization';
import AddDocumentItem from '../../popup/AddDocumentItem';
import CoverPage from '../../../models/interfaces/CoverPage';
import { useAppSelector } from '../../../store/Hooks';

interface Props extends ViewProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  imagePicker: () => void;
  scanDoc: () => void;
  documentPick: () => void;
  popupOpenHandler: () => void;
  popupCloseHandler: () => void;
  coverPage?: CoverPage;
  faxCoverPageHandler: () => void;
}

// Component
const AddDocumentBanner = (props: Props) => {
  const {
    style,
    visible,
    setVisible,
    imagePicker,
    scanDoc,
    documentPick,
    popupOpenHandler,
    popupCloseHandler,
    coverPage,
    faxCoverPageHandler,
  } = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const popupOpen = () => {
    popupOpenHandler();
  };

  const popupClose = () => {
    popupCloseHandler();
  };

  const gllaryHandler = () => {
    imagePicker();
  };

  const scanHandler = () => {
    scanDoc();
  };

  const documentHandler = () => {
    documentPick();
  };
  const coverPageHandler = () => {
    faxCoverPageHandler();
    setVisible(false);
  };

    const subscription = useAppSelector(state => state.subscription);
    console.log('subss---->', subscription.isRatingSubmit);
  return (
    <View>
      <View style={mainStyle}>
        <View style={styles.addDocContainer}>
          <TouchableOpacity style={styles.addDocView} onPress={popupOpen}>
            <View style={styles.docCardView}>
              <SVG.AddDoc />
              <Text style={styles.addDocTitle}>
                {AppLocalizedStrings.newFaxScreen.addDocument}
              </Text>
            </View>
          </TouchableOpacity>
          {!subscription.isActiveSubscription && subscription.creditCount == 10 ?
          <View style={styles.uploadView}>
            <Text style={styles.clickTitle}>
              {AppLocalizedStrings.newFaxScreen.freed}
            </Text>
          </View>
          :
          null
          }
        </View>

        <AddDocumentItem
          visible={visible}
          setVisible={setVisible}
          cancel={popupClose}
          gllaryHandler={gllaryHandler}
          scanHandler={scanHandler}
          documentHandler={documentHandler}
          coverPageHandler={coverPageHandler}
        />
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.white,
    paddingTop: hp(1),
  },
  addDocContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginTop: hp(1),
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
  addDocTitle: {
    ...Style.getTextStyle(17, 'Bold', Colors.accent),
    paddingHorizontal: wp(2),
    textAlign: 'center',
    paddingTop: hp(1),
  },
  uploadView: {
    marginLeft: wp(7),
    marginRight: wp(2),
  },
  clickTitle: {
    ...Style.getTextStyle(20, 'SemiBold', Colors.primary),
  },
  docCardView: {
    alignItems: 'center',
  },
});

//export component
export default AddDocumentBanner;
