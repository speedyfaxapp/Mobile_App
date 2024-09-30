import {useNavigation} from '@react-navigation/native';
//import libraries
import React, {Dispatch, SetStateAction, useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import History from '../../models/interfaces/HistoryResponce';
import {BottomTabScreenProps} from '../../navigation/navigator/types';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Toast from '../../utility/toast/Toast';
import AdaptiveButton from '../button/AdaptiveButton';
import AppLoader from '../indicator/AppLoader';
import FaxDetailsItem from './FaxDetailsItem';
import PopupContainer from './PopupContainer';

interface Props extends ViewProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  cancel: () => void;
  deleteFaxHandler: () => void;
  orderID: number;
  deleteFaxIndex: number;
  data: History[];
  imageSelected?: string;
}

// Component
const FaxDocumentItem = (props: Props) => {
  const {
    style,
    visible,
    setVisible,
    cancel,
    deleteFaxHandler,
    orderID,
    deleteFaxIndex,
    data,
    imageSelected,
  } = props;
  const [faxDetails, setFaxDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<BottomTabScreenProps<'NewFaxScreen'>['navigation']>();
  console.log('data');

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);
  // console.log('orderId',imageSelected);

  const popupOpenHandler = () => {
    setFaxDetails(true);
  };

  const navigationHandler = () => {
    cancel();
    //  console.log("==data=>>>",imageSelected);

    navigation.navigate('NewFaxScreen', {
      imageData: imageSelected,
      fromHistory: true,
    });
  };
  const shareFax = async () => {
    setLoading(true);
    try {
      const url = `http://64.227.130.159:5004/api/fax/shareFax/${orderID}`;

      // Fetch the PDF using the provided URL
      const response = await RNFetchBlob.config({
        fileCache: true,
        appendExt: 'pdf',
      }).fetch('GET', url);

      const pdfPath = response.path();
      //console.log('pdfPath===>>',response);

      // Check if the PDF path exists
      if (pdfPath) {
        // Share the downloaded PDF
        const newPath = pdfPath.replace(/([^\/]+)(?=\.\w+$)/, `Fax_${orderID}`);
        await RNFetchBlob.fs.mv(pdfPath, newPath);

        // Share the renamed PDF
        await Share.open({
          title: 'Share PDF',
          message: 'Check out this PDF!',
          url: `file://${newPath}`,
          type: 'application/pdf',
        });
      } else {
        throw new Error('PDF path is invalid or empty.');
      }
    } catch (error) {
      console.error('Error downloading or sharing PDF:', error.message);

      Toast.showToast(
        'Failed to share document. Please try again later.',
        'Failure',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PopupContainer visible={visible} setVisble={setVisible} fromBottom>
      <View style={mainStyle}>
        <Text style={styles.headerTitle}>
          {AppLocalizedStrings.popup.faxDocument}
        </Text>
        <View>
          <View style={styles.line}></View>
          <View style={styles.line}></View>

          <TouchableOpacity
            style={styles.libraryView}
            onPress={popupOpenHandler}>
            <Text style={styles.libraryTitle}>
              {AppLocalizedStrings.popup.deliveryReport}
            </Text>
          </TouchableOpacity>

          <View style={styles.line}></View>
          <View style={styles.line}></View>

          <TouchableOpacity
            style={styles.libraryView}
            onPress={navigationHandler}>
            <Text style={styles.libraryTitle}>
              {AppLocalizedStrings.popup.anotherNumber}
            </Text>
          </TouchableOpacity>

          <View style={styles.line}></View>
          <TouchableOpacity style={styles.libraryView} onPress={shareFax}>
            <Text style={styles.libraryTitle}>
              {AppLocalizedStrings.popup.shareFax}
            </Text>
          </TouchableOpacity>

          <FaxDetailsItem
            faxDetails={faxDetails}
            setFaxDetails={setFaxDetails}
            txtOrderNo={orderID}
          />

          <View style={styles.line}></View>
          <View style={styles.line}></View>
          <TouchableOpacity
            style={styles.libraryView}
            onPress={() => {
              deleteFaxHandler();
              delete data[deleteFaxIndex];
            }}>
            <Text style={styles.deleteTitle}>
              {AppLocalizedStrings.popup.delete}
            </Text>
          </TouchableOpacity>
        </View>
        <AdaptiveButton
          title={AppLocalizedStrings.popup.cancel}
          style={styles.buttonStyle}
          onPress={cancel}
        />
      </View>
      <AppLoader loading={loading} />
    </PopupContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {},
  headerTitle: {
    width: '90%',
    paddingBottom: hp(2),
    ...Style.getTextStyle(20, 'Bold', Colors.accent),
    marginTop: hp(-5),
    textAlign: 'center',
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor: Colors.border,
  },
  libraryView: {
    flexDirection: 'row',
    marginHorizontal: wp(3),
    marginVertical: hp(1),
    justifyContent: 'center',
  },
  libraryTitle: {
    ...Style.getTextStyle(18, 'SemiBold', Colors.accent),
    paddingVertical: hp(0.5),
  },
  deleteTitle: {
    ...Style.getTextStyle(18, 'SemiBold', Colors.monza),
    paddingVertical: hp(0.6),
  },
  buttonStyle: {
    backgroundColor: Colors.accent,
    alignSelf: 'center',
    paddingHorizontal: wp(14),
    marginTop: hp(3),
  },
});

//export component
export default FaxDocumentItem;
