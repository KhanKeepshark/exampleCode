import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { exerciseReducer, mobileReducer, userReducer } from "../slices";
import { api } from "@/shared/rtkApi";

const reducers = combineReducers({
  userReducer,
  mobileReducer,
  exerciseReducer,
  [api.reducerPath]: api.reducer
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof reducers>;
