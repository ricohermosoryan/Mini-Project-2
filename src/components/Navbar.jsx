import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const nav = [
    {name: "Shop", href: "/shop"},
    {name: "Product", href: "/products"},
    {name: "Reviews", href: "/reviews"},
    {name: "Blogs", href: "/blogs"}
  ]
  return (
    <>
    <div className='bg-gray-800'>
    <div className="container  mx-auto text-white">
      <div className="row-1 flex justify-evenly p-2 border-b lg:mx-52">
          <div>QuantumGalaxy</div>
          <div>Search</div>
          <div>Cart || Login/Register</div>
      </div>
      <div className="row-2 flex justify-center gap-10 p-2">
        {nav.map((item , i) => (
          <div key={i}>
            <Link to={item.href}>{item.name}</Link>
          </div>
        ))}
      </div>
    </div>
    </div>
    
    </>
  )
}
