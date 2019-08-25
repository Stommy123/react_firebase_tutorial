import React, { useContext } from 'react';
import { UserContext } from '../../context';
import { SectionWrapper, ProfileContent } from '../../components';

const MyProfile = _ => {
  const [{ profile }] = useContext(UserContext);
  return (
    <SectionWrapper>
      <ProfileContent {...profile} />
    </SectionWrapper>
  );
};

export default MyProfile;
