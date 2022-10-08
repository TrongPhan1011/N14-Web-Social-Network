import { createSlice } from '@reduxjs/toolkit';

const sidebarChatSlice = createSlice({
    name: 'sidebarChat',
    initialState: {
        groupChatId: null,
        unseenChat: 0,
        error: false,
    },
    reducers: {
        addGroupChatId: (state, action) => {
            state.groupChatId = action.payload;
            state.error = false;
        },
        loginErorr: (state) => {
            state.error = true;
        },
        addCountUnseenChat: (state, action) => {
            // state.unseenChat = action.payload;
            console.log(state);
        },
    },
});

export const { addGroupChatId, loginErorr, addCountUnseenChat } = sidebarChatSlice.actions;

export default sidebarChatSlice.reducer;
