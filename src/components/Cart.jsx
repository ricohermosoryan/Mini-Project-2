import React from "react";
import basketImage from "../assets/basket.svg";
import { useCycle, motion, AnimatePresence, MotionConfig } from "framer-motion";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import trash from "../assets/trash.svg";
import { FiMinus, FiPlus } from "react-icons/fi";

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export default function Cart() {
  const [cart, setCart] = useCycle(false, true);

  const navbarIcons = [{ name: "Basket", icon: basketImage }];

  //Cart Items
  const { items, incrementQuantity, decrementQuantity, removeFromCart } =
    useContext(CartContext);

  // Total
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };
  return (
    <>
      <div>
        <motion.img
          src={navbarIcons[0].icon}
          className="w-10 aspect-square cursor-pointer "
          alt={navbarIcons[0].name}
          animate={cart ? "open" : "closed"}
          onClick={() => setCart()}
        ></motion.img>
      </div>
      <AnimatePresence>
        {cart && (
          <MotionConfig
            transition={{
              type: "spring",
              bounce: 0.25,
            }}
          >
            <motion.div
              className="fixed bg-white top-[60px] right-0 inset-0 h-[600px] border md:ms-[400px] md:h-[900px] md:top-[47px] lg:ms-[1500px]"
              variants={{
                open: {
                  x: "0%",
                  y: "8%",
                  transition: {
                    type: "spring",
                    bounce: 0.35,
                  },
                },
                closed: {
                  x: "120%",
                  y: "8%",
                  transition: {
                    type: "spring",
                    bounce: 0.25,
                  },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex justify-center items-center">
                <span className="text-[25px] font-bold pt-5">Quantum Cart</span>
              </div>
              <div className="border border-gray-500 mx-5"></div>
              <div className="flex justify-center items-center mt-5">
                <div>
                  {items.length > 0 ? (
                    <div>
                      {items.map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-2 mb-4 mx-4 w-[360px]"
                        >
                          <div className="w-[250px] h-[140px]">
                            <img
                              src={item.image}
                              alt="image"
                              className=" object-cover "
                            />
                          </div>
                          <div className="w-[400px]">
                            <p className="mb-4 text-[19px] font-bold">
                              {item.title}
                            </p>
                            <p className="text-[17px] font-semibold">
                              {formatter.format(item.price)}
                            </p>

                            <div className="flex justify-end gap-3">
                              <button onClick={() => removeFromCart(index)}>
                                <img
                                  src={trash}
                                  alt="image"
                                  className="w-[25px] h-[25px]"
                                />
                              </button>
                              <div className="flex gap-3 bg-gray-300 rounded-lg p-1">
                                <button
                                  onClick={() => incrementQuantity(index)}
                                >
                                  <FiPlus />
                                </button>
                                {item.quantity}
                                <button
                                  onClick={() => decrementQuantity(index)}
                                >
                                  <FiMinus />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <p className=" absolute top-[770px] text-[25px] font-bold">
                        Grand Total: {formatter.format(calculateTotal())}
                      </p>
                    </div>
                  ) : (
                    "No items in the cart."
                  )}
                </div>
              </div>
            </motion.div>
          </MotionConfig>
        )}
      </AnimatePresence>
    </>
  );
}
