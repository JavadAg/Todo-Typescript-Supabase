import { User } from "@supabase/supabase-js"
import React, { useState, useEffect } from "react"
import { supabase } from "./api/api"
import Auth from "./components/Auth/Auth"
import Form from "./components/Form/Form"
import TodosList from "./components/Todos/TodosList"

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User | null>()
  useEffect(() => {
    const session = supabase.auth.session()
    setUserInfo(session?.user ?? null)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user
        setUserInfo(currentUser ?? null)
      }
    )
    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  return (
    <>
      {userInfo ? (
        <div className="flex flex-col justify-center items-center space-y-4">
          <Form />
          <TodosList />
        </div>
      ) : (
        <Auth />
      )}
    </>
  )
}

export default App
