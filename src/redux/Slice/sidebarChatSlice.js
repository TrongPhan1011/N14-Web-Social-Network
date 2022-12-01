import { createSlice } from '@reduxjs/toolkit';

const sidebarChatSlice = createSlice({
    name: 'sidebarChat',
    initialState: {
        currentChat: null,
        unseenChat: 0,
        error: false,
    },
    reducers: {
        currentChat: (state, action) => {
            state.currentChat = action.payload;
            state.error = false;
        },

        removeCurrentChat: (state) => {
            state.currentChat = null;
            state.error = false;
        },

        addCountUnseenChat: (state, action) => {
            // state.unseenChat = action.payload;

        },
    },
});

export const { currentChat, loginErorr, addCountUnseenChat, removeCurrentChat } = sidebarChatSlice.actions;

export default sidebarChatSlice.reducer;
