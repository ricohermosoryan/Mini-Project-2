import React from "react";
import basketImage from "../assets/basket.svg";
import { useCycle, motion, AnimatePresence, MotionConfig } from "framer-motion";

export default function Cart() {
  const [cart, setCart] = useCycle(false, true);

  const navbarIcons = [{ name: "Basket", icon: basketImage }];
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
              <div className="flex justify-center items-center">
                <div>No Items</div>
              </div>
            </motion.div>
          </MotionConfig>
        )}
      </AnimatePresence>
    </>
  );
}
