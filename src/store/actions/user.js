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

export const sendLike = (id, recipientId) => {
    return dispatch => {
        let url = 'http://localhost:5000/api/users/' + id + '/like/' + recipientId;
        let token = localStorage.getItem('token');
        axios.post(url, {}, { headers: {"Authorization" : `Bearer ${token}`}})
        .then(() => {
            dispatch(sendLikeSuccess());
        })
        .catch(err => {
            dispatch(sendLikeFail(err));
        });
    }
}

export const getMessagesSuccess = (paginatedResult) => {
    return {
        type: actionTypes.GET_MESSAGES_SUCCESS,
        paginatedResult: paginatedResult
    };
};

export const getMessagesFail = (error) => {
    return {
        type: actionTypes.GET_MESSAGES_FAIL,
        error: error
    };
};

export const getMessages = (id, page = null, itemsPerPage = null, messageContainer = null) => {
    return dispatch => {

        let params = {};

        if (page != null && itemsPerPage != null) {
            params['pageNumber'] = page;
            params['pageSize'] = itemsPerPage;
        }

        params['MessageContainer'] = messageContainer;

        let url = 'http://localhost:5000/api/users/' + id + '/messages/';
        let token = localStorage.getItem('token');
        axios.get(url, { 
            headers: {"Authorization" : `Bearer ${token}`}, 
            params: params
        })
        .then(response => {
            let paginatedResult = {};
            paginatedResult.messages = response.data;
            if (response.headers['pagination'] != null) {
                paginatedResult.pagination = JSON.parse(response.headers['pagination']);
            }
            dispatch(getMessagesSuccess(paginatedResult));
        })
        .catch(err => {
            dispatch(getMessagesFail(err));
        });
    }
}

export const getUserSuccess = (user) => {
    return {
        type: actionTypes.GET_USER_SUCCESS,
        user: user
    };
};

export const getUserFail = (error) => {
    return {
        type: actionTypes.GET_USER_FAIL,
        error: error
    };
};

export const getUser = (userId) => {
    return dispatch => {
        let url = 'http://localhost:5000/api/users/' + userId;
        let token = localStorage.getItem('token');
        axios.get(url, { headers: {"Authorization" : `Bearer ${token}`}})
        .then(response => {
            dispatch(getUserSuccess(response.data));
        })
        .catch(err => {
            dispatch(getUserFail(err));
        });
    }
}

export const getMessagesThreadSuccess = (messages) => {
    return {
        type: actionTypes.GET_MESSAGES_THREAD_SUCCESS,
        messages: messages
    };
};

export const getMessagesThreadFail = (error) => {
    return {
        type: actionTypes.GET_MESSAGES_THREAD_FAIL,
        error: error
    };
};

export const getMessageThread = (id, recipientId) => {

    return dispatch => {

        let url = 'http://localhost:5000/api/users/' + id + '/messages/thread/' + recipientId;
        let token = localStorage.getItem('token');

        axios.get(url, { headers: {"Authorization" : `Bearer ${token}`}})
        .then(response => {

            let messages = response.data;
            if (messages && messages.length > 0) {
                for (let i = 0; i < messages.length; i++) {
                    if (messages[i].isRead === false && messages[i].recipientId === id) {
                        markAsRead(id, messages[i].id);
                    }
                }
            }
            dispatch(getMessagesThreadSuccess(response.data));
        })
        .catch(err => {
            dispatch(getMessagesThreadFail(err));
        });
    }    
}

export const markAsRead = (userId, messageId) => {
    let url = 'http://localhost:5000/api/users/' + userId + '/messages/' + messageId + '/read';
    let token = localStorage.getItem('token');
    axios.post(url, {}, { headers: {"Authorization" : `Bearer ${token}`}});
}

export const sendMessageSuccess = (message) => {
    return {
        type: actionTypes.SEND_MESSAGE_SUCCESS,
        message: message
    };
};

export const sendMessageFail = (error) => {
    return {
        type: actionTypes.SEND_MESSAGE_FAIL,
        error: error
    };
};

export const sendMessage = (id, message) => {
    return dispatch => {
        let url = 'http://localhost:5000/api/users/' + id + '/messages';
        let token = localStorage.getItem('token');
        axios.post(url, message, { headers: {"Authorization" : `Bearer ${token}`}})
        .then((response) => {
            console.log('Response: ' + response);
            dispatch(sendMessageSuccess(message));
        })
        .catch(err => {
            console.log(err);
            dispatch(sendMessageFail(err));
        });
    }
}