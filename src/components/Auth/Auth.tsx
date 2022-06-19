import React from "react"
import { supabase } from "../../api/api"

const Auth = () => {
  const googleAuth = async () => {
    await supabase.auth.signIn({
      provider: "google"
    })
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <span
        onClick={() => googleAuth()}
        role="button"
        className="font-bold bg-blue-200 rounded-md p-2"
      >
        Please Login to procced
      </span>
    </div>
  )
}

export default Auth
