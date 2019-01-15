import React from 'react';

import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import './NavDropdown.css';

const navDropdown = (props) => {

    return (
        <Nav pullRight>
            <NavDropdown eventKey={4} title="Welcome Fulano" id="basic-nav-dropdown">
                <MenuItem eventKey={4.1}>Action</MenuItem>
                <MenuItem eventKey={4.2}>Another action</MenuItem>
                <MenuItem eventKey={4.3}>Something else here</MenuItem>
            </NavDropdown>
        </Nav>
    );
}
  
export default navDropdown;