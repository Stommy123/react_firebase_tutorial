import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../../helpers';

export default ({ exact, path, component: Component, ...otherProps }) => (
  <Route exact={exact} path={path} render={_ => (isLoggedIn() ? <Component {...otherProps} /> : <Redirect to="/error" />)} />
);
