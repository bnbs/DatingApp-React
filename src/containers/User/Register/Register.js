import React, { Component } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Radio from 'react-bootstrap/lib/Radio';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Input from '../../../components/UI/Input/Input';

import { updateObject, checkValidity } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';


import './Register.css';

class Register extends Component {

    state = {
        userData: {
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
            knownAs: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Known As'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            dateOfBirth: {
                elementConfig: {
                    type: 'date',
                    placeholder: 'Date Of Birth'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            city: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            country: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
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
            },
            confirmPassword: {
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }
        },
        gender: 'Male'
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject(this.state.userData, {
            [controlName]: updateObject(this.state.userData[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.userData[controlName].validation )
            })
        });
        this.setState( { userData: updatedControls } );
    }

    handleGenderChange = gender => {
        this.setState({
          gender: gender.target.value
        });
    };

    submitHandler = ( event ) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.userData) {
            formData[formElementIdentifier] = this.state.userData[formElementIdentifier].value;
        }

        formData['Gender'] = this.state.gender;
        this.props.onRegister( formData );
    }
    
    render() {

        const formElementsArray = [];
        for ( let key in this.state.userData ) {
            formElementsArray.push( {
                id: key,
                config: this.state.userData[key]
            } );
        }

        let formFields = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        return (
            <Grid>
                <Row>
                    <Col xs={12} md={10} lg={6}>
                        <h2>Sign Up</h2>
                        <hr></hr>
                        <form>
                            <FormGroup>
                                <ControlLabel>I am a</ControlLabel>
                                <Radio name="radioGroup" inline value="Male" checked={this.state.gender === "Male"} onChange={this.handleGenderChange}>Male</Radio>
                                <Radio name="radioGroup" inline value="Female" checked={this.state.gender === "Female"} onChange={this.handleGenderChange}>Female</Radio>
                            </FormGroup>
                            {formFields}
                            <ButtonToolbar>
                                <Button bsStyle="success" onClick={this.submitHandler.bind(this)}>Register</Button>
                                <Button onClick={this.props.canceled}>Cancel</Button>                             
                            </ButtonToolbar>                
                        </form>
                    </Col>
                </Row>
            </Grid>            
        );
    }    
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: ( user ) => dispatch( actions.register( user ) ),
    };
};
  
export default connect(null, mapDispatchToProps)(Register);