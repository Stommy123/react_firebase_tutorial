import React, { useContext, useState } from 'react';
import { database, auth } from '../../firebase';
import { Form, SectionWrapper, Loader } from '../../components';
import { schema } from './Register.schema';
import { ModalContext } from '../../context';
import { getProfilePicture } from '../../helpers';

export default ({ history }) => {
  const { setModal } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const handleRegister = async formData => {
    setLoading(true);
    const { email, password, tagline, displayName, occupation, passwordConfirmation } = formData;
    if (password !== passwordConfirmation) return setModal({ isOpen: true, content: 'Passwords did not match' });
    try {
      const { user: newUser = {} } = await auth.createUserWithEmailAndPassword(email, password);
      if (!newUser) return;
      const { uid } = newUser;
      const photoURL = getProfilePicture();
      const newProfileRef = database.ref(`/profiles/${uid}`);
      newProfileRef.set({ email, displayName, tagline, id: uid, occupation, photoURL });
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
