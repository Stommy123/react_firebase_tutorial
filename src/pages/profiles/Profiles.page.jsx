import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { database } from '../../firebase';
import { SectionWrapper, Profile } from '../../components';

const Profiles = ({ history }) => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState(String());
  const subscribeToProfiles = _ => {
    database.ref('/profiles').on('value', snapshot => {
      const profiles = snapshot.val() || {};
      setProfiles(Object.values(profiles));
    });
  };
  const handleProfileClick = id => _ => setSelectedProfileId(id);
  const handleViewProfile = _ => history.push(`/selected-profile/${selectedProfileId}`);
  const mountEffect = useCallback(subscribeToProfiles, []);
  useEffect(
    _ => {
      mountEffect();
    },
    [mountEffect]
  );
  return (
    <SectionWrapper>
      <h2>Select a profile to view</h2>
      <ul>
        {profiles.map(profile => (
          <Profile
            key={profile.id}
            {...profile}
            handleProfileClick={handleProfileClick}
            selectedProfileId={selectedProfileId}
            handleViewProfile={handleViewProfile}
          />
        ))}
      </ul>
    </SectionWrapper>
  );
};

export default withRouter(Profiles);
