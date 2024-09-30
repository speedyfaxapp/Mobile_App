import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Modal from 'react-native-modal';
// import { scale, verticalScale } from "react-native-size-matters";
import ImageViewer from 'react-native-image-zoom-viewer';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import RNFetchBlob from "rn-fetch-blob";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {wp} from '../utility/responsive/ScreenResponsive';
import SVG from '../assets/svg';
import Colors from '../theme/Colors';

const ZoomInZoomOutPreview = ({isModalVisible, hideModal, data, index}) => {
  const images = data?.map(url => ({url}));
  const [isDownloadingStarted, setIsDownloadingStarted] = useState(false);
  // const downloadFile = async () => {
  //   setIsDownloadingStarted(true);
  //   const pathSegments = data[index]?.url.split("/");
  //   const fileNameWithExtension = pathSegments[pathSegments.length - 1];
  //   console.log("fileNameWithExtension", fileNameWithExtension);
  //   const { config, fs } = RNFetchBlob;
  //   let PictureDir = fs.dirs.DownloadDir;
  //   let date = new Date();
  //   let options = {
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       //Related to the Android only
  //       useDownloadManager: true,
  //       notification: true,
  //       path: PictureDir + "/" + fileNameWithExtension,
  //       description: fileNameWithExtension + " Download",
  //     },
  //   };
  //   config(options)
  //     .fetch("GET", data[index]?.url)
  //     .then(async (res) => {
  //       console.log("res -> ", JSON.stringify(res));
  //       // const channelId = await notifee.createChannel({
  //       //   id: "order",
  //       //   name: "Important Notifications",
  //       //   importance: AndroidImportance.HIGH,
  //       // });
  //       // notifee.displayNotification({
  //       //   title: fileNameWithExtension,
  //       //   ios: {
  //       //     foregroundPresentationOptions: {
  //       //       badge: true,
  //       //       sound: true,
  //       //       banner: true,
  //       //       list: true,
  //       //     },
  //       //   },
  //       //   android: {
  //       //     channelId: channelId,
  //       //     color: "#f6cd5c",
  //       //     importance: AndroidImportance.HIGH,
  //       //     style: {
  //       //       type: AndroidStyle.BIGTEXT,
  //       //       text: "File Downloaded Successfully.",
  //       //     },
  //       //   },
  //       // });
  //       displayNotification(
  //         fileNameWithExtension,
  //         "File Downloaded Successfully."
  //       );
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  return (
    <Modal
      onBackButtonPress={hideModal}
      style={styles.modalContainer}
      isVisible={isModalVisible}>
      <View style={styles.zoomContainer}>
        <View style={styles.crossContainer}>
          <TouchableOpacity style={{borderRadius:50}} onPress={hideModal}>

            {/* <Text style={{color: 'white'}}>close</Text> */}
            
            <SVG.Cross
              width={12}
              height={12}
              fill={Colors.white}
              style={{padding: 10}}
            />
          </TouchableOpacity>
        </View>
        <ImageViewer imageUrls={images} index={index} useNativeDriver />
        {data[index || 0]?.url === undefined ? null : (
          <TouchableOpacity
            style={styles.downloadContainer}
            activeOpacity={0.6}
            onPress={downloadFile}>
            <AntDesign name="download" size={20} />
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  crossContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    zIndex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  crossImg: {
    width: 30,
    height: 30,
  },
  imagePreview: {
    width: 400,
    height: 400,
  },
  modalContainer: {
    backgroundColor: 'black',
    margin: 0,
  },
  zoomContainer: {
    flex: 1,
    marginTop: wp(5),
  },
  downloadContainer: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    bottom: 30,
    alignSelf: 'center',
  },
});
export default ZoomInZoomOutPreview;
