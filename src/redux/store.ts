import { configureStore } from '@reduxjs/toolkit';
import { projectApiSlice } from './features/projectApiSlice';
import { RootReducer } from './rootReducer';

export const store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(projectApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
