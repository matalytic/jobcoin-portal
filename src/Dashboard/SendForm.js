import React from 'react';
import { Field, reduxForm } from 'redux-form';

let SendForm = ({handleTransaction}) => (
  <div id="send-form">
    <h3>Send Jobcoin</h3>
    <form onSubmit={handleTransaction}>
      <p>Destination Address</p>
      <Field 
        name="toAddress" 
        id="toAddress" 
        type="text" 
        component="input" 
        value="" />
      <p>Amount to Send</p>
      <Field 
        name="amount" 
        id="send-amount" 
        type="text" 
        component="input" 
        value="" />
      <button className="submit-button" type="submit">SEND JOBCOINS</button>
    </form>
  </div>
);

SendForm = reduxForm({
  form: 'send'
})(SendForm);

export default SendForm;
