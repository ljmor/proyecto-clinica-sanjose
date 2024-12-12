import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        status: 'base' // base, below
    },
    reducers: {
        changeUIStatus: (state, { payload }) => {
            state.status = payload;
        },
    }
});


export const { changeUIStatus } = uiSlice.actions;