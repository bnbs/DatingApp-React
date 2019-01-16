import React from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';

import Logo from '../../Logo/Logo';
import Login from '../../../containers/Auth/Auth';
import NavbarItems from '../NavbarItems/NavbarItems';
import NavDropdown from '../NavDropdown/NavDropdown';

import './Navbar.css';

const navbar = (props) => {

    let navContent = <Login/>;
    if(props.isAuth){
        navContent = (
            <div>
                <NavbarItems/>
                <NavDropdown/>
            </div>            
        );
    }

    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Logo/>
                <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
                {navContent}
            </Navbar.Collapse>
        </Navbar>
    );
}
  
export default navbar;