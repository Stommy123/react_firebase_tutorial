import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider, ModalContextProvider } from '../context';
import Content from '../content';

const App = _ => (
  <UserContextProvider>
    <ModalContextProvider>
      <Router>
        <Content />
      </Router>
    </ModalContextProvider>
  </UserContextProvider>
);

export default App;
