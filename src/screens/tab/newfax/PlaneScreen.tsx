import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  SafeAreaView,
} from 'react-native';
import PlanPage from '../../../components/app/newfax/PlanPage';
import Colors from '../../../theme/Colors';
import SVG from '../../../assets/svg';
import {useNavigation} from '@react-navigation/native';
import {HomeStackScreenProps} from '../../../navigation/navigator/types';
import SubscriptionPlanPage from '../../../components/app/newfax/SubscriptionPlanPage';

const PlaneScreen = () => {
  const navigation =
    useNavigation<HomeStackScreenProps<'PlaneScreen'>['navigation']>();
  const onGoBackHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{position: 'absolute', right: 20, zIndex: 9999, top: 30}}>
        <TouchableOpacity style={{padding:5,backgroundColor:'white',borderRadius:100}} onPress={onGoBackHandler}>
          <SVG.Cross
            width={16}
            height={16}
            fill={Colors.blackBlue}
            style={{padding: 10}}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      {/* <PlanPage /> */}
      <SubscriptionPlanPage />
      {/* </ScrollView> */}
    </View>
  );
};

export default PlaneScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
