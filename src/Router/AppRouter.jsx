import React from 'react'
import NavbarTemplate from '../components/templates/NavbarTemplate'
import Products from '../components/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../components/pages/Home'
import Shop from '../components/pages/Shop'
import Reviews from '../components/pages/Reviews'
import Blogs from '../components/pages/Blogs'


export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<NavbarTemplate/>}>
            <Route path='/' element={<Home/>} />
            <Route path='/shop' element={<Shop/>} />
            <Route path='/products' element={<Products/>} />
            <Route path='/reviews' element={<Reviews/>} />
            <Route path='/blogs' element={<Blogs/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
