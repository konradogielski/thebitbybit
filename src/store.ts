import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "./feature/todoSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
