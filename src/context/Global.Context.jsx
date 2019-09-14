import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { auth, database } from '../firebase';
import { getCurrentUser } from '../helpers';

export const GlobalContext = createContext({});

const INITIAL_STATE = { currentUser: null, currentUserProfile: null };

export const GlobalContextProvider = ({ children }) => {
  const globalContextReducer = (state, payload) => ({ ...state, ...payload });
  const [globalState, setGlobalState] = useReducer(globalContextReducer, INITIAL_STATE);
  const createSession = async _ => {
    const { currentUser = {}, token } = (await getCurrentUser()) || {};
    if (!currentUser.uid) return;
    sessionStorage.setItem('Auth', token);
    database
      .ref('/profiles')
      .orderByChild('uid')
      .equalTo(currentUser.uid)
      .once('value', snapshot => {
        const profile = snapshot.val();
        const currentUserProfile = Object.values(profile)[0] || {};
        setGlobalState({ currentUser, currentUserProfile });
      });
  };
  const clearSession = async _ => {
    await auth.signOut();
    sessionStorage.removeItem('Auth');
    setGlobalState({ currentUser: null, currentUserProfile: null });
  };
  const mountEffect = useCallback(createSession, []);
  useEffect(
    _ => {
      mountEffect();
      window.addEventListener('beforeunload', clearSession);
      return _ => window.removeEventListener('beforeunload');
    },
    [mountEffect]
  );
  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState, createSession, clearSession }}>
      {children}
    </GlobalContext.Provider>
  );
};
