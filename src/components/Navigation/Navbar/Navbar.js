import React from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';

import Logo from '../../Logo/Logo';
import Login from '../../../containers/Auth/Auth';
import UserPhoto from '../../UserPhoto/UserPhoto';
import NavbarItems from '../NavbarItems/NavbarItems';
import NavDropdown from '../NavDropdown/NavDropdown';

import './Navbar.css';

const navbar = (props) => {

    console.log(props);
    let navContent = <Login/>;
    if(props.isAuth){
        navContent = (
            <div>
                <NavbarItems/>                
                <NavDropdown/>
                <UserPhoto userPhoto={props.userPhoto}/>
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