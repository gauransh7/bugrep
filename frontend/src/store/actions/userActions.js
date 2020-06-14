import axios from 'axios';

export const getUsers = () => (dispatch, getState) => {
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
