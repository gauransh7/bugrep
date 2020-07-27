import axios from 'axios';
import { Redirect } from 'react-router-dom';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: 'USER_LOADING'});

    const token = getState().auth.token;

    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.get('http://127.0.0.1:8000/backend/auth/user', config)
        .then(response => {
            dispatch({ 
                type: 'USER_LOADED',
                payload: response.data,
            });
            
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: 'AUTH_ERROR'
            });
        });
}

export const setToken = (token) => dispatch => {
    dispatch({ 
        type: 'LOGIN_SUCCESS',
        token: token,
    });
}

export const logout = () => (dispatch) => {
    dispatch({
        type: 'LOGOUT',
    });
} 
