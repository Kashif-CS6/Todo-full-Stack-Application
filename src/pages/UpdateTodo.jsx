import React, { useEffect } from "react";
import "../styles/AddTodo.scss";
import TodoDataService from "../services/todo.service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

import { useSelector, useDispatch } from "react-redux";
import {
  setTitle,
  setDescription,
  setUrl,
  setStatus,
  resetForm,
} from "../features/addTodoSlice.js";

const UpdateTodo = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("Here is current id:", id);

  const dispatch = useDispatch();
  const { title, description, todourl, status } = useSelector(
    (state) => state.addTodo
  );

  const handleChange = (e) => {
    dispatch(setStatus(e.target.value));
  };

  //useeffect
  useEffect(() => {
    if (id !== undefined && id !== "") {
      EditTodo();
    }
  }, [id]);

  const EditTodo = async () => {
    try {
      const docSnap = await TodoDataService.getTodo(id);
      console.log("Edited DocSnap data", docSnap.data());
      dispatch(setTitle(docSnap.data().title));
      dispatch(setDescription(docSnap.data().description));
      dispatch(setUrl(docSnap.data().todourl));
      dispatch(setStatus(docSnap.data().status));
    } catch (error) {
      console.log("Catch error", error);
    }
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
      if (id !== undefined && id !== "") {
        await TodoDataService.updateTodo(id, newTodo);
        toast.success("Todo Updated Successfully!");
        dispatch(resetForm());
        navigate("/");
      } else {
        TodoDataService.addTodo(newTodo);
        toast.success("Todo Added Successfully!");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <BackButton />
      <form onSubmit={handleSubmit} className="form">
        <h1>Update Todo</h1>
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
        <input type="submit" className="submit" value="Update Todo" />
      </form>
    </div>
  );
};

export default UpdateTodo;
