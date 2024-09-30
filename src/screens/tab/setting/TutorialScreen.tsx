import {StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Video from 'react-native-video';
import Style from '../../../constants/Style';

const TutorialScreen = () => {
  return (
    // <View style={styles.container}>
    //   <View style={styles.searchView}>
    //     <SVG.Search style={styles.icon} width={16} height={16} />
    //     <TextInput
    //       placeholder="Search video"
    //       placeholderTextColor={Colors.accent}
    //       style={styles.textInput}
    //     />
    //   </View>

    //   <View style={styles.videoCard}>
    //     <Image
    //       source={require('../../../assets/images/placeholder.jpeg')}
    //       style={styles.image}
    //     />
    //     <View style={styles.textView}>
    //       <Text style={styles.informtitle}>Information</Text>
    //       <Text style={styles.peragraph}>
    //         Lorem Ipsum is simply dummy typesetting industry.
    //       </Text>
    //     </View>
    //   </View>
    //   <View style={styles.videoCard}>
    //     <Image
    //       source={require('../../../assets/images/placeholder.jpeg')}
    //       style={styles.image}
    //     />
    //     <View style={styles.textView}>
    //       <Text style={styles.informtitle}>Information</Text>
    //       <Text style={styles.peragraph}>
    //         Lorem Ipsum is simply dummy typesetting industry.
    //       </Text>
    //     </View>
    //   </View>
    // </View>
    <Video
      source={require('../../../assets/video/video.mp4')}
      repeat={true}
      style={styles.backgroundVideo}
    />
  );
};

export default TutorialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.aliceBlue,
  },
  searchView: {
    flexDirection: 'row',
    borderWidth: 0.5,
    marginHorizontal: wp(5),
    marginVertical: hp(2.3),
  },
  icon: {
    paddingHorizontal: wp(4),
    alignSelf: 'center',
  },
  textInput: {
    flex: 1,
    paddingVertical: hp(1.5),
    paddingRight: wp(2),
  },
  backgroundVideo: {
    // aspectRatio: 1280 / 720,
    flex: 1,
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginTop: hp(2.5),
  },
  image: {
    width: 70,
    height: 70,
  },
  textView: {
    flex: 1,
    paddingHorizontal: wp(3),
  },
  informtitle: {
    ...Style.getTextStyle(16, 'Bold', Colors.accent),
  },
  peragraph: {
    ...Style.getTextStyle(16, 'Regular', Colors.cadetGray),
    lineHeight: 20,
  },
});
