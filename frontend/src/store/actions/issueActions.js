import axios from 'axios';
import { message } from 'antd';

export const getLatestIssues = () => (dispatch, getState) => {
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }
    
    const userId = getState().auth.user.id;

    axios.get('http://127.0.0.1:8000/backend/users/'+userId+'/your_issues/', config)
        .then(response => {
            dispatch({
                type: 'LATEST_ISSUES',
                payload: response.data,
            });
        })
        .catch(error => {
            console.log(error);
        });
}

export const changeStatus = (status, bugId) => (dispatch, getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    const data = {
        status
    }

    axios.patch('http://127.0.0.1:8000/backend/issues/'+bugId+'/', data, config)
        .then(response => {
            dispatch(getLatestIssues());
        })
        .catch(error => {
            console.log(error);
        });
}

export const changeAssignedUser = (user, bugId) => (dispatch, getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    const data = {
        assigned_user: user
    }

    axios.patch('http://127.0.0.1:8000/backend/issues/' + bugId + '/', data, config)
        .then(response => {
            console.log(response)
            dispatch(getLatestIssues());
        })
        .catch(error => {
            console.log(error);
        });
}

export const addIssue = (form_data) => (dispatch, getState) => {
    const userId = getState().auth.user.id

    form_data.append('status', 0);
    form_data.append('reported_user', userId);

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    axios.post('http://127.0.0.1:8000/backend/issues/', form_data, config)
        .then(response => {
            dispatch({
                type: 'ADD_ISSUE',
                payload: response.data,
            });
            dispatch(getLatestIssues());
            message.info('Added Successfully');
        })
        .catch(error => {
            console.log(error);
            for (var value of form_data.values()) {
                console.log(value);
            }
        });
}
