import React from 'react'
import NavbarTemplate from '../components/templates/NavbarTemplate'
import Products from '../components/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom'




export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<NavbarTemplate/>}>
            <Route path='*' element={<Products/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
