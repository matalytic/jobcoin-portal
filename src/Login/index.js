import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { addFromAddress } from './actions';
import icon from '../icon.png';
import './styles.less';

class Login extends Component {
  handleLogin(event) {
    event.preventDefault();
    const { fromAddress } = this.props.form.login.values;
    this.props.addFromAddress(fromAddress);
    this.props.history.push(`dashboard/${fromAddress}`);
  }
  render() {
    return (
      <div id="login">
        <img src={icon} alt="logo" />
        <LoginForm handleSubmit={this.handleLogin.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = ({transactions, form}) => ({transactions, form});

export default withRouter(connect(mapStateToProps, { addFromAddress })(Login));
