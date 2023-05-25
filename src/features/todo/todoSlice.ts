import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { RootState } from "../../app/store"
import axiosInstance from "../../services/axiosInstance"

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
  const response = await axiosInstance.get("/todo")
  return response.data.data
})

export const addTodo = createAsyncThunk<
  Todo,
  AddTodoRequest,
  { state: RootState }
>("todos/addTodo", async (todoData, { getState }) => {
  try {
    const response = await axiosInstance.post<Todo>("/todo", {
      title: todoData.title,
      completed: false,
    })
    toast.success("Thêm thành công")
    return response.data
  } catch (error) {
    toast.error("Thêm thất bại")
    throw error
  }
})

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (_id: string) => {
    try {
      const response = await axiosInstance.delete(`/todo/${_id}`)
      toast.success("Đã xóa thành công")
      return _id
    } catch (error: any) {
      toast.error("Đã xảy ra lỗi trong quá trình xóa")
      throw error
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
