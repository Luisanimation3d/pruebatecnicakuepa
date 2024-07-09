export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false
            }
        case 'UPDATE_USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}