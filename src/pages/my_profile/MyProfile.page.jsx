import React, { useContext } from 'react';
import { ProfileContext } from '../../context';
import { SectionWrapper, ProfileContent } from '../../components';

export default _ => {
  const { profile } = useContext(ProfileContext);
  return (
    <SectionWrapper>
      <ProfileContent {...profile} />
    </SectionWrapper>
  );
};
