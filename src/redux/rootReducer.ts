import { projectApiSlice } from "./features/projectApiSlice";

export const RootReducer = {
    [projectApiSlice.reducerPath]: projectApiSlice.reducer,
}
