import React, { createContext, useState } from 'react';

export const ModalContext = createContext({});

export const ModalContextProvider = ({ children }) => {
  const [modal, setModal] = useState({ modalId: null, content: String() });
  return <ModalContext.Provider value={{ modal, setModal }}>{children}</ModalContext.Provider>;
};
