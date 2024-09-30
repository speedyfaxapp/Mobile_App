import SVG from '../assets/svg';
import AddDocItem from '../models/interfaces/api/AddDocItem';

export const ADD_DOC_ITEM: AddDocItem[] = [
  {
    title: 'Cover Page',
    Icon: SVG.CoverPage,
    image: require('../assets/images/cover-page.png'),
  },
  {
    title: 'Photo Library',
    Icon: SVG.Gallery,
    image: require('../assets/images/photoLibrary.png'),
  },
  {
    title: 'Scan Document',
    Icon: SVG.Scan,
    image: require('../assets/images/scan-document.png'),
  },
  {
    title: 'Document Import',
    Icon: SVG.Cloud,
    image: require('../assets/images/documentImport.png'),
  },
];
