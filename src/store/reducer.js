import * as actionTypes from './actions';


const initialState = {
    activeUser: null,
    isAuthenticated: false
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.AUTHENTICATED_STATUS):
            return {
                ...state,
                activeUser: action.activeUser,
                isAuthenticated: true
            }
        case (actionTypes.USER_LOGOUT):
            return {
                ...state,
                activeUser: null,
                isAuthenticated: false
            }
        default:
            return state
    };
};

export default reducer;