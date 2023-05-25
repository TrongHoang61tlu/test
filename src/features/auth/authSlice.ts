import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosInstance from "../../services/axiosInstance"

interface AuthState {
  isLogin: boolean
  loading: boolean
  error: null | string
  successMessage: null | string
}

interface UserCredentials {
  username: string
  password: string
}

const initialState: AuthState = {
  isLogin: false,
  loading: false,
  error: null,
  successMessage: null,
}

export const getToken = (): string | null => {
  return localStorage.getItem("accessToken")
}

export const checkToken = () => (dispatch: any) => {
  const token = getToken()
  if (token) {
    dispatch(authSlice.actions.setLogin())
  } else {
    dispatch(authSlice.actions.setLogout())
  }
}

const saveAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken)
}

const removeAccessTokenFromLocalStorage = () => {
  localStorage.removeItem("accessToken")
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({
    formData,
    callback,
  }: {
    formData: UserCredentials
    callback: () => void
  }) => {
    const { username, password } = formData
    try {
      const response = await axiosInstance.post("/user", {
        username,
        password,
      })
      callback()
      toast.success("Đăng ký thành công")
      return response.data
    } catch (err: any) {
      toast.error("Đăng ký thất bại")
      throw err
    }
  },
)

export const login = createAsyncThunk(
  "auth/login",
  async ({
    formData,
    callback,
  }: {
    formData: UserCredentials
    callback: () => void
  }) => {
    const { username, password } = formData
    try {
      const response = await axiosInstance.post(
        "/user/sign-in",
        {
          username,
          password,
        },
      )
      saveAccessTokenToLocalStorage(response.data.accessToken)
      toast.success("Đăng nhập thành công")
      callback()
      return response.data
    } catch (error: any) {
      toast.error("Tài khoản hoặc mật khẩu không đúng!")
      throw error
    }
  },
)

export const logout = createAsyncThunk(
  "auth/logout",
  async (callback: () => void) => {
    removeAccessTokenFromLocalStorage()
    callback()
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin(state) {
      state.isLogin = true
    },
    setLogout(state) {
      state.isLogin = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.successMessage = null //
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.successMessage = "Login successful"
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.isLogin = false
        // state.error = action.payload.message ;
      })
      //login user
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isLogin = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.isLogin = false
        state.error = "Lỗi đăng nhập"
      })
      //logout
      .addCase(logout.pending, (state) => {
        state.loading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false
        state.isLogin = false
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export default authSlice.reducer
