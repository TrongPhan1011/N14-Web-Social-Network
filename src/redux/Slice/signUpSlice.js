import { createSlice } from '@reduxjs/toolkit';

const signUpSlice = createSlice({
    name: 'signUp',
    initialState: {
        userSignUp: null,
    },
    reducers: {
        userSignUp: (state, action) => {
            state.userSignUp = action.payload;
        },
    },
});

export const { userSignUp } = signUpSlice.actions;
export default signUpSlice.reducer;
