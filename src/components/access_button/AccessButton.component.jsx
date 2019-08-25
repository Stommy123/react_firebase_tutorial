import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { auth } from '../../firebase';
import { isLoggedIn } from '../../helpers';

const AccessButton = _ => {
  const handleLogout = async _ => {
    await auth.signOut();
    sessionStorage.removeItem('Auth');
  };
  return isLoggedIn() ? (
    <Link to="/" onClick={handleLogout}>
      Logout
    </Link>
  ) : (
    <>
      <NavLink className="btn btn-info pull-md-right" to="/login">
        Login
      </NavLink>
      <NavLink to="/register">Sign Up</NavLink>
    </>
  );
};

export default withRouter(AccessButton);
