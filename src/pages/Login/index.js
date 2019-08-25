import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { auth, database } from '../../firebase';
import { getCurrentUser } from '../../helpers';
import { SectionWrapper, Form, Modal } from '../../components';
import { schema } from './Login.schema';
import { ModalContext, UserContext } from '../../context';

const Login = ({ history }) => {
  const setUser = useContext(UserContext)[1];
  const setModal = useContext(ModalContext)[1];
  const handleLogin = async ({ email, password }) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      if (!user) return;
      const { token } = await getCurrentUser();
      sessionStorage.setItem('Auth', `Bearer ${token}`);
      setUser(user);
      database.ref('/profiles').once('value', snapshot => {
        const profiles = snapshot.val() || {};
        const currentUserProfile = Object.values(profiles).find(({ uid }) => uid === user.uid) || {};
        setUser({ ...user, profile: currentUserProfile });
        history.push('/my-profile');
      });
    } catch (e) {
      console.log('error logging in', e);
      setModal({ id: 'loginModal', content: 'Could not login with these credentials, please try again' });
      setUser({});
    }
  };
  return (
    <SectionWrapper columnDefs="col-md-6 col-md-offset-3">
      <Form schema={schema} handleSubmit={handleLogin} />
      <Modal id="loginModal" />
    </SectionWrapper>
  );
};

export default withRouter(Login);
