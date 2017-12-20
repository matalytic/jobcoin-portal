import { ADD_FROM_ADDRESS, ADD_DASHBOARD_INFO } from '../actionTypes';

const defaultState = {
  loginStatus: false,
  fromAddress: '',
  balance: '0',
  transactions: [],
  balanceHistory: [],
};

let dashboard = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_FROM_ADDRESS:
      const { fromAddress } = action;
      return {
        ...state,
        fromAddress,
        loginStatus: true
      };
    case ADD_DASHBOARD_INFO:
      const { balance, transactions, balanceHistory } = action.data;
      return {
        ...state,
        balance,
        transactions,
        balanceHistory
      };
    default:
      return state;
  }
}

export default dashboard;
