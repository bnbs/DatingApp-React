import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import Register from '../User/Register/Register';

import './Home.css';

class Home extends Component {

    state = {
        registerMode: false
    };
    
    cancelRegisterMode() {
        this.setState({registerMode: false});
    }

    registerToggle() {
        this.setState({registerMode: true});
    }
    
    render() {

        let registerMessage = null;
        if(!this.props.isAuthenticated && !this.state.registerMode) {        
            registerMessage = (<div className="Register_text">
                                    <div className="TextAlign">
                                        <h1 className="Text">Find your match</h1>
                                        <h4 className="Text">Come on in to view your matches... All you need to do is sign up!</h4>
                                        <Button bsStyle="danger" bsSize="large" onClick={this.registerToggle.bind(this)}>Register</Button>
                                    </div>                                    
                                </div>);
        }

        let register = null;
        if(this.state.registerMode) {
            register = <Register canceled={this.cancelRegisterMode.bind(this)}/>
        }

        return(
            <div className="Background">
                {registerMessage}
                {register}
            </div>
        );
    }    
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Home);