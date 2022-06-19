import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { supabase } from "../../api/api"

const Form = () => {
  const [todo, setTodo] = useState<string>("")

  const user = supabase.auth.user()

  const handleTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    await supabase.from("todos").insert([
      {
        user_id: user?.id,
        task: todo,
        inserted_at: new Date().toLocaleString()
      }
    ])
    window.location.reload()
  }

  const logout = () => {
    supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <>
      <Toaster />
      <span
        onClick={() => logout()}
        role="button"
        className="bg-slate-200 rounded-md px-2 py-1"
      >
        {`Logout ${user?.email}`}
      </span>
      <form
        onSubmit={(e) => handleTodo(e)}
        className="flex justify-center items-center flex-col w-full px-2"
      >
        <div className="bg-slate-200 flex flex-col p-2 border border-slate-200 justify-center items-center space-y-1 rounded-md w-full">
          <label>Description</label>
          <input
            type="input"
            minLength={4}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter a Description"
            className=" border border-slate-200 px-2 rounded-md w-full h-10"
          />
        </div>

        <input
          type="submit"
          role="button"
          value="Add"
          disabled={!todo}
          className="bg-blue-400 mt-4 px-2 py-1 w-full rounded-md disabled:bg-blue-100 "
        />
      </form>
    </>
  )
}

export default Form
