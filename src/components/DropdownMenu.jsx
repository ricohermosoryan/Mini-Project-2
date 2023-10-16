import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const DropdownMenu = ({ isOpen, toggleDropdown, dropdownType }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute mt-2 w-48 bg-white border rounded shadow-md"
          initial={{ opacity: 0, y: "-50%" }}
          animate={{ opacity: 1, y: "0" }}
          exit={{ opacity: 0, y: "-50%" }}
          transition={{
            type: "spring",
            stiffness: "100",
            duration: "0.75",
          }}
        >
          {dropdownType === "discover" && (
            <ul>
              <li className="p-2">
                <Link
                  to="/about"
                  className="hover:text-quantum hover:underline"
                >
                  About
                </Link>
              </li>
              <li className="p-2 ">
                <Link
                  to="/item2"
                  className="hover:text-quantum hover:underline"
                >
                  Blogs
                </Link>
              </li>
              <li className="p-2 ">
                <Link
                  to="/item4"
                  className="hover:text-quantum hover:underline"
                >
                  News
                </Link>
              </li>
              <li className="p-2 ">
                <Link
                  to="/item5"
                  className="hover:text-quantum hover:underline"
                >
                  Reviews
                </Link>
              </li>
            </ul>
          )}

          {dropdownType === "support" && (
            <ul>
              <li className="p-2">
                <Link
                  to="/item3"
                  className="hover:text-quantum hover:underline"
                >
                  Contact Us
                </Link>
              </li>
              <li className="p-2">
                <Link
                  to="/item6"
                  className="hover:text-quantum hover:underline"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;
