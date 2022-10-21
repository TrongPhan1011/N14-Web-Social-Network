import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
    name: 'sidebarChat',
    initialState: {
        groupChatId: null,
        unseenChat: 0,
        error: false,
    },
    reducers: {
        addMess: (state, action) => {
            state.groupChatId = action.payload;
            state.error = false;
        },
    },
});

export const { addMess } = messageSlice.actions;

export default messageSlice.reducer;
