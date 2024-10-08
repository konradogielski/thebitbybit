import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./components/pages/Home";
import Login from "./components/navigation/Login";
import Dashboard from "./components/pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/navigation/Navbar";
import FetchTodos from "./components/pages/FetchTodos";
import TodoList from "./components/pages/TodoList";
import "./styles/App.scss";
const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/fetch-todos"
            element={<PrivateRoute element={<FetchTodos />} />}
          />
          <Route
            path="/todo"
            element={<PrivateRoute element={<TodoList />} />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
