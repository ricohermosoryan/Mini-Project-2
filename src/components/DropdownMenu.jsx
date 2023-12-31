import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

const DropdownMenu = ({ isOpen, toggleDropdown, dropdownType }) => {
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
                y: "-5%",
                opacity: 1,
                transition: { duration: 0.5, ease: "easeInOut" },
              },
              closed: {
                y: "-5%",
                opacity: 0,
                transition: { duration: 0.1, ease: "easeInOut" },
              },
            }}
            initial="closed"
            animate="open"
            exit="closed"
            onMouseLeave={() => toggleDropdown()}
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
                    About Us
                  </Link>
                </li>
                <li className="p-2 ">
                  <Link
                    to="/blogs"
                    className="hover:text-quantum hover:border-b hover:border-quantum"
                  >
                    Blogs
                  </Link>
                </li>
                <li className="p-2 ">
                  <Link
                    to="/news"
                    className="hover:text-quantum hover:border-b hover:border-quantum"
                  >
                    News
                  </Link>
                </li>
                <li className="p-2 ">
                  <Link
                    to="/reviews"
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
                    to="/contact"
                    className="hover:text-quantum hover:border-b hover:border-quantum"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="p-2">
                  <Link
                    to="/faq"
                    className="hover:text-quantum hover:border-b hover:border-quantum"
                  >
                    FAQs
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

export default DropdownMenu;
