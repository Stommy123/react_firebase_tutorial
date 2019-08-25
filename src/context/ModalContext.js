import React, { createContext, useState } from 'react';

export const ModalContext = createContext({});

export const ModalContextProvider = ({ children }) => {
  const modalState = useState({ modalId: null, content: String() });
  return <ModalContext.Provider value={modalState}>{children}</ModalContext.Provider>;
};
