import { createSlice } from "@reduxjs/toolkit";

const todoListSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { setTodos } = todoListSlice.actions;

export default todoListSlice.reducer;
