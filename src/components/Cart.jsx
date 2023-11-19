import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import trash from "../assets/trash.svg";
import { FiMinus, FiPlus } from "react-icons/fi";
import PageTransition from "./PageTransition";


export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export default function Cart() {
  //Cart Items
  const {
    items,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    removeAllFromCart,
  } = useContext(CartContext);

  // Total
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <>
      <PageTransition>
        <div className=" container bg-white mx-auto">
          <div className="flex justify-center items-center">
            <span className="text-[25px] font-bold pt-5">Quantum Cart</span>
          </div>
          <div className="border border-gray-500 mx-5"></div>
          <div className=" mt-5">
            <div className=" ">
              {items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-4">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-2 mb-4 mx-4 w-[359px] "
                    >
                      <div className="w-[250px] h-[140px] flex items-center">
                        <img
                          src={item.image}
                          alt="image"
                          className=" object-cover "
                        />
                      </div>
                      <div className="w-[400px]">
                        <div className="h-[120px] flex items-center">
                          <p className="mb-4 text-[19px] font-bold">
                            {item.name}
                          </p>
                        </div>

                        <p className="text-[17px] font-semibold">
                          {formatter.format(item.price)}
                        </p>

                        <div className=" flex justify-end gap-3">
                          <button onClick={() => removeFromCart(index)}>
                            <img
                              src={trash}
                              alt="image"
                              className="w-[25px] h-[25px]"
                            />
                          </button>
                          <div className="flex gap-3 bg-gray-300 rounded-lg p-1">
                            <button onClick={() => incrementQuantity(index)}>
                              <FiPlus />
                            </button>
                            {item.quantity}
                            <button onClick={() => decrementQuantity(index)}>
                              <FiMinus />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">No items in the cart.</div>
              )}
              <div className=" flex justify-around items-center pt-[40px] pb-[30px] md:w-[340px] lg:w-[470px]">
                <p className=" text-[22px] font-semibold">
                  Grand Total: <br /> {formatter.format(calculateTotal())}
                </p>
                <Link to={`/checkout?total=${calculateTotal()*100}`}>
                  <button className="border rounded-lg bg-dark-quantum text-white px-[20px] py-3">
                  Checkout
                  </button>
                </Link>
                <button
                  className="border rounded-lg bg-dark-quantum text-white px-[20px] py-3"
                  onClick={() => removeAllFromCart()}
                >
                  Delete All Items
                </button>
              </div>

            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
