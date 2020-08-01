import React from 'react';
import { Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Route from './route';
import Login from '../pages/Login';
import RegisterBusiness from '../pages/RegisterBusiness';
import Home from '../pages/Home';

const Routes: React.FC = () => (
  <Switch>
    <Route component={Home} path="/" exact />
    <Route component={RegisterBusiness} path="/register" exact />
    <Route component={Login} path="/login" exact />
    <Route component={Dashboard} path="/dashboard" isPrivate exact />
  </Switch>
);

export default Routes;
