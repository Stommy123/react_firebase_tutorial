import React from 'react';
import { Route } from 'react-router-dom';
import { Home, Login, MyProfile, Register, Error, Profiles, SelectedProfile } from '../pages';
import { NavBar, AuthRoute } from '../components';

const Content = _ => (
  <div className="container">
    <NavBar />
    <Route exact path="/" component={Home} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/error" component={Error} />
    <AuthRoute exact path="/my-profile" component={MyProfile} />
    <AuthRoute exact path="/profiles" component={Profiles} />
    <AuthRoute exact path="/selected-profile/:profileId" component={SelectedProfile} />
  </div>
);

export default Content;
