const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
}

const authReducer = (state = initState, action) => {
    switch (action.type){
        case 'USER_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.token)
            return {
                ...state,
                token: action.token,
                isAuthenticated: true,
                isLoading: false,
            }
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isLoading: false,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}

export default authReducer