import { createSlice } from '@reduxjs/toolkit';

const callSlice = createSlice({
    name: 'callSlice',
    initialState: {
        caller: null,
        acceptCall: false,
    },
    reducers: {
        callerData: (state, action) => {
            state.caller = action.payload;
        },
        acceptCall: (state) => {
            state.acceptCall = true;
        },
    },
});

export const { callerData, acceptCall } = callSlice.actions;

export default callSlice.reducer;
