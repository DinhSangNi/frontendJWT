import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            isLoading: false,
            currentUser: null,
            error: null,
        },
        register: {
            isLoading: false,
            currentUser: null,
            error: null,
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
            state.login.error = null;
        },
        loginFailed: (state, action) => {
            state.login.isLoading = false;
            state.login.error = action.payload;
        },
        registerStart: state => {
            state.register.isLoading = true;
        },
        registerSuccess: (state, action) => {
            state.register.isLoading = false;
            state.register.currentUser = action.payload;
            state.register.error = null;
        },
        registerFailed: (state, action) => {
            state.register.isLoading = false;
            state.register.error = action.payload;
        },
        logoutStart: state => {
            state.logout.isLoading = true;
        },
        logoutSuccess: state => {
            state.logout.isLoading = false;
            state.login.currentUser = null;
            state.login.error = null;
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