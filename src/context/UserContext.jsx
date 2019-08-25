import React, { createContext, useState, useEffect, useCallback } from 'react';
import { database } from '../firebase';
import { getCurrentUser } from '../helpers';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const getUser = async _ => {
    const { user = {} } = (await getCurrentUser()) || {};
    database.ref('/profiles').once('value', snapshot => {
      const profiles = snapshot.val() || {};
      const currentUserProfile = Object.values(profiles).find(({ uid }) => uid === user.uid) || {};
      setUser({ ...user, profile: currentUserProfile });
    });
  };
  const mountEffect = useCallback(getUser, []);
  useEffect(
    _ => {
      mountEffect();
    },
    [mountEffect]
  );
  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};
