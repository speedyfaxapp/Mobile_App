//import libraries
import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {useAppSelector} from '../../../store/Hooks';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import {IAP_PRODUCTS} from '../../../network/IAP';
import {SubscriptionIOS} from 'react-native-iap';

interface Props extends ViewProps {
  selectedIndex?: number;
  onPlanPress: (index: number) => void;
}

// Component
const PlanCard = (props: Props) => {
  const {selectedIndex, style, onPlanPress} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...(style as ViewStyle)};
  }, [style]);

  const subscription = useAppSelector(state => state.subscription);

  return (
    <View>
      {IAP_PRODUCTS.map((item, index) => {
        const isActive = selectedIndex == index;

        const appleProduct: SubscriptionIOS | undefined =
          subscription.subscriptions.find(
            i => i.productId == item.productId,
          ) as SubscriptionIOS;

        const hasOffer =
          appleProduct?.introductoryPricePaymentModeIOS &&
          appleProduct?.introductoryPricePaymentModeIOS.length > 0;

        return (
          <View key={index} style={mainStyle}>
            <View>
              <TouchableOpacity
                style={styles.planCardMain}
                onPress={onPlanPress.bind(this, index)}>
                {hasOffer && (
                  <View style={styles.saveView}>
                    <Text style={styles.saveTitle}>
                      {appleProduct?.introductoryPriceNumberOfPeriodsIOS +
                        ' ' +
                        appleProduct?.introductoryPriceSubscriptionPeriodIOS +
                        ' ' +
                        appleProduct?.introductoryPricePaymentModeIOS}
                    </Text>
                  </View>
                )}
                <View style={styles.cardCenterCard}>
                  <View>
                    <View style={styles.radioButtonMain}>
                      <View
                        style={[
                          styles.radioButton,
                          {
                            backgroundColor: isActive
                              ? Colors.blue
                              : Colors.transparent,
                          },
                        ]}
                      />
                    </View>
                  </View>
                  <View style={styles.paymentView}>
                    <Text style={styles.planeTitle}>{item.title}</Text>
                    <Text style={styles.planePriceTitle}>
                      {appleProduct?.localizedPrice}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    marginVertical: hp(1.3),
  },
  saveView: {
    backgroundColor: Colors.white,
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginTop: hp(-1.5),
  },
  saveTitle: {
    ...Style.getTextStyle(13, 'Bold', Colors.accent),
    paddingHorizontal: wp(4),
  },
  planCardMain: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: Colors.white,
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.7),
  },
  radioButtonMain: {
    borderWidth: 0.5,
    borderColor: Colors.lightGray,
    borderRadius: 100,
    width: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButton: {
    backgroundColor: Colors.blue,
    width: 12,
    height: 12,
    borderRadius: 100,
  },
  planeTitle: {
    ...Style.getTextStyle(16, 'SemiBold', Colors.white),
    marginBottom: -6,
  },
  planePriceTitle: {
    ...Style.getTextStyle(18, 'Bold', Colors.white),
  },
  paymentView: {
    flex: 1,
    marginHorizontal: wp(3),
    alignItems: 'center',
  },
  cardCenterCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

//export component
export default PlanCard;
