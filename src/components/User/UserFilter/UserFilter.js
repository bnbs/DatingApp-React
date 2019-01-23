import React from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';

import './UserFilter.css';

const userFilter = (props) => {

    return (
        <Form inline className="d-flex">
            <div>
                <FormGroup className="margin form-control-flex">
                    <ControlLabel className="margin">Age</ControlLabel>
                    <FormControl type="number" className="input-size margin" value={props.controls.minAge} onChange={props.changed} id="minAge"/>-
                    <FormControl type="number" className="input-size margin" value={props.controls.maxAge} onChange={props.changed} id="maxAge"/>
                </FormGroup>
                <FormGroup className="margin form-control-flex">
                    <ControlLabel className="margin">Show</ControlLabel>
                    <FormControl componentClass="select" placeholder="select" className="margin" id="gender" value={props.controls.gender} onChange={props.changed}>
                        <option value="male">Males</option>
                        <option value="female">Females</option>
                    </FormControl>
                </FormGroup>
            </div>            
            <ButtonGroup>
                <Button bsStyle="danger" onClick={props.applyFilterClicked}>Apply Filters</Button>
                <Button bsStyle="primary" onClick={props.resetFilterClicked}>Reset Filter</Button>
            </ButtonGroup>
        </Form>
    );
}

export default userFilter;