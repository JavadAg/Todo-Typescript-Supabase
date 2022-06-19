import React from "react"
import { supabase } from "../../../api/api"
import { Todo } from "../../../models/todo"

type Props = {
  todo: Todo
}

const SingleTodo: React.FC<Props> = ({ todo }: Props) => {
  const { inserted_at, task, is_complete, id } = todo

  const handleComplete = async () => {
    const { data, error } = await supabase
      .from("todos")
      .update({ is_complete: true })
      .match({ id: id })
    window.location.reload()
  }

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .match({ id: id })
    window.location.reload()
  }

  return (
    <div
      className={`flex justify-center items-center border border-gray-200 py-2 space-y-2 w-full flex-col rounded-md ${
        is_complete ? "bg-green-400" : "bg-slate-100"
      }`}
    >
      <span>Date : {inserted_at}</span>
      <span>Description : {task}</span>
      <span>{is_complete ? "true" : "false"}</span>
      <div className="space-x-2">
        <button
          onClick={() => handleComplete()}
          disabled={is_complete}
          className="bg-slate-200 px-2 py-1 rounded-md border border-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Set Complete
        </button>
        <button
          onClick={() => handleDelete()}
          className="bg-red-200 px-2 py-1 rounded-md border border-gray-200 hover:bg-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default SingleTodo
