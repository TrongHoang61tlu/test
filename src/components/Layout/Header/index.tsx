import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../app/hooks"
import { logout } from "../../../features/auth/authSlice"
const Header = () => {
  const dispatch = useAppDispatch()
  const history = useNavigate()
  const token = localStorage.getItem("accessToken")

  const handleLogout = () => {
    dispatch(logout({ callback: () => history("/login") }))
  }
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
      <Link to="/">
        <h1 className="text-xl font-bold">Todo List</h1>
      </Link>
      <div>
        {token ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-green-500 rounded mr-4 hover:bg-green-600"
          >
            Đăng xuất
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-2 text-white bg-green-500 rounded mr-4 hover:bg-green-600">
                Đăng nhập
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                Đăng ký
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
