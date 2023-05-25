import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../app/hooks"

export function PrivateRoutes() {
  const isLogin = useAppSelector((state) => state.auth.isLogin)
  return <>{isLogin ? <Outlet /> : <Navigate to="/login" />};</>
}

export function PrivateLogin() {
  const isLogin = useAppSelector((state) => state.auth.isLogin)

  return <>{isLogin ? <Navigate to="/" /> : <Outlet />};</>
}
