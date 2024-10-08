/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../feature/todoSlice";
import { RootState, AppDispatch } from "../../store";
import { LoadingSpinner } from "../LoadingSpinner";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const FetchTodos: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todos,
  );

  const [limit, setLimit] = useState<number>(() => {
    const savedLimit = localStorage.getItem("todoLimit");
    return savedLimit ? parseInt(savedLimit) : 5;
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      setLimit(0);
      setErrorMessage("");
      return;
    }

    const newLimit = parseInt(inputValue);
    if (!isNaN(newLimit)) {
      const clampedLimit = Math.max(1, Math.min(newLimit, 254));
      setLimit(clampedLimit);
      setErrorMessage("");
    } else {
      setErrorMessage("Value must be a number.");
    }
  };

  const handleFetchTodos = () => {
    if (limit < 1 || limit > 254) {
      setErrorMessage("Value must be between 1 and 254.");
    } else {
      localStorage.setItem("todoLimit", limit.toString());
      dispatch(fetchTodos(limit));
      setErrorMessage("");
    }
  };

  useEffect(() => {
    dispatch(fetchTodos(limit));
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Here you can fetch data from a free API endpoint
      </Typography>
      <Typography variant="body1" gutterBottom>
        You can specify the number of elements to fetch. Default: 5
      </Typography>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
          type="number"
          value={limit === 0 ? "" : limit}
          onChange={handleLimitChange}
          placeholder="Set limit"
          inputProps={{ min: 1, max: 254 }}
          variant="outlined"
          size="small"
          error={!!errorMessage}
        />
        <Button variant="contained" onClick={handleFetchTodos}>
          Fetch Todos
        </Button>
      </Box>
      {errorMessage && (
        <Typography color="error" variant="body2">
          {errorMessage}
        </Typography>
      )}
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            sx={{ backgroundColor: "white", marginBottom: 1, borderRadius: 1 }}
          >
            <ListItemText
              primary={todo.todo}
              secondary={todo.completed ? "Completed" : "Not Completed"}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FetchTodos;
