import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
// @ts-ignore
import getBase64Grayscale from 'react-native-grayscale';
import uuid from 'react-native-uuid';

export const convertImageToGreyScale = async (path: string) => {
  const base64 = await RNFS.readFile(
    Platform.OS == 'ios' ? path.replace('file://', '') : path,
    'base64',
  );
  const grayscale = await getBase64Grayscale(base64);
  const filePath = `${RNFS.DocumentDirectoryPath}/${uuid.v4()}.png`; // Change the file name and extension as needed
  await RNFS.writeFile(filePath, grayscale, 'base64');
  return filePath;
};
