//import libraries
import React, {Dispatch, SetStateAction, useMemo} from 'react';
import {View, Text, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import PopupContainer from './PopupContainer';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import AdaptiveButton from '../button/AdaptiveButton';
import * as StoreReview from 'react-native-store-review';
import {AppLocalizedStrings} from '../../localization/Localization';
import {useAppSelector} from '../../store/Hooks';
import {store} from '../../store/Store';
import {updateRemindMe} from '../../store/slices/SubscriptionSlice';
import SharedPreference from '../../storage/SharedPreference';
import * as CrispChatSDK from 'react-native-crisp-chat-sdk';

interface Props extends ViewProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setRemindMeLate?: (value: boolean) => void;
}

// Component
const RateUsPopup = (props: Props) => {
  const {style, visible, setVisible, setRemindMeLate} = props;
  const creditCounts = useAppSelector(state => state.subscription.creditCount);

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const onRateUsHandler = () => {
    StoreReview.requestReview();
  };
  const onSupportHandler = () => {
    CrispChatSDK.show();
  };
  return (
    <PopupContainer visible={visible} setVisble={setVisible}>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: Colors.accent,
            alignSelf: 'center',
          }}>
          {'Rate Speedy Fax'}
        </Text>

        <Text style={styles.popupContant}>
          {'If you enjoy our app, please take a moment to rate us'}
        </Text>
        <View style={{}}>
          <AdaptiveButton
            title="Rate"
            onPress={onRateUsHandler}
            style={styles.buttonStyle}
            textStyle={{color: Colors.white}}
          />
          <View style={{marginTop: 10}}>
            <AdaptiveButton
              title="Send Feedback"
              onPress={onSupportHandler}
              style={styles.simpleButtonStyle}
              textStyle={{color: 'black'}}
            />
          </View>

          <View style={{marginTop: 10}}>
            <AdaptiveButton
              title="Not now"
              onPress={async () => {
                store.dispatch(updateRemindMe(true));
                await SharedPreference.setItem(
                  'remindMe',
                  JSON.stringify(true),
                );
                setVisible(false);
              }}
              style={styles.simpleButtonStyle}
              textStyle={{color: 'black'}}
            />
          </View>
          {/* <Text
            style={{
              textAlign: 'center',
              color: Colors.blue,
              marginTop: 10,
              fontSize: 16,
              fontWeight: '500',
            }}
            onPress={async () => {
              store.dispatch(updateRemindMe(true));
              await SharedPreference.setItem('remindMe', JSON.stringify(true));
              setVisible(false);
            }}>
            Annoy me again some other time
          </Text> */}
        </View>
      </View>
    </PopupContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    textAlign: 'center',
    marginTop: hp(-4.5),
    ...Style.getTextStyle(18, 'SemiBold', Colors.accent),
    alignSelf: 'center',
  },
  popupContant: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 15,
  },
  buttonStyle: {
    backgroundColor: '#f67702',
    alignSelf: 'center',
    marginHorizontal: 0,
    width: '100%',
    marginTop: 2,
    borderRadius: 20,
  },
  simpleButtonStyle: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginHorizontal: 0,
    width: '100%',
    marginTop: 2,
    borderRadius: 20,
  },
});

//export component
export default RateUsPopup;
