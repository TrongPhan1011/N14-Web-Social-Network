import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
    name: 'messageSlice',
    initialState: {
        replyMess: null,
    },
    reducers: {
        addMess: (state, action) => {
            state.groupChatId = action.payload;
            state.error = false;
        },
        replyMes: (state, action) => {
            state.replyMess = action.payload;
        },
    },
});

export const { addMess, replyMes } = messageSlice.actions;

export default messageSlice.reducer;
