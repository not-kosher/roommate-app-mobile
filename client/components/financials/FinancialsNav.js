import React from 'react';
import { TabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import * as color from '../../styles/common';
import Bills from './Bills';
import Charges from './Charges';

Bills.navigationOptions = {
  tabBarLabel: 'Bills',
  tabBarIcon: ({ tintColor }) => (
    <MaterialIcons
      name="account-balance"
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

Charges.navigationOptions = {
  tabBarLabel: 'Charges',
  tabBarIcon: ({ tintColor }) => (
    <MaterialIcons
      name="attach-money"
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const FinancialNav = TabNavigator(
  {
    Bills: {
      screen: Bills,
    },
    Charges: {
      screen: Charges,
    },
  },
  {
    lazy: true,
    tabBarOptions: {
      // labelStyle: {
      //   color: color.PRIMARY,
      // },
      tabStyle: {
        backgroundColor: color.WHITE,
      },
      inactiveTintColor: color.TEXT_L_GRAY,
      activeTintColor: color.PRIMARY,
    },
  },
);

export default FinancialNav;
