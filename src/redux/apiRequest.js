import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess
} from './authSlice';


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {

    dispatch(registerStart());
    try {
        const res = await axios.post('/v1/auth/register', user);
        dispatch(registerSuccess(res.data));
        navigate('/login');
    } catch (error) {
        dispatch(registerFailed());
    }
}

export const logoutUser = async (id, dispatch, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());

    try {
        await axiosJWT.post('/v1/auth/logout', id, {
            headers: {
                token: `Bearer ${accessToken}`,
            }
        });
        dispatch(logoutSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(logoutFailed());
    }
}

