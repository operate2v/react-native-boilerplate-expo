import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 320;

export default scale;
