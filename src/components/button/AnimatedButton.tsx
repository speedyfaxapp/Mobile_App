//import libraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  Animated,
  TouchableOpacity,
  Easing,
} from 'react-native';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import {hp} from '../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../localization/Localization';

interface Props extends ViewProps {
  onPress: () => void;
  isEnabled: boolean;
}

// Component
const AnimatedButton = (props: Props) => {
  const {onPress, isEnabled} = props;
  const [animation] = useState(new Animated.Value(1));

  const startAnimation = () => {
    const decreaseWidth = Animated.timing(animation, {
      toValue: 0,
      duration: 1000, // Adjust the duration as needed
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    });

    const increaseWidth = Animated.timing(animation, {
      toValue: 1,
      duration: 1500, // Adjust the duration as needed
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    });

    Animated.sequence([decreaseWidth, increaseWidth]).start(() => {
      startAnimation(); // Restart the animation infinitely
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const buttonWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [220, 300], // Adjust the values for the minimum and maximum button width
  });

  return (
    <View>
      <Animated.View style={[styles.animatedView, {width: buttonWidth}]}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.title}>
            {isEnabled ? `Get 3 Days Free` : AppLocalizedStrings.plan.continue}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedView: {
    alignSelf: 'center',
    borderRadius: 8,
  },
  button: {
    backgroundColor: Colors.blue,
    height: Style.kButtonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: hp(1),
  },
  title: {
    ...Style.getTextStyle(19, 'Bold', Colors.white),
  },
});

//export component
export default AnimatedButton;
