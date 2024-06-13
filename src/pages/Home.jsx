import React from "react";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";

const Home = () => {
  return (
    <div>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default Home;
