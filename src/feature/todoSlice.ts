import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TodoState } from "../types/interface";

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (limit: number = 5) => {
    const response = await axios.get(
      `https://dummyjson.com/todos?limit=${limit}`,
    );
    return response.data.todos;
  },
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
        state.error = null;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
      });
  },
});

export default todoSlice.reducer;
