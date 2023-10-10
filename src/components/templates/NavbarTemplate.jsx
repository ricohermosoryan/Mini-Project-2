import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'


export default function NavbarTemplate() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
