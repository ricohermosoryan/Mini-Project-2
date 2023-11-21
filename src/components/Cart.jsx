import React, { useState, useEffect } from "react";
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
  const [shouldReload, setShouldReload] = useState(false);

  const scrollPosition = window.scrollY;
  // Set the scroll position based on the condition
  if (scrollPosition === 0) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, 48);
  }
  
  //Cart Items
  const {
    items,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    removeAllFromCart,
  } = useContext(CartContext);

  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      // Only proceed if items are available
      if (items.length > 0) {
        try {
          const response = await fetch(
            'https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products'
          );
          const { products } = await response.json();

          // Match items with product details from the API based on product ID (_id)
          const cartProductDetails = items.map((cartItem) => {
            const product = products.find((product) => product._id === cartItem.product);
            return { ...product, quantity: cartItem.quantity }; // Include quantity from cartItem
          });

          setProductDetails(cartProductDetails);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };

    fetchProductDetails();
  }, [items]);

  // Total
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const product = productDetails.find((p) => p._id === item.product);
      if (product) {
        return total + product.price * item.quantity;
      }
      return total;
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
              {productDetails.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-4">
                  {productDetails.map((product, index) => (
                    <div key={index} className="flex gap-2 mb-4 mx-4 w-[359px]">
                      <div className="w-[250px] h-[140px] flex items-center">
                        <img src={product.image[0]} alt="image" className="object-cover" />
                      </div>
                      <div className="w-[400px]">
                        <div className="h-[120px] flex items-center">
                          <p className="mb-4 text-[19px] font-bold">{product.name}</p>
                        </div>
                        <p className="text-[17px] font-semibold">
                          {formatter.format(product.price)}
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
                            {product.quantity}
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
                <Link to={`/checkout?total=${btoa(calculateTotal() * 100)}`}>
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