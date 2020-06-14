import axios from 'axios';

export const getAllProjects = () => (dispatch, getState) => {
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    axios.get('http://127.0.0.1:8000/backend/projects', config)
        .then(response => {
            dispatch({
                type: 'ALL_PROJECTS',
                payload: response.data,
            });
        })
        .catch(error => {
            console.log(error);
        });
}

