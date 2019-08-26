import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { AccessButton } from '..';

const NavBar = _ => (
  <header>
    <span className="icn-logo">
      <i className="material-icons">code</i>
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
      <li>
        <AccessButton />
      </li>
    </ul>
  </header>
);
export default withRouter(NavBar);
