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

        addCountUnseenChat: (state, action) => {
            // state.unseenChat = action.payload;
            console.log(state);
        },
    },
});

export const { currentChat, loginErorr, addCountUnseenChat } = sidebarChatSlice.actions;

export default sidebarChatSlice.reducer;
