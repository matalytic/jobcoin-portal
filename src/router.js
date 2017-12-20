import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Navbar from './Dashboard/Navbar';

export default (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/dashboard/:fromAddress" component={Dashboard} />
    </div>
  </BrowserRouter>
);
