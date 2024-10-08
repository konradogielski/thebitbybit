import React, { useEffect, useState } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Paper,
  TableBody,
  Container,
  TextField,
} from "@mui/material";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [task, setTask] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (task.trim()) {
      const newTodo = {
        id: Date.now(),
        task,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTask("");
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearTodos = () => {
    setTodos([]);
    localStorage.removeItem("todos");
  };

  return (
    <Container>
      <h1>On this page you can add, edit and change the status of a task</h1>
      <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
        <TextField
          id="outlined-basic"
          label="Add a new task"
          variant="filled"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <Button variant="contained" onClick={addTodo} sx={{ ml: 1 }}>
          Add Todo
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell align="right">Completed</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow
                key={todo.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {todo.task}
                </TableCell>
                <TableCell align="right">
                  {todo.completed ? "Yes" : "No"}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant={todo.completed ? "contained" : "outlined"}
                    onClick={() => toggleComplete(todo.id)}
                  >
                    {todo.completed ? "Undo" : "Complete"}
                  </Button>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => deleteTodo(todo.id)}
                    sx={{ ml: 1 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={clearTodos}>Clear Todos</Button>
    </Container>
  );
};

export default TodoList;
