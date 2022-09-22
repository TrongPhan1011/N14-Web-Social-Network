import { createSlice } from '@reduxjs/toolkit';
const friendSlice = createSlice({
    name: 'friend',
    initialState: {
        user: null,
        error: false,
    },
    reducers: {
        findSuccess: (state, action) => {
            state.user = action.payload;
        },
        findError: (state) => {
            state.error = true;
        },
    },
});

export const { findSuccess, findError } = friendSlice.actions;
export default friendSlice.reducer;
