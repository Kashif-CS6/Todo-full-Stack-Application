import React from "react";
import "./styles/App.scss";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateTodo from "./pages/UpdateTodo.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/updateTodo/:id" element={<UpdateTodo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
