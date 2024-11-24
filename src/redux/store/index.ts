import { configureStore } from '@reduxjs/toolkit';
import { projectApiSlice } from '../features/projectApiSlice';

export const store = configureStore({
    reducer: {
        [projectApiSlice.reducerPath]: projectApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(projectApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
