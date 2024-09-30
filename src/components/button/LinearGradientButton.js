import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {hp} from '../../utility/responsive/ScreenResponsive';
const GradientButton = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <LinearGradient
        colors={['#379DD3', '#0963D2']}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 35, // Adjust the borderRadius according to your preference
    // overflow: 'hidden', // Ensure that the gradient doesn't overflow the border radius,
    marginTop: hp(2),
  },
  gradient: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 25, // Match the borderRadius of the buttonContainer
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default GradientButton;
