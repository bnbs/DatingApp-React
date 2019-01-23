import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    error: null,
    users: null,
    pagination: null
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

const getUsersSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        users: action.paginatedResult.users,
        pagination: action.paginatedResult.pagination
    });
};

const getUsersFail = (state, action) => {
    return updateObject( state, {
        error: action.error
    });
};

const sendLikeSuccess = (state, action) => {
    return updateObject( state, {
        error: null
    });
};

const sendLikeFail = (state, action) => {
    return updateObject( state, {
        error: action.error
    });
};

const userReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return userRegisterStart(state, action);
        case actionTypes.AUTH_SUCCESS: return userRegisterSuccess(state, action);
        case actionTypes.AUTH_FAIL: return userRegisterFail(state, action);
        case actionTypes.GET_USERS_SUCCESS: return getUsersSuccess(state, action);
        case actionTypes.GET_USERS_FAIL: return getUsersFail(state, action);
        case actionTypes.SEND_LIKE_SUCCESS: return sendLikeSuccess(state, action);
        case actionTypes.SEND_LIKE_FAIL: return sendLikeFail(state, action);
        default:
            return state;
    }
};

export default userReducer;