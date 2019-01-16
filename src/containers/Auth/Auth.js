import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from 'react-bootstrap/lib/Navbar';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

import './Auth.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {

    state = {
        controls: {
            username: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            password: {
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }
        }
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
                touched: true
            })
        });
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        console.log(this.state.controls);
        this.props.onAuth( this.state.controls.username.value, this.state.controls.password.value );
    }

    render() {

        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <FormGroup key={formElement.id}>
                <FormControl
                    key={formElement.id}
                    type={formElement.config.elementConfig.type}
                    placeholder={formElement.config.elementConfig.placeholder}
                    value={formElement.config.value}
                    onChange={( event ) => this.inputChangedHandler( event, formElement.id )} />
            </FormGroup>
        ) );

        return (
            <Navbar.Form pullRight>
                {form}
                <Button type="submit" bsStyle="success" onClick={this.submitHandler}>Login</Button>
            </Navbar.Form>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( username, password ) => dispatch( actions.auth( username, password ) ),
    };
};

export default connect(null, mapDispatchToProps)(Auth);