import React from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';

import Logo from '../../Logo/Logo';
import NavbarItems from '../NavbarItems/NavbarItems';
import NavDropdown from '../NavDropdown/NavDropdown';

import './Navbar.css';

const navbar = (props) => {

    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Logo/>
                <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
                <NavbarItems/>
                <NavDropdown/>
            </Navbar.Collapse>
        </Navbar>
    );
}
  
export default navbar;