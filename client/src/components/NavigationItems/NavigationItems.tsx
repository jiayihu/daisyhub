import React from 'react';
import { NavigationItem } from './NavigationItem/NavigationItem';
import { Navbar, Nav } from 'reactstrap';

export const NavigationItems: React.FC = (props) => (
  <Navbar color="light" light expand="md">
    <Nav className="mr-auto" navbar>
      <NavigationItem link="/host">Host</NavigationItem>
      <NavigationItem link="/join">Join</NavigationItem>
      <NavigationItem link="/">Islands</NavigationItem>
    </Nav>
  </Navbar>
);
