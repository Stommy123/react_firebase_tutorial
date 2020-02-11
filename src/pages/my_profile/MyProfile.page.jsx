import React, { useContext } from 'react';
import { GlobalContext } from '../../context';
import { SectionWrapper, ProfileContent, Loader } from '../../components';

export default _ => {
  const { globalState = {} } = useContext(GlobalContext);
  const { currentUserProfile } = globalState;
  
  return (
    <SectionWrapper>{currentUserProfile ? <ProfileContent {...currentUserProfile} /> : <Loader />}</SectionWrapper>
  );
};
