import React from 'react';
import { reduxForm, Field } from 'redux-form';

let LoginForm = ({handleSubmit}) => (
  <div id="login-form">
    <h3>Welcome! Sign In With Your Jobcoin Address</h3>
    <form onSubmit={handleSubmit}>
      <p>Jobcoin Address</p>
      <Field 
        name="fromAddress" 
        id="fromAddress" 
        type="text" 
        component="input" 
        />
      <button className="submit-button" type="submit">SIGN IN</button>
    </form>
  </div>
); 

export default reduxForm({form: 'login'})(LoginForm);
