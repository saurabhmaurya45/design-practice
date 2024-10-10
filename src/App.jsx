import React from 'react'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <h1>Welcome to ui practice</h1>
      <Outlet/>
    </>
  )
}

export default App