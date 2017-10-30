import React from 'react';
import { TabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
  tabBarLabel: 'Balances',
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
  },
);

export default FinancialNav;
