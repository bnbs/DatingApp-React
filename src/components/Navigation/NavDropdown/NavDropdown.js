import React from 'react';

import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import './NavDropdown.css';

library.add(faUser);
library.add(faSignOutAlt);

const navDropdown = (props) => {

    let message = 'Welcome ' + props.userKnownAs;
    return (
        <Nav pullRight>            
            <NavDropdown eventKey={4} title={message} id="basic-nav-dropdown">
                <MenuItem eventKey={4.1}><FontAwesomeIcon icon="user"/>Edit Profile</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={4.2} href="/logout"><FontAwesomeIcon icon="sign-out-alt"/>Logout</MenuItem>
            </NavDropdown>     
        </Nav>
    );
}
  
export default navDropdown;