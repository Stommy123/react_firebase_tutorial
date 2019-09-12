import React, { useContext } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { GlobalContext } from '../../context';
import { isLoggedIn } from '../../helpers';

const AccessButton = _ => {
  const { unauthenticateUser } = useContext(GlobalContext);
  return isLoggedIn() ? (
    <Link to="/" onClick={unauthenticateUser}>
      Logout
    </Link>
  ) : (
    <>
      <li>
        <NavLink className="btn btn-info pull-md-right" to="/login">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/register">Sign Up</NavLink>
      </li>
    </>
  );
};

export default withRouter(AccessButton);
