import React, { useContext } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { ProfileContext } from '../../context';
import { auth } from '../../firebase';
import { isLoggedIn } from '../../helpers';

const AccessButton = _ => {
  const { setProfile } = useContext(ProfileContext);
  const handleLogout = async _ => {
    await auth.signOut();
    sessionStorage.removeItem('Auth');
    setProfile({});
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
