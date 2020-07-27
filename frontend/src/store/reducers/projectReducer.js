const initState = {
    allProjects: [],
}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ALL_PROJECTS':
            return {
                ...state,
                allProjects: action.payload,
            };
        case 'MY_PROJECTS':
            return {
                ...state,
                myProjects: action.payload
            }
        case 'ADD_PROJECT':
            return {
                ...state,
                allProjects: [...state.allProjects, action.payload]
            }
        default:
            return state;
    }
}

export default projectReducer