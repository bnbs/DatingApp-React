import axios from 'axios';

import * as actionTypes from './actionTypes';

export const userRegisterStart = () => {
    return {
        type: actionTypes.USER_REGISTER_START
    };
};

export const userRegisterSuccess = (token, user) => {
    return {
        type: actionTypes.USER_REGISTER_SUCCESS
    };
};

export const userRegisterFail = (error) => {
    return {
        type: actionTypes.USER_REGISTER_FAIL,
        error: error
    };
};

export const register = (userData) => {
    return dispatch => {
        dispatch(userRegisterStart());
        let url = 'http://localhost:5000/api/auth/register';
        axios.post(url, userData)
            .then(response => {
                dispatch(userRegisterSuccess());
            })
            .catch(err => {
                dispatch(userRegisterFail(err));
            });
    };
};