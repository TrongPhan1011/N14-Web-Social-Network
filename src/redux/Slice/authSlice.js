import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        error: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = false;
        },
        loginErorr: (state) => {
            state.error = true;
        },
        logOutSuccess: (state) => {
            state.currentUser = null;
            state.error = false;
        },
    },
});

export const { loginSuccess, loginErorr, logOutSuccess } = authSlice.actions;

export default authSlice.reducer;
