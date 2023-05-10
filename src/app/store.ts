import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import todoSlice from "../features/todo/todoSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    todo : todoSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
