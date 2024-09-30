import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import Colors from '../../../theme/Colors';
import FaxCoverPage from '../../../components/app/newfax/FaxCoverPage';
import {HomeStackScreenProps} from '../../../navigation/navigator/types';
import {AppLocalizedStrings} from '../../../localization/Localization';

const FaxCoverPageScreen = (
  props: HomeStackScreenProps<'FaxCoverPageScreen'>,
) => {
  const {navigation} = props;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Text style={styles.clearTitle}>
            {AppLocalizedStrings.faxCoverPage.cancel}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onCapture = props.route.params.onCapture;
  const coverPage = props.route.params.coverPage;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FaxCoverPage onCapture={onCapture} coverPage={coverPage} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FaxCoverPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  clearTitle: {
    fontSize: 14,
    color: Colors.monza,
  },
});
