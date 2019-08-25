import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { database, auth } from '../../firebase';
import { Form, Modal, SectionWrapper } from '../../components';
import { schema } from './Register.schema';
import { ModalContext } from '../../context';
import { getProfilePicture } from '../../helpers';

const Register = ({ history }) => {
  const setModal = useContext(ModalContext)[1];
  const handleRegister = async formData => {
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
      setModal({ id: 'registerModal', content: 'There was an error creating your profile, please try again' });
    }
  };
  return (
    <SectionWrapper columnDefs="col-md-6 col-md-offset-3">
      <Form schema={schema} handleSubmit={handleRegister} />
      <Modal id="registerModal" />
    </SectionWrapper>
  );
};

export default withRouter(Register);
