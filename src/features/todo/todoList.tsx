import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addTodo, deleteTodo, fetchTodos } from "./todoSlice"
import { RootState } from "../../app/store"

interface TodoItem {
  _id: string
  created_at: string
  created_by: {
    _id: string
    username: string
  }
  is_finished: boolean
  title: string
  __v: number
}

interface TodoData {
  data: TodoItem[]
}

function Home() {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state: RootState) => state.todo.todos)
  const [title, setTitle] = useState("")

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (title) {
      dispatch(addTodo({ title }))
      setTitle("")
    }
  }

  const handleDeleteTodo = (_id: string) => {
    dispatch(deleteTodo(_id))
  }

  return (
    <div className=" h-screen container mx-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Add task"
                aria-label="Add task"
              />
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
          <ul>
            {todos &&
              typeof todos === "object" &&
              todos?.map((data: any, index) => (
                <li className="flex items-center py-2">
                  <label htmlFor="todo2" className="ml-2 block text-gray-900">
                    {data.title}
                  </label>
                  <div className="flex-shrink-0 ml-auto ">
                    {data.is_finished ? (
                      <button
                        className=" m-2 flex-shrink-0 ml-auto bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="button"
                      >
                        Đã hoàn thành
                      </button>
                    ) : (
                      <button
                        className=" m-2 flex-shrink-0 ml-auto bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="button"
                      >
                        Chưa hoàn thành
                      </button>
                    )}
                    <button
                      className=" m-2 flex-shrink-0 ml-auto bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      className="m-2 flex-shrink-0 ml-auto bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                      type="button"
                      onClick={() => handleDeleteTodo(data._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
