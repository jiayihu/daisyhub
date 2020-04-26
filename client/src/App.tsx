import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from './components/404/NotFound';
import { Homepage } from './components/Homepage/Homepage';
import { Host } from './components/Host/Host';
import { Join } from './components/Join/Join';
import { NavigationItems } from './components/NavigationItems/NavigationItems';

function App() {
  const routes = (
    <Switch>
      <Route path="/host">
        <Host />
      </Route>
      <Route path="/join">
        <Join />
      </Route>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );

  return (
    <div>
      <NavigationItems />
      {routes}
    </div>
  );
}

export default App;
