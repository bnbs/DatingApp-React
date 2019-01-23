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

export const getUsersSuccess = (paginatedResult) => {
    return {
        type: actionTypes.GET_USERS_SUCCESS,
        paginatedResult: paginatedResult
    };
};


export const getUsersFail = (error) => {
    return {
        type: actionTypes.GET_USERS_FAIL,
        error: error
    };
};

export const getUsers = (page = null, itemsPerPage = null, userParams = null, likesParam = null) => {
    return dispatch => {

        let params = {};

        if (page != null && itemsPerPage != null) {
            params['pageNumber'] = page;
            params['pageSize'] = itemsPerPage;
        }

        if (userParams != null) {
            params['minAge'] = userParams.minAge;
            params['maxAge'] = userParams.maxAge;
            params['gender'] = userParams.gender;
            params['orderBy'] = 'lastActive';
        }

        if (likesParam === 'Likers') {
            params['Likers'] = 'true';
        }

        if (likesParam === 'Likees') {
            params['Likees'] = 'true';
        }

        let token = localStorage.getItem('token');
        let url = 'http://localhost:5000/api/users';

        axios.get(url, { 
            headers: {"Authorization" : `Bearer ${token}`}, 
            params: params
        })
        .then(response => {
            let paginatedResult = {};
            paginatedResult.users = response.data;
            if (response.headers['pagination'] != null) {
                paginatedResult.pagination = JSON.parse(response.headers['pagination']);
            }
            dispatch(getUsersSuccess(paginatedResult));
        })
        .catch(err => {
            dispatch(getUsersFail(err));
        });
    };
};

export const sendLikeSuccess = () => {
    return {
        type: actionTypes.SEND_LIKE_SUCCESS
    };
};

export const sendLikeFail = (error) => {
    return {
        type: actionTypes.SEND_LIKE_FAIL,
        error: error
    };
};

export const sendLike = (id: number, recipientId: number) => {
    return dispatch => {
        let url = 'http://localhost:5000/api/users/' + id + '/like/' + recipientId;
        let token = localStorage.getItem('token');
        axios.post(url, { headers: {"Authorization" : `Bearer ${token}`}})
        .then(response => {
            console.log(response);
            dispatch(sendLikeSuccess());
        })
        .catch(err => {
            dispatch(sendLikeFail(err));
        });
    }
}