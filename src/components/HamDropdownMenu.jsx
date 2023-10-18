import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

const HamDropdownMenu = ({ isOpen, toggleDropdown, dropdownType }) => {
  return (
    //Framer Motion to animate the dropdown
    <AnimatePresence>
      {isOpen && (
        <MotionConfig
          transition={{
            type: "spring",
            bounce: 0.25,
          }}
        >
          <motion.div
            className="absolute mt-2 w-48 bg-white border rounded shadow-md "
            variants={{
              open: {
                y: "0%",
                x: "50%",
                transition: {
                  when: "beforeChildren",
                  type: "spring",
                  bounce: 0.15,
                },
              },
              closed: {
                y: "-800%",
                transition: {
                  when: "afterChildren",
                  type: "spring",
                  bounce: 0.15,
                },
              },
            }}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {dropdownType === "discover" && (
              <motion.ul
                variants={{
                  open: {
                    x: "0%",
                    opacity: 1,
                  },
                  closed: {
                    x: "-25%",
                    opacity: 0,
                  },
                }}
              >
                <li className="p-2">
                  <Link
                    to="/about"
                    className="hover:text-quantum hover:border-b hover:border-quantum"
                  >
                    About
                  </Link>
                </li>
                <li className="p-2 ">
                  <Link
                    to="/item2"
                    className="hover:text-quantum hover:border-b hover:border-quantum"
                  >
                    Blogs
                  </Link>
                </li>
                <li className="p-2 ">
                  <Link
                    to="/item4"
                    className="hover:text-quantum hover:border-b hover:border-quantum"
                  >
                    News
                  </Link>
                </li>
                <li className="p-2 ">
                  <Link
                    to="/item5"
                    className="hover:text-quantum hover:border-b hover:border-quantum"
                  >
                    Reviews
                  </Link>
                </li>
              </motion.ul>
            )}

            {dropdownType === "support" && (
              <motion.ul
                variants={{
                  open: {
                    x: "0%",
                    opacity: 1,
                  },
                  closed: {
                    x: "-25%",
                    opacity: 0,
                  },
                }}
              >
                <li className="p-2">
                  <Link
                    to="/item3"
                    className="hover:text-quantum hover:border-b hover:border-quantum"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="p-2">
                  <Link
                    to="/item6"
                    className="hover:text-quantum hover:border-b hover:border-quantum"
                  >
                    FAQs
                  </Link>
                </li>
              </motion.ul>
            )}

            {dropdownType === "products" && (
              <motion.ul
                variants={{
                  open: {
                    x: "0%",
                    opacity: 1,
                  },
                  closed: {
                    x: "-25%",
                    opacity: 0,
                  },
                }}
              >
                <li className="p-2">
                  <Link
                    to="/products"
                    className="hover:text-quantum hover:border-b hover:border-quantum"
                  >
                    All Product
                  </Link>
                </li>
              </motion.ul>
            )}
          </motion.div>
        </MotionConfig>
      )}
    </AnimatePresence>
  );
};

export default HamDropdownMenu;
