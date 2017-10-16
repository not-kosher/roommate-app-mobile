import { StackNavigator } from 'react-navigation';

import Roomies from './Roomies';

const RoomiesNav = StackNavigator(
  {
    // route config
    Roomies: {
      screen: Roomies,
      navigationOptions: {
        title: 'Roomies',
      },
    },
  },
  {
    // navigator config
  },
);

export default RoomiesNav;
