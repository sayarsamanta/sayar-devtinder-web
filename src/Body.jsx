import React from 'react'
import NavBar from './components/navBar'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer'
function Body() {
  return (
    <div>
    <NavBar />
    <Outlet />
    <Footer />
    </div>
  )
}

export default Body
