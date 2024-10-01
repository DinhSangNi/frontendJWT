import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const refreshToken = async () => {
    try {
        const res = await axios.post('/v1/auth/refresh');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwtDecode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                console.log('access token', data);
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refreshUser));
                // add new access token to header before request is sent to server
                config.headers['token'] = 'Bearer ' + data.accessToken;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );
    return newInstance;
};