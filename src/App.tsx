import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Layout/Header"
import Footer from "./components/Layout/Footer"
import Login from "./features/auth/login"
import Signup from "./features/auth/signup"
import Home from "./features/todo/todoList"
import { PrivateLogin, PrivateRoutes } from "./components/privateRouter"
import { useAppDispatch } from "./app/hooks"
import { useEffect } from "react"
import { checkToken } from "./features/auth/authSlice"

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkToken())
  }, [])
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateLogin />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateLogin />}>
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
export default App
