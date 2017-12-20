import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import { addDashboardInfo } from './actions';
import SendForm from './SendForm';
import Graph from './Graph';
import Balance from './Balance';
import Navbar from './Navbar';
import { convertTransactionData } from '../utils';
import api from '../config';
import './styles.less';

class Dashboard extends Component {
  handleTransaction(event) {
    event.preventDefault();
    const { fromAddress } = this.props;
    const { toAddress, amount } = this.props.form.send.values;
    // console.log('Transaction sent to', toAddress,'from ', fromAddress,':' amount);

    axios.post(`${api.jobcoin}transactions`, {
      toAddress,
      fromAddress,
      amount
    })
      .then(() => {
        this.fetchBalance();
      })
      .catch(err => console.log(err));
    // Clear toAddress and fromAddress
  }

  returnToLogin() {
    this.props.history.goBack();
  }

  fetchBalance() {
    const { fromAddress } = this.props.match.params;
    axios.get(`${api.jobcoin}addresses/${fromAddress}`)
      .then(response => {
        const { balance, transactions } = response.data;
        const balanceHistory = convertTransactionData(transactions, balance, fromAddress);
        this.props.addDashboardInfo({ fromAddress, transactions, balance, balanceHistory });
      })
      .catch(err => console.log(err));
  }

  componentWillMount() {
    this.fetchBalance();
  }

  //  Fetch balance to check for updates
  // componentDidMount() {
  //   setInterval(() => this.fetchBalance(), 5000);
  // }

  render() {
    const { balance, balanceHistory } = this.props;
    return (
      <div>
        <Navbar returnToLogin={this.returnToLogin.bind(this)} />
        <div id="dashboard">
          <div id="sidebar">
            <Balance balance={balance} />
            <SendForm handleTransaction={this.handleTransaction.bind(this)} />
          </div>
          <Graph balanceHistory={balanceHistory} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ form, dashboard: { fromAddress, balance, transactions, balanceHistory } }) => {
  return { form, fromAddress, balance, transactions, balanceHistory };
};

export default withRouter(connect(mapStateToProps, { addDashboardInfo })(Dashboard));
