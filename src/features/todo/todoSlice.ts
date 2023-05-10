import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../../app/store"

interface Todo {
  _id: string
  title: string
  completed: boolean
}
interface TodosState {
  todos: Todo[]
  loading: boolean
  error: null | string
}

interface AddTodoRequest {
  title: string
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
}

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(
    "http://192.168.1.35:3001/todo",

    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },
  )

  return response.data.data
})

export const addTodo = createAsyncThunk<
  Todo,
  AddTodoRequest,
  { state: RootState }
>("todos/addTodo", async (todoData, { getState }) => {
  const response = await axios.post<Todo>(
    "http://192.168.1.35:3001/todo",
    {
      title: todoData.title,
      completed: false,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },
  )

  return response.data
})

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (_id: string, { rejectWithValue, getState }) => {
    try {
      const response = await axios.delete(
        `http://192.168.1.35:3001/todo/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      )
      return _id
    } catch (error: any) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const updateTodo = createAsyncThunk("todos/updateTodo", async () => {})

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false
        state.todos = action.payload
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false
        state.error = "Failed to fetch todos"
      })

      // Create todo
      .addCase(addTodo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false
        state.todos.push(action.payload)
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false
        // state.error = action.error.message;
      })
      //delete Todo

      .addCase(deleteTodo.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false
        state.todos = state.todos.filter((todo) => todo?._id !== action.payload)
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false
        // state.error = action.payload;
      })
  },
})

export default todosSlice.reducer
