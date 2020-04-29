import './App.scss';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from '../features/404/NotFound';
import { Bulletins } from '../features/bulletins/Bulletins/Bulletins';
import { Host } from '../features/bulletins/BulletinCreation/BulletinCreation';
import { JoinBulletin } from '../features/bulletins/JoinBulletin/JoinBulletin';
import { BulletinDetails } from '../features/bulletins/BulletinDetails/BulletinDetails';
import { NavigationItems } from '../features/navigation/NavigationItems/NavigationItems';
import { Container } from 'reactstrap';

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
    <>
      <NavigationItems />
      <div className="app">
        <Container className="py-5">{routes}</Container>
      </div>
    </>
  );
}

export default App;
