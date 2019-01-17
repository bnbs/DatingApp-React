import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    error: null
};

const userRegisterStart = ( state, action ) => {
    return updateObject( state, { error: null } );
};

const userRegisterSuccess = (state, action) => {
    return updateObject( state, { error: null } );
};

const userRegisterFail = (state, action) => {
    return updateObject( state, {
        error: action.error
    });
};

const userReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return userRegisterStart(state, action);
        case actionTypes.AUTH_SUCCESS: return userRegisterSuccess(state, action);
        case actionTypes.AUTH_FAIL: return userRegisterFail(state, action);
        default:
            return state;
    }
};

export default userReducer;