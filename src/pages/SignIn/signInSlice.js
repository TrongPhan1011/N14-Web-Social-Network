import { createSlice } from '@reduxjs/toolkit';

const signInSlice = createSlice({
    name: 'signIn',
    initialState: {
        userLogin: null,
    },
    reducers: {
        userLogin: (state, action) => {
            state.userLogin = action.payload;
        },
    },
});

export const { userLogin } = signInSlice.actions;
export default signInSlice.reducer;
