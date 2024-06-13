import React from "react";
import "../styles/Todo.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import TodoDataService from "../services/todo.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcApprove } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";

const Todo = ({ index, title, description, todourl, id, getTodos, status }) => {
  const navigate = useNavigate();
  const deleteHandler = async (id) => {
    await TodoDataService.deleteTodo(id);
    toast.success("Todo deleted successfully!");
    getTodos();
  };

  const AcceptedStatus = async (id) => {
    const newTodo = {
      title: title,
      description: description,
      todourl: todourl,
      status: "Accepted",
    };
    console.log(newTodo);

    try {
      await TodoDataService.updateTodo(id, newTodo);
      toast.success("Todo Status Accepted Successfully!");
    } catch (error) {
      toast.error(error);
    }
  };
  const RejectedStatus = async (id) => {
    const newTodo = {
      title: title,
      description: description,
      todourl: todourl,
      status: "Rejected",
    };
    console.log(newTodo);

    try {
      await TodoDataService.updateTodo(id, newTodo);
      toast.success("Todo Status Rejected Successfully!");
    } catch (error) {
      toast.error(error);
    }
  };

  const getTodoId = (e) => {
    navigate(`/updateTodo/${e}`);
  };
  return (
    <div className="todo" key={index}>
      <img src={todourl} alt="" />
      <h1 className={`${status === "Accepted" ? "title" : "title-rejected"}`}>
        {title}
      </h1>
      <p className={` ${status === "Accepted" ? "simple" : "description"}`}>
        {description.substring(0, 288)}.. more
      </p>
      <div className="status-div">
        <h1 className="status">Status</h1>
        <div className="buttons-status">
          <button onClick={(e) => AcceptedStatus(id)}>
            <FcApprove size={20} />
          </button>
          <button onClick={(e) => RejectedStatus(id)}>
            <FcDisapprove size={20} />
          </button>
        </div>
        <p className={`${status === "Accepted" ? "Accepted" : "Rejected"}`}>
          {status}
        </p>
      </div>
      <div className="buttons">
        <button className="editbutton" onClick={(e) => getTodoId(id)}>
          <FaEdit />
        </button>
        <button className="deletebutton" onClick={(e) => deleteHandler(id)}>
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default Todo;
