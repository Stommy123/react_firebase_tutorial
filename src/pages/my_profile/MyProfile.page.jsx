import React, { useContext } from 'react';
import { GlobalContext } from '../../context';
import { SectionWrapper, ProfileContent } from '../../components';

export default _ => {
  const { globalState = {} } = useContext(GlobalContext);
  return (
    <SectionWrapper>
      <ProfileContent {...globalState.currentUserProfile} />
    </SectionWrapper>
  );
};
