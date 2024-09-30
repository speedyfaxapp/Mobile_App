import React, {useState} from 'react';
import {
  Modal,
  TextInput,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import AdaptiveButton from '../button/AdaptiveButton';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import SVG from '../../assets/svg';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

const PromoCode: React.FC<ModalProps> = ({visible, onClose, onSubmit}) => {
  const [text, setText] = useState('');

  const handleTextChange = (inputText: string) => {
    setText(inputText);
  };

  const handleSubmit = () => {
    onSubmit(text);
    setText('');
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{
              width: '100%',

              paddingHorizontal: 20,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: '700'}}>Redeem</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
                color: Colors.lightGray,
                paddingTop: 5,
              }}>
              Enter a valid code to redeem
            </Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={handleTextChange}
            value={text}
            placeholder="Enter promo code ...."
            autoFocus
          />
          {/* <Button title="Submit" onPress={handleSubmit} /> */}
          <View style={{flexDirection: 'row'}}>
            <AdaptiveButton
              title={'Cancel'}
              style={styles.buttonCancelStyle}
              onPress={onClose}
            />
            <AdaptiveButton
              title={'Apply'}
              style={styles.buttonStyle}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonStyle: {
    backgroundColor: Colors.accent,
    alignSelf: 'center',
    paddingHorizontal: wp(8),
    marginVertical: hp(1),
    borderRadius: 10,
    marginHorizontal: hp(1),
  },
  buttonCancelStyle: {
    backgroundColor: Colors.lightGray,
    alignSelf: 'center',
    paddingHorizontal: wp(8),
    marginVertical: hp(1),
    borderRadius: 10,
    marginHorizontal: hp(1),
  },
  btnClose: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
  },
});

export default PromoCode;
