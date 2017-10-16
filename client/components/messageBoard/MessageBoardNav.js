import { TabNavigator } from 'react-navigation';

import Notifications from './Notifications';
import GeneralMessages from './GeneralMessages';

const MessageBoardNav = TabNavigator(
  {
    // route config
    Notifications: { screen: Notifications },
    GeneralMessages: { screen: GeneralMessages },
  },
  {
    // navigator config
  },
);

export default MessageBoardNav;
