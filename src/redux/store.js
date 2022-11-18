import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authSlice from './Slice/authSlice';
import friendSlice from './Slice/friendSlice';
import signInSlice from './Slice/signInSlice';
import sidebarChatSlice from './Slice/sidebarChatSlice';
import signUpSlice from './Slice/signUpSlice';
import callSlice from './Slice/callSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    auth: authSlice,
    signIn: signInSlice,
    signUp: signUpSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        persistedReducer,
        sidebarChatSlice,
        friendSlice,
        callSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
// "react": "^18.2.0",
// "react-dom": "^18.2.0",
export let persistor = persistStore(store);
