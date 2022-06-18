import React from "react"
import Form from "./components/Form/Form"
import Layout from "./components/Layout/Layout"
import TodosList from "./components/Todos/TodosList"

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <TodosList />
        <Form />
      </Layout>
    </>
  )
}

export default App
