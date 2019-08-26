import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase';
import { SectionWrapper, Form, Loader } from '../../components';
import { schema } from './Login.schema';
import { ModalContext, ProfileContext } from '../../context';

const Login = ({ history }) => {
  const { authenticateUser } = useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
  const { setModal } = useContext(ModalContext);
  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      if (!user) return;
      await authenticateUser();
      history.push('/my-profile');
    } catch (e) {
      console.log('error logging in', e);
      setModal({ isOpen: true, content: 'Could not login with these credentials, please try again' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <SectionWrapper columnDefs="col-md-6 col-md-offset-3">
      {loading ? <Loader loading={loading} /> : <Form schema={schema} handleSubmit={handleLogin} />}
    </SectionWrapper>
  );
};

export default withRouter(Login);
