import logo from "./logo.svg"

import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Layout/Header"
import Footer from "./components/Layout/Footer"
import Login from "./features/auth/login"
import Signup from "./features/auth/signup"
import Home from "./features/todo/todoList"
import PrivateRoutes from "./components/privateRouter"
import { useAppDispatch } from "./app/hooks"
import { useEffect } from "react"
import {checkToken} from "./features/auth/authSlice"



function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkToken());
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
<ToastContainer />
export default App
