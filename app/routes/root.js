import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Loading from 'screens/loading';
import Main from 'screens/main';
import Second from 'screens/second';

const MainStack = createStackNavigator(
  {
    Second,
    Main,
  },
  {
    initialRouteName: 'Second',
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
