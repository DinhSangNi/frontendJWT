import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            isLoading: false,
            currentUser: null,
            isError: false,
        },
        register: {
            isLoading: false,
            currentUser: null,
            isError: false,
        },
        logout: {
            isLoading: false,
            isError: false,
        }
    },
    reducers: {
        loginStart: state => {
            state.login.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.login.isLoading = false;
            state.login.currentUser = action.payload;
            state.login.isError = false;
        },
        loginFailed: state => {
            state.login.isLoading = false;
            state.login.isError = true;
        },
        registerStart: state => {
            state.register.isLoading = true;
        },
        registerSuccess: (state, action) => {
            state.register.isLoading = false;
            state.register.currentUser = action.payload;
            state.register.isError = false;
        },
        registerFailed: state => {
            state.register.isLoading = false;
            state.register.isError = true;
        },
        logoutStart: state => {
            state.logout.isLoading = true;
        },
        logoutSuccess: state => {
            state.logout.isLoading = false;
            state.login.currentUser = null;
            state.logout.isError = false;
        },
        logoutFailed: state => {
            state.logout.isLoading = false;
            state.logout.isError = true;
        }
    }
});

export const {
    loginFailed,
    loginStart,
    loginSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess,
} = authSlice.actions;
export default authSlice.reducer;