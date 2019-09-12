import React from 'react';
import { Route } from 'react-router-dom';
import { GlobalContextProvider, ModalContextProvider } from '../context';
import { Home, Login, MyProfile, Register, Error as ErrorPage, Profiles, SelectedProfile } from '../pages';
import { NavBar, AuthRoute, Modal } from '../components';

const Content = _ => (
  <div className="container">
    <GlobalContextProvider>
      <NavBar />
      <ModalContextProvider>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Modal />
      </ModalContextProvider>
      <Route exact path="/" component={Home} />
      <Route exact path="/error" component={ErrorPage} />
      <AuthRoute exact path="/my-profile" component={MyProfile} />
      <AuthRoute exact path="/profiles" component={Profiles} />
      <AuthRoute exact path="/selected-profile/:profileId" component={SelectedProfile} />
    </GlobalContextProvider>
  </div>
);

export default Content;
