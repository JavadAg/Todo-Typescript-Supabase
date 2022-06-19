import React, { useEffect, useState } from "react"
import { supabase } from "../../api/api"
import SingleTodo from "./SingleTodo/SingleTodo"
import { Todo } from "../../models/todo"

const TodosList = () => {
  const [todos, setTodos] = useState<Todo[] | null>()
  const user = supabase.auth.user()

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user?.id)
      .order("id", { ascending: false })

    return todos
  }

  useEffect(() => {
    user && fetchTodos().then((res) => setTodos(res))
  }, [])

  return (
    <div className="flex flex-col justify-center items-center rounded-md px-2 py-1 space-y-4 w-full">
      {todos ? (
        todos?.map((todo, index) => <SingleTodo key={index} todo={todo} />)
      ) : (
        <span>No Todos</span>
      )}
    </div>
  )
}

export default TodosList
