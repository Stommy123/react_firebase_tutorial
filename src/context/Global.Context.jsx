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
    const { uid } = currentUser;
    if (!uid) return;
    sessionStorage.setItem('Auth', token);
    database.ref(`/profiles/${uid}`).once('value', snapshot => {
      const currentUserProfile = snapshot.val() || {};
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
    },
    [mountEffect]
  );
  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState, createSession, clearSession }}>
      {children}
    </GlobalContext.Provider>
  );
};
