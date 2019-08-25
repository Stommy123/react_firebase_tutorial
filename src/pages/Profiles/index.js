import React, { useState, useEffect, useCallback, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { ProfileContext } from '../../context';
import { database } from '../../firebase';
import { SectionWrapper, Profile } from '../../components';

const Profiles = ({ history }) => {
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useContext(ProfileContext);
  const [selectedProfile, setSelectedProfile] = useState({});
  const subscribeToProfiles = _ => {
    database.ref('/profiles').on('value', snapshot => {
      const profiles = snapshot.val() || {};
      setProfiles(Object.values(profiles));
    });
  };
  const handleProfileClick = profile => _ => setSelectedProfile(profile);
  const handleViewProfile = _ => {
    setProfile({ ...profile, selectedProfile });
    history.push(`/selected-profile/${selectedProfile.uid}`);
  };
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
            profile={profile}
            handleProfileClick={handleProfileClick}
            selectedProfile={selectedProfile}
            handleViewProfile={handleViewProfile}
          />
        ))}
      </ul>
    </SectionWrapper>
  );
};

export default withRouter(Profiles);
