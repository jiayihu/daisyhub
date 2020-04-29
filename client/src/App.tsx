import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from './features/404/NotFound';
import { Bulletins } from './features/bulletins/Bulletins/Bulletins';
import { Host } from './components/BulletinCreation/BulletinCreation';
import { JoinBulletin } from './features/bulletins/JoinBulletin/JoinBulletin';
import { BulletinDetails } from './features/bulletins/BulletinDetails/BulletinDetails';
import { NavigationItems } from './features/navigation/NavigationItems/NavigationItems';

function App() {
  const routes = (
    <Switch>
      <Route exact path="/host" component={Host} />
      <Route exact path="/join" component={JoinBulletin} />
      <Route exact path="/bulletins/:id" component={BulletinDetails} />
      <Route exact path="/" component={Bulletins} />
      <Route path="*" component={NotFound} />
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
