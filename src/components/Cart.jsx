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

export const resetProductDetails = (setter) => {
  setter([]);
};

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
            "https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products"
          );
          const { products } = await response.json();

          // Match items with product details from the API based on product ID (_id)
          const cartProductDetails = items.map((cartItem) => {
            const product = products.find(
              (product) => product._id === cartItem.product
            );
            return { ...product, quantity: cartItem.quantity }; // Include quantity from cartItem
          });

          setProductDetails(cartProductDetails);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }
    };

    fetchProductDetails();
  }, [items]);

  const handleRemoveAllFromCart = () => {
    removeAllFromCart();
    setProductDetails([]); // Reset productDetails state to an empty array when all items are removed
  };

  // Total
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const product = productDetails.find((p) => p._id === item.product);
      if (product) {
        return (
          total +
          (product.price - product.price * product.discount) * item.quantity
        );
      }
      return total;
    }, 0);
  };

  return (
    <>
      <PageTransition>
        <div className="container mx-auto px-4">
          <div className="my-6">
            <div className="container mx-auto px-4">
              <div className="flex items-baseline border-b-2 border-quantum">
                <div className="border border-transparent grow h-px"></div>
                <h2 className="heading text-xl text-dark-quantum max-w-fit p-2">
                  Cart
                </h2>
                <div className="border border-transparent grow-[8] h-px"></div>
                <p className="invisible text-sm text-dark-quantum max-w-fit p-2 flex items-center gap-x-2 hover:text-quantum">
                  View All
                </p>
                <div className="border border-transparent grow h-px"></div>
              </div>
            </div>

            <div className="container mx-auto min-h-screen">
              {productDetails.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 p-2 lg:p-4 mx-auto">
                  {productDetails.map((product, index) => (
                    <div key={index} className="mx-3 flex items-center w-full">
                      <div className="p-4 min-w-fit">
                        <Link to={`/products/${product._id}`}>
                          <div className="relative ">
                            <img
                              className="rounded-lg w-24 lg:w-48 shadow"
                              src={product.image[0]}
                              alt={product.name}
                            />
                            {product.discount > 0 && (
                              <div className="absolute top-1 left-1 bg-quantum text-white font-bold text-sm text-center leading-none rounded-full p-1">
                                {product.discount * 100}%<br />
                                OFF
                              </div>
                            )}
                          </div>
                        </Link>
                      </div>
                      <div className="grow ">
                        <Link to={`/products/${product._id}`}>
                          <p className="line-truncate md:sentence-truncate heading font-medium">
                            {product.name}
                          </p>
                        </Link>
                        <p className="text-sm text-dark-quantum mb-0 lg:mb-2">
                          {product.brand}
                        </p>
                        <div className="flex items-center justify-between py-0.5 lg:py-2 transition-all duration-200">
                          <p className="font-semibold">
                            {formatter.format(
                              product.price - product.price * product.discount
                            )}
                          </p>
                        </div>
                        <div className=" flex justify-start gap-3">
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
                <div className="text-center my-10">No items in the cart.</div>
              )}
            </div>

            <div className="container mx-auto px-4">
              <div className="flex items-baseline border-b-2 border-quantum">
                <div className="border border-transparent grow h-px"></div>
              </div>
            </div>

            <div className="w-full flex flex-wrap items-baseline my-4">
              <div className="w-full lg:w-1/2 grow px-8 mb-4">
                <p className="text-lg">
                  <span className="heading text-dark-quantum">
                    Total Price:&nbsp;&nbsp;
                  </span>
                  <span className="font-semibold text-2xl">
                    {formatter.format(calculateTotal())}
                  </span>
                </p>
              </div>
              <div className="w-full flex flex-wrap gap-y-2 lg:w-1/2 grow px-8 ">
                <Link
                  to={`/checkout?order=${btoa(calculateTotal() * 100)}`}
                  className="w-full grow md:w-2/5 mx-2 border rounded-lg hover:bg-dark-quantum text-white px-4 py-3 text-center heading bg-quantum"
                >
                  <button className="">Checkout</button>
                </Link>
                <button
                  className="w-full grow md:w-2/5 mx-2 border rounded-lg hover:bg-red-600 text-white px-4 py-3 heading bg-red-800"
                  onClick={() => handleRemoveAllFromCart()}
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
