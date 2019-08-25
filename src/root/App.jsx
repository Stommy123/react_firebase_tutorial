import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from '../content/Content.container';

const App = _ => (
  <Router>
    <Content />
  </Router>
);

export default App;
