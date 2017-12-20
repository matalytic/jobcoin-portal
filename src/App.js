import React, { Component } from 'react';
// import logo from './logo.svg';
import { utcParse } from 'd3';
// import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: false,
      fromAddress: 'Jim',
      toAddress: '',
      amount: '',
      balance: '0',
      transactions: [],
      balanceHistory: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleTransaction = this.handleTransaction.bind(this);
    this.fetchBalance = this.fetchBalance.bind(this);
    this.convertTransactionData = this.convertTransactionData.bind(this);
    this.refreshBalance = this.refreshBalance.bind(this);
    this.updateBalanceAndTransactions = this.updateBalanceAndTransactions.bind(this);
  }

  componentWillMount() {
    this.fetchBalance();
  }

  componentDidMount() {
    setInterval(()=> {
      this.refreshBalance();
    }, 5000);
  }

  handleInputChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    console.log(name);
    this.setState({
      [name]: value
    });
  }

  // Retrieve balance
  // Shape to transaction response
  // {
  //     "balance": "20.25",
  //     "transactions": [
  //     {
  //     "timestamp": "2014-04-22T13:10:01.210Z",
  //     "toAddress": "BobsAddress",
  //     "amount": "50.35"
  // },
  //     {
  //     "timestamp": "2014-04-23T18:25:43.511Z",
  //     "fromAddress": "BobsAddress",
  //     "toAddress": "AlicesAddress",
  //     "amount": "30.1"
  // }
  //     ]
  // }

  convertTransactionData(transactions) {
    const {fromAddress, balance} = this.state;
    let parseUTCDate = utcParse('%Y-%m-%dT%H:%M:%S.%f%Z');
    let getDate = function(d) {
      return parseUTCDate(d);
    };
    let balanceHistory = transactions.reduceRight((prev, curr) => {
      let modifier = curr.fromAddress === fromAddress ? 1 : -1;
      return [{ x: getDate(curr.timestamp), y: prev[0].y + (modifier * parseFloat(curr.amount)) }, ...prev];
    }, [{x: Date.now(), y: parseFloat(balance)}]);
    console.log(balanceHistory);
    this.setState({balanceHistory});
  }

  updateBalanceAndTransactions() {

  }

  refreshBalance() {
    const {fromAddress} = this.state;
    axios.get(`http://jobcoin.gemini.com/rage/api/addresses/${fromAddress}`)
      .then(response => {
        const {balance, transactions} = response.data;
        const previousTransactions = this.state.transactions;
        if (previousTransactions.length !== transactions.length) {
          const itemsToAdd = previousTransactions.length - transactions.length;
          this.setState((prevState) => {
            return {
              balance,
              transactions: prevState.transactions.concat(transactions.slice(-itemsToAdd))
            };
          });
        }
        this.convertTransactionData(transactions);
      })
      .catch(err => console.log(err));
  }
  
  fetchBalance() {
    const {fromAddress} = this.state;
    axios.get(`http://jobcoin.gemini.com/rage/api/addresses/${fromAddress}`)
      .then(response => {
        const {balance, transactions} = response.data;
        console.log(response);
        console.log(balance, transactions);
        this.setState({balance, transactions});
        this.convertTransactionData(transactions);
      })
      .catch(err => console.log(err));
  }

  handleLogin(event) {
    event.preventDefault();
    this.setState({
      loginStatus: true
    });
    console.log('Logged in');
  }

  handleTransaction(event) {
    // Send transaction via axios
    const {toAddress, fromAddress, amount} = this.state;
    console.log('transaction sent', toAddress, fromAddress, amount);
    axios.post('https://jobcoin.gemini.com/rage/api/transactions', {
      toAddress,
      fromAddress,
      amount
    })
      .catch(err => console.log(err));
    // Clear toAddress and fromAddress
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Jobcoin, {this.state.fromAddress}</h1>
        </header>
        <LoginForm 
          handleInputChange={this.handleInputChange}
          handleLogin={this.handleLogin} />
        <SendForm 
          handleInputChange={this.handleInputChange}
          handleTransaction={this.handleTransaction} />
        <Balance 
          handleInputChange={this.handleInputChange}
          balance={this.state.balance} />
        <GraphView
          data={this.state.balanceHistory} />
      </div>
    );
  }
}

const LoginForm = props => {
  return (
    <div>
      <h1> Welcome! Sign In With Your Jobcoin Address</h1>
      <p> Jobcoin Address </p>
      <input 
        type="text" 
        id="fromAddress" 
        name="fromAddress" 
        placeholder="User Address"
        onChange={props.handleInputChange} />
      <button 
        type="submit" 
        className="ui secondary button"
        onClick={props.handleLogin}>Sign In</button>
    </div>
  );
};

const SendForm = props => {
  return (
    <div>
      <h3>Send Jobcoin</h3>
      <p>Destination Address</p>
      <input 
        type="text" 
        id="toAddress" 
        name="toAddress" 
        placeholder="Recipient Address"
        onChange={props.handleInputChange} />
      <p>Amount to Send</p>
      <input  
        type="text" 
        id="amount" 
        name="amount" 
        placeholder="Amount"
        onChange={props.handleInputChange} />
      <button 
        type="submit" 
        className="ui secondary button"
        onClick={props.handleTransaction}>Send Coins</button>
    </div>
  );
};

const Balance = props => {
  return(
    <div>
      <h3>Jobcoin Balance</h3>
      <h3>{props.balance}</h3>
    </div>
  );
};

// export default App;

export default function App({ children }) {
  return (
    <div id="app">
      {children}
    </div>
  );
}

