import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Loading from 'screens/loading';
import Main from 'screens/main';
import Second from 'screens/second';

const MainStack = createStackNavigator(
  {
    Main,
    Second,
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
    headerVisible: false,
  },
);

const Root = createSwitchNavigator(
  {
    Loading,
    MainStack,
  },
  {
    initialRouteName: 'Loading',
    headerMode: 'none',
    headerVisible: false,
  },
);

export default Root;
