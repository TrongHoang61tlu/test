import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const createTodo = createAsyncThunk<Todo, string>(
    "todos/createTodo",
    async (title) => {
      const response = await axios.post("http://192.168.1.35:3001/todo", title);
      return response.data;
    }
  );