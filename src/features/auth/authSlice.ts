import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface AuthState {
  token: string | null
  loading: boolean
  error: null | string
  user: UserCredentials
  successMessage: null | string
  isAuthenticated: boolean
}

interface UserCredentials {
  username: string
  password: string
  token: string | null
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
  user: {
    username: '',
    password: '',
    token: null
  },
  successMessage: null,
  isAuthenticated: false
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: UserCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://192.168.1.35:3001/user", data)
      return response.data.token
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  },
)

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    try {
      const response = await axios.post(
        "http://192.168.1.35:3001/user/sign-in",
        {
          username,
          password,
        },
      )  
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
)
export const logout = createAsyncThunk('auth/logout', async () => {
  await
  localStorage.removeItem('accessToken'); // xóa token ở local storage
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.successMessage = null; //
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload
        state.error = null
        state.successMessage = "Đăng ký thành công"
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.token = null
        // state.error = action.payload.message ;
      })
      //login user
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        // Lưu token vào local storage
        localStorage.setItem("accessToken", action.payload.accessToken)
        state.token = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        // state.error = action.error.message;
      })
      //logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
      });
     
  },
})

export default authSlice.reducer

