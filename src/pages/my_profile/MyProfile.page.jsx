import React, { useContext } from 'react';
import { ProfileContext } from '../../context';
import { SectionWrapper, ProfileContent } from '../../components';

const MyProfile = _ => {
  const { profile } = useContext(ProfileContext);
  return (
    <SectionWrapper>
      <ProfileContent {...profile} />
    </SectionWrapper>
  );
};

export default MyProfile;
