import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProfileContextProvider, ModalContextProvider } from '../context';
import Content from '../content';

const App = _ => (
  <ProfileContextProvider>
    <ModalContextProvider>
      <Router>
        <Content />
      </Router>
    </ModalContextProvider>
  </ProfileContextProvider>
);

export default App;
