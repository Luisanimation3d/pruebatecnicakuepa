import {createContext, useContext, useEffect, useReducer} from "react";
import {authReducer} from "./reducers/authReducer.jsx";

import {useFetch} from "../hooks/useFetch.jsx";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    updateUser: () => { },
}

export const AuthContext = createContext({
    ...initialState,
    login: () => {},
    logout: () => {},
    updateUser: () => {},
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const {get, data} = useFetch('http://localhost:3000/api/users');
    const [state, dispatch] = useReducer(authReducer, initialState, () => {
        const localData = sessionStorage.getItem('auth');
        return localData ? JSON.parse(localData) : initialState;
    });

    useEffect(() => {
        sessionStorage.setItem('auth', JSON.stringify(state));
    }, [state]);

    const login = (user, token) => {
        const payload = {
            user,
            token
        }
        if(user && token) sessionStorage.setItem('auth', JSON.stringify(payload));
        dispatch({type: 'LOGIN', payload });
    }

    const logout = () => {
        localStorage.removeItem('auth');
        dispatch({type: 'LOGOUT'});
    }

    const updateUser = () => {
        get(`getinfo/${state.token}`);
    }

    useEffect(() => {
        if(data && data.user) {
            dispatch({type: 'UPDATE_USER', payload: data.user});
        }
    }, [data]);

    return (
        <AuthContext.Provider value={{...state, login, logout, updateUser}}>
            {children}
        </AuthContext.Provider>
    );
}