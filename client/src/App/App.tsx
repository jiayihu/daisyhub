import './App.scss';
import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { NotFound } from '../features/404/NotFound';
import { Bulletins } from '../features/bulletins/Bulletins/Bulletins';
import { BulletinForm } from '../features/bulletins/host/BulletinForm/BulletinForm';
import { JoinBulletin } from '../features/bulletins/JoinBulletin/JoinBulletin';
import { NavigationItems } from '../features/navigation/NavigationItems/NavigationItems';
import { Container } from 'reactstrap';
import { Notifications } from '../features/notifications/Notifications/Notifications';
import { ProtectedBulletin } from '../features/bulletins/ProtectedBulletin/ProtectedBulletin';
import { Footer } from '../features/navigation/Footer/Footer';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { OfflineNotification } from '../features/pwa/OfflineNotification/OfflineNotification';
import { AddToHomeScreen } from '../features/pwa/AddToHomeScreen/AddToHomeScreen';

function App() {
  const location = useLocation();

  return (
    <>
      <NavigationItems />
      <AddToHomeScreen />
      <div className="app">
        <Container className="app-container">
          <OfflineNotification />
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={300}>
              <div className="page">
                <Switch location={location}>
                  <Route exact path="/host" component={BulletinForm} />
                  <Route exact path="/join" component={JoinBulletin} />
                  <Route exact path="/bulletins/:bulletinId" component={ProtectedBulletin} />
                  <Route exact path="/" component={Bulletins} />
                  <Route path="*" component={NotFound} />
                </Switch>
                <Footer />
              </div>
            </CSSTransition>
          </TransitionGroup>
        </Container>
      </div>
      <Notifications />
    </>
  );
}

export default App;
