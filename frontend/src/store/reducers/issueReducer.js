const initState = {
    latestIssues: [],
    reportedIssues: [],
}

const issueReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LATEST_ISSUES':
            return {
                ...state,
                latestIssues: action.payload.slice(0, 10),
            };
        case 'ADD_ISSUE':
            return {
                ...state,
                reportedIssues: [...state.reportedIssues, action.payload]
            }
        default:
            return state;
    }
}

export default issueReducer