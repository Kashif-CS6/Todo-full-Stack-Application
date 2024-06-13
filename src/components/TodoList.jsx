import React, { useEffect, useState } from "react";
import "../styles/TodoList.scss";
import Todo from "./Todo";
import TodoDataService from "../services/todo.service";
import { IoRefresh } from "react-icons/io5";

// redux toolkit
import { useSelector, useDispatch } from "react-redux";
import { setTodos } from "../features/todoListSlice.js";

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    console.log("this is env details:", process.env.REACT_APP_FIREBASE_API_KEY);
    const data = await TodoDataService.getAllTodos();
    dispatch(setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  return (
    <>
      <div className="topList">
        <h1
          className="h1"
          style={{ textAlign: "center", marginTop: "4rem", fontWeight: "bold" }}
        >
          Todo List
        </h1>
        <button className="refreshbutton" onClick={getTodos}>
          <IoRefresh />
        </button>
      </div>
      <div className="todolist">
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <div className="todomap" key={index}>
              <Todo
                index={index}
                title={todo.title}
                description={todo.description}
                todourl={todo.todourl}
                id={todo.id}
                getTodos={getTodos}
                status={todo.status}
              />
            </div>
          ))
        ) : (
          <h1 className="norecord">No Todo Exist</h1>
        )}
      </div>
    </>
  );
};

export default TodoList;
