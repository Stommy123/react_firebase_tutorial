import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { database, auth } from '../../firebase';
import { Form, SectionWrapper, Loader } from '../../components';
import { schema } from './Register.schema';
import { ModalContext } from '../../context';
import { getProfilePicture } from '../../helpers';

const Register = ({ history }) => {
  const { setModal } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const handleRegister = async formData => {
    setLoading(true);
    const { email, password, tagline, displayName, occupation, passwordConfirmation } = formData;
    if (password !== passwordConfirmation) return setModal({ id: 'registerModal', content: 'Passwords did not match' });
    try {
      const { user: newUser = {} } = await auth.createUserWithEmailAndPassword(email, password);
      const photoURL = getProfilePicture();
      newUser.updateProfile({ displayName, photoURL });
      if (!newUser) return;
      const newProfileRef = database.ref('/profiles').push();
      newProfileRef.set({ email, displayName, tagline, id: newProfileRef.key, uid: newUser.uid, occupation, photoURL });
      history.push('/login');
    } catch (e) {
      console.log('There was an error creating your user', e);
      setModal({ isOpen: true, content: 'There was an error creating your profile, please try again' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <SectionWrapper columnDefs="col-md-6 col-md-offset-3">
      {loading ? <Loader loading={loading} /> : <Form schema={schema} handleSubmit={handleRegister} />}
    </SectionWrapper>
  );
};

export default withRouter(Register);
