import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const scale = height / 640;

export default scale;
