import React from "react";
import "../styles/AddTodo.scss";
import TodoDataService from "../services/todo.service";
import { toast } from "react-toastify";

// redux toolkit
import { useSelector, useDispatch } from "react-redux";
import {
  setTitle,
  setDescription,
  setUrl,
  setStatus,
  resetForm,
} from "../features/addTodoSlice.js";

const AddTodo = () => {
  const dispatch = useDispatch();
  const { title, description, todourl, status } = useSelector(
    (state) => state.addTodo
  );
  console.log("Redux State:", { title, description, todourl, status });

  const handleChange = (e) => {
    dispatch(setStatus(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || description === "" || todourl === "" || status === "") {
      toast.error("All fields are mandatory!");
      return;
    }
    const newTodo = {
      title,
      description,
      todourl,
      status,
    };
    console.log(newTodo);

    try {
      TodoDataService.addTodo(newTodo);
      toast.success("Todo Added Successfully!");
      dispatch(resetForm());
    } catch (error) {
      toast.error(error);
    }

    dispatch(resetForm());
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>Add Todo</h1>
      <div>
        <p className="label">Todo Title</p>
        <input
          className="input_todo"
          type="text"
          name=""
          id=""
          onChange={(e) => dispatch(setTitle(e.target.value))}
          value={title}
          placeholder="Enter Title"
        />
      </div>
      <div>
        <p className="label">Todo Description</p>
        <input
          className="input_todo"
          type="text"
          name=""
          id=""
          onChange={(e) => dispatch(setDescription(e.target.value))}
          value={description}
          placeholder="Enter Description"
        />
      </div>
      <div>
        <p className="label">Todo Url</p>
        <input
          className="input_todo"
          type="text"
          name=""
          id=""
          onChange={(e) => dispatch(setUrl(e.target.value))}
          value={todourl}
          placeholder="e.g https://abcd.png"
        />
      </div>
      <div>
        <p className="label">Add Status</p>
        <select
          className="input_todo"
          name="status"
          id="staus"
          value={status}
          onChange={handleChange}
        >
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <input type="submit" className="submit" value="Add Todo" />
    </form>
  );
};

export default AddTodo;
