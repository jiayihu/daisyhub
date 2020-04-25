import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Islands } from './features/islands/Islands';
import { NotFound } from './features/404/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Islands />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
