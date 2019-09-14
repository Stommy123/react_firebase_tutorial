import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { AccessButton } from '..';
import FIREBASE_LOGO from '../../assets/images/firebase.png';

const NavBar = _ => (
  <header>
    <span className="icn-logo">
      <img src={FIREBASE_LOGO} alt="logo" />
    </span>
    <ul className="main-nav">
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/profiles">Everyone</NavLink>
      </li>
      <li>
        <NavLink to="/my-profile">My Profile</NavLink>
      </li>
      <AccessButton />
    </ul>
  </header>
);
export default withRouter(NavBar);
