import { configureStore } from "@reduxjs/toolkit";
import addTodoReducer from "../features/addTodoSlice";
import todoListReducer from "../features/todoListSlice";

export const store = configureStore({
  reducer: {
    addTodo: addTodoReducer,
    todos: todoListReducer,
  },
});

export default store;
