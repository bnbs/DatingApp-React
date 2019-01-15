import React from 'react';

import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

const navbarItems = (props) => {

    return (
        <Nav>
            <NavItem eventKey={1} href="#">
                Matches
            </NavItem>
            <NavItem eventKey={2} href="#">
                Lists
            </NavItem>
            <NavItem eventKey={3} href="#">
                Messages
            </NavItem>
        </Nav>
    );
}
  
export default navbarItems;