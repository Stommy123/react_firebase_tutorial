import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase';
import { SectionWrapper, Form, Modal } from '../../components';
import { schema } from './Login.schema';
import { ModalContext, ProfileContext } from '../../context';

const Login = ({ history }) => {
  const { setProfile, authenticateUser } = useContext(ProfileContext);
  const { setModal } = useContext(ModalContext);
  const handleLogin = async ({ email, password }) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      if (!user) return;
      await authenticateUser();
      history.push('/my-profile');
    } catch (e) {
      console.log('error logging in', e);
      setModal({ id: 'loginModal', content: 'Could not login with these credentials, please try again' });
      setProfile({});
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
