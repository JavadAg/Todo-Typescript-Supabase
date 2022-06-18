import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { createClient } from "@supabase/supabase-js"

const { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_API_KEY } = process.env

const Form = () => {
  const [todo, setTodo] = useState<string>("")

  const supabase = createClient(
    REACT_APP_SUPABASE_URL!,
    REACT_APP_SUPABASE_API_KEY!
  )

  const handleTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from("todos")
      .insert([{ user_id: "sax", task: "someValue" }])
    console.log(data)
    console.log(error)
    toast.success("Successfuly Added Todo")
  }

  return (
    <>
      <Toaster />
      <form
        onSubmit={(e) => handleTodo(e)}
        className="flex justify-center items-center flex-col"
      >
        <div className="bg-slate-50 mt-5 flex flex-col p-2 border border-slate-200 justify-center items-center space-y-1 rounded-md">
          <label>Title</label>
          <input
            type="input"
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter a title"
            className=" border border-slate-200 px-2 rounded-md"
          />
        </div>

        <input
          type="submit"
          value="Add"
          disabled={!todo}
          className="bg-blue-400 mt-4 px-2 py-1 w-full rounded-md disabled:bg-blue-100 "
        />
      </form>
    </>
  )
}

export default Form
