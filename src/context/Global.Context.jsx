import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { auth, database } from '../firebase';
import { getCurrentUser } from '../helpers';

export const GlobalContext = createContext({});

const INITIAL_STATE = {
  currentUser: {},
  currentUserProfile: {},
  selectedProfile: {},
}

export const GlobalContextProvider = ({ children }) => {
  const globalContextReducer = (state, payload) => ({ ...state, ...payload });
  const [globalState, setGlobalState] = useReducer(globalContextReducer, INITIAL_STATE);
  const authenticateUser = async _ => {
    const { user: currentUser = {}, token } = (await getCurrentUser()) || {};
    if (!currentUser.uid) return;
    sessionStorage.setItem('Auth', `Bearer ${token}`);
    database
      .ref('/profiles')
      .orderByChild('uid')
      .equalTo(currentUser.uid)
      .once('value', snapshot => {
        const profile = snapshot.val() || {};
        const currentUserProfile = Object.values(profile)[0] || {};
        setGlobalState({ currentUser, currentUserProfile });
      });
  };
  const unauthenticateUser = async _ => {
    await auth.signOut();
    sessionStorage.removeItem('Auth');
    setGlobalState({ currentUser: {}, currentUserProfile: {}, selectedProfile: {} });
  }
  const mountEffect = useCallback(authenticateUser, []);
  useEffect(
    _ => {
      mountEffect();
    },
    [mountEffect]
  );
  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState, authenticateUser, unauthenticateUser }}>{children}</GlobalContext.Provider>
  );
};
