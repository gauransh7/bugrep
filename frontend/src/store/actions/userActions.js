import axios from 'axios';

export const getUsers = () => (dispatch) => {
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    axios.get('http://127.0.0.1:8000/backend/users/', config)
        .then(response => {
            dispatch({
                type: 'ALL_USERS',
                payload: response.data,
            });
        })
        .catch(error => {
            console.log(error);
        });
}

export const changeStatus= (id, form_data) => (dispatch, getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.patch('http://127.0.0.1:8000/backend/users/'+id+'/', form_data, config)
        .then(response => {
            dispatch(getUsers());
        })
        .catch(error => {
            console.log(error);
        });
}