import React from "react"
import Header from "../Header/Header"

type Props = {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="space-y-10 py-10 flex justify-around items-center ">
        {children}
      </main>
    </div>
  )
}

export default Layout
