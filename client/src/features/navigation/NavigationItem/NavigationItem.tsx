import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

export const NavigationItem: React.FC<{ link: string }> = (props) => (
  <NavItem>
    <NavLink exact to={props.link} activeClassName="active" tag={RRNavLink}>
      {props.children}
    </NavLink>
  </NavItem>
);
