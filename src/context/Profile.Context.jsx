import React, { createContext, useState, useEffect, useCallback } from 'react';
import { database } from '../firebase';
import { getCurrentUser } from '../helpers';

export const ProfileContext = createContext({});

export const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const authenticateUser = async _ => {
    const { user: { uid } = {}, token } = (await getCurrentUser()) || {};
    if (!uid) return;
    sessionStorage.setItem('Auth', `Bearer ${token}`);
    database
      .ref('/profiles')
      .orderByChild('uid')
      .equalTo(uid)
      .once('value', snapshot => {
        const profile = snapshot.val() || {};
        const currentUserProfile = Object.values(profile)[0] || {};
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
  return (
    <ProfileContext.Provider value={{ profile, setProfile, authenticateUser }}>{children}</ProfileContext.Provider>
  );
};
