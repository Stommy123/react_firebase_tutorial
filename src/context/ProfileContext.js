import React, { createContext, useState, useEffect, useCallback } from 'react';
import { database } from '../firebase';
import { getCurrentUser } from '../helpers';

export const ProfileContext = createContext({});

export const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const authenticateUser = async _ => {
    const { user = {}, token } = (await getCurrentUser()) || {};
    if (!user.uid) return;
    sessionStorage.setItem('Auth', `Bearer ${token}`);
    database.ref('/profiles').once('value', snapshot => {
      const profiles = snapshot.val() || {};
      const currentUserProfile = Object.values(profiles).find(({ uid }) => uid === user.uid) || {};
      setProfile({ ...profile, ...currentUserProfile });
    });
  };
  const mountEffect = useCallback(authenticateUser, []);
  useEffect(
    _ => {
      mountEffect();
    },
    [mountEffect]
  );
  return <ProfileContext.Provider value={[profile, setProfile, authenticateUser]}>{children}</ProfileContext.Provider>;
};
