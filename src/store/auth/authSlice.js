import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-auth', // 'auth', 'not-auth' , 'checking', 'reset-password'
        resp: {},
        errorMsg: undefined
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.resp = {};
            state.errorMsg = undefined;
        },

        onLogin: (state, { payload }) => {
            state.status = 'auth';
            state.resp = payload;
            state.errorMsg = undefined;
        },

        onLogout: (state, { payload }) => {
            state.status = 'not-auth';
            state.resp = {};
            state.errorMsg = payload;
        },

        clearErrorMsg: (state) => {
            state.errorMsg = undefined;
        }
    }
});


export const { onChecking, onLogin, onLogout, clearErrorMsg } = authSlice.actions;