import React from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import './Logo.css';

library.add(faHeart);

const logo = () => (
    <Navbar.Brand>
        <a href="#home"><FontAwesomeIcon icon="heart"/>Dating App</a>
    </Navbar.Brand>
);

export default logo;