import './App.scss';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from '../features/404/NotFound';
import { Bulletins } from '../features/bulletins/Bulletins/Bulletins';
import { BulletinCreation } from '../features/bulletins/BulletinCreation/BulletinCreation';
import { JoinBulletin } from '../features/bulletins/JoinBulletin/JoinBulletin';
import { NavigationItems } from '../features/navigation/NavigationItems/NavigationItems';
import { Container } from 'reactstrap';
import { Notifications } from '../features/notifications/Notifications/Notifications';
import { ProtectedBulletin } from '../features/bulletins/ProtectedBulletin/ProtectedBulletin';
import { Footer } from '../features/navigation/Footer/Footer';

function App() {
  const routes = (
    <Switch>
      <Route exact path="/host" component={BulletinCreation} />
      <Route exact path="/join" component={JoinBulletin} />
      <Route exact path="/bulletins/:bulletinId" component={ProtectedBulletin} />
      <Route exact path="/" component={Bulletins} />
      <Route path="*" component={NotFound} />
    </Switch>
  );

  return (
    <>
      <NavigationItems />
      <div className="app">
        <Container className="app-container">
          <div>{routes}</div>
          <Footer />
        </Container>
      </div>
      <Notifications />
    </>
  );
}

export default App;
