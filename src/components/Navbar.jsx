import React from 'react'

export default function Navbar() {
  return (
    <>
    <div className='bg-gray-800'>
    <div className="container  mx-auto text-white">
      <div className="row-1 flex justify-evenly p-2 border-b lg:mx-52">
          <div>GadgetStore</div>
          <div>Search</div>
          <div>Cart</div>
      </div>
      <div className="row-2 flex justify-center gap-10 p-2">
        <div>Shop</div>
        <div>Product</div>
        <div>Reviews</div>
      </div>
    </div>
    </div>
    <div className="footer bg-gray-800 text-white absolute w-full bottom-0 text-center">
      Footer
    </div>
    </>
  )
}
