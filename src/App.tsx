import logo from "./logo.svg"

import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Layout/Header"
import Footer from "./components/Layout/Footer"
import Login from "./features/auth/login"
import Signup from "./features/auth/signup"
import Home from "./features/todo/todoList"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element= {<Login/>} />
        <Route path="/signup" element= {<Signup/>} />
        <Route path="/" element= {<Home/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
