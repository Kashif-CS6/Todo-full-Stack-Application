import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  description: "",
  todourl: "",
  status: "",
};

const addTodoSlice = createSlice({
  name: "addTodo",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setUrl: (state, action) => {
      state.todourl = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    resetForm: (state) => {
      state.title = "";
      state.description = "";
      state.todourl = "";
      state.status = "";
    },
  },
});

export const { setTitle, setDescription, setUrl, setStatus, resetForm } =
  addTodoSlice.actions;

export default addTodoSlice.reducer;
