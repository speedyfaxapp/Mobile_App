import React, {useState, useRef} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import {RNCamera} from 'react-native-camera';

const DocumentScannerCamera = ({close}) => {
  const [showInstructions, setShowInstructions] = useState(true);
  const cameraRef = useRef(null);

  const renderInstructions = () => (
    <Modal visible={showInstructions} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>How to scan your documents</Text>
          <Text style={styles.modalText}>• Glossy paper? Turn off flash</Text>
          <Text style={styles.modalText}>• Scan in well-lit areas</Text>
          <Text style={styles.modalText}>• Use a flat, stable surface</Text>
          <Text style={styles.modalText}>
            • Hold your phone directly above the document
          </Text>
          <Text style={styles.modalText}>
            • Make sure all edges are in frame
          </Text>
          <TouchableOpacity
            style={styles.understoodButton}
            onPress={() => {setShowInstructions(false);}}>
            <Text style={styles.understoodText}>Understood</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}>
        {renderInstructions()}
        <View style={styles.controls}>
          <TouchableOpacity onPress={close} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.autofitButton}>
            <Text style={styles.autofitButtonText}>Autofit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.captureButton}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red'
  },
  camera: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 5,
  },
  understoodButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  understoodText: {
    color: 'white',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  },
  autofitButton: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
  },
  autofitButtonText: {
    color: 'white',
  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});

export default DocumentScannerCamera;
