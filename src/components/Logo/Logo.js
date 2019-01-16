import React from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import './Logo.css';

library.add(faHeart);

const logo = () => (
    <Navbar.Brand>
        <LinkContainer to="/">
            <a href="/"><FontAwesomeIcon icon="heart"/>Dating App</a>
        </LinkContainer>        
    </Navbar.Brand>
);

export default logo;