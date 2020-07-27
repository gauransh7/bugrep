import axios from 'axios';
import { message } from 'antd';
import { push } from 'connected-react-router';


export const getAllProjects = () => (dispatch) => {
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

export const getMyProjects = () => (dispatch, getState) => {
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    const userId = getState().auth.user.id

    axios.get('http://127.0.0.1:8000/backend/users/' + userId + '/projects/', config)
        .then(response => {
            dispatch({
                type: 'MY_PROJECTS',
                payload: response.data,
            });
        })
        .catch(error => {
            console.log(error);
        });
}

export const createProject = (form_data) => (dispatch) => {

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    axios.post('http://127.0.0.1:8000/backend/projects/', form_data, config)
        .then((response) => {
            dispatch({
                type: 'ADD_PROJECT',
                payload: response.data
            });
            return response.data.id
        })
        .then((projectId) => {
            dispatch(push('/Projects/' + projectId))
        })
        .catch(err => {
            console.log(err);
        })
}

export const deleteProject = (projectId) => (dispatch, getState) => {
    const token = getState().auth.token

    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.delete('http://127.0.0.1:8000/backend/projects/' + projectId + '/', config)
        .then(() => {
            dispatch(push('/Projects'))
        })
        .catch(error => {
            console.log(error);
        });
}

export const editProject = (form_data, projectId) => (dispatch, getState) => {
    const token = getState().auth.token

    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.patch('http://127.0.0.1:8000/backend/projects/'+projectId+"/", form_data, config)
        .then((response) => {
            dispatch(getAllProjects());
        })
        .catch(err => {
            console.log(err);
        })
}


