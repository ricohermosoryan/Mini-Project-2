import React, { useEffect, useState } from "react";
import { motion, useCycle, AnimatePresence, MotionConfig } from "framer-motion";
import { Tabs } from "flowbite";
import searchImage from "../assets/search.svg";
import basketImage from "../assets/basket.svg";
import profileImage from "../assets/profile.svg";
import userImage from "../assets/user.svg";
import keyImage from "../assets/key.svg";
import smsImage from "../assets/sms.svg";
import eyeSlashImage from "../assets/eye-slash.svg";

import { Link } from "react-router-dom";
import HamDropdownMenu from "./HamDropdownMenu";

export default function Hamburger(props) {
  //thi will toggle the hamburger icon open and close
  const [hamburger, toggleHamburger] = useCycle(false, true);

  // const [discover, toggleDiscover] = useCycle(false, true);

  const navbarList = [
    { name: "Home", href: "/home" },
    { name: "Products", href: "/" },
    { name: "Discover", href: "/" },
    { name: "Support", href: "/" },
  ];

  const navbarIcons = [
    { name: "Search", icon: searchImage },
    { name: "Basket", icon: basketImage },
    { name: "Profile", icon: profileImage },
  ];

  //Login Modal
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  // TABBED PROFILE LOGIN
  useEffect(() => {
    let modalContainer;

    if (modal) {
      modalContainer = document.getElementById("modal-container");
    }

    if (modalContainer) {
      const tabElements = [
        {
          id: "login",
          triggerEl: modalContainer.querySelector("#login-tab"),
          targetEl: modalContainer.querySelector("#login-contents"),
        },
        {
          id: "register",
          triggerEl: modalContainer.querySelector("#register-tab"),
          targetEl: modalContainer.querySelector("#register-contents"),
        },
      ];

      const options = {
        defaultTabId: "register",
        activeClasses:
          "heading text-quantum hover:text-quantum dark:text-quantum dark:hover:text-quantum border-quantum dark:border-quantum",
        inactiveClasses:
          "heading hover:text-quantum dark:text-gray-400 border-gray-100 hover:border-quantum dark:border-gray-700 dark:hover:text-gray-300",
        onShow: () => {
          console.log("tab is shown");
        },
      };

      const tabs = new Tabs(tabElements, options);

      tabs.show("login");

      const contactsTab = tabs.getTab("register");

      const activeTab = tabs.getActiveTab();
    }
  }, [modal]);

  //Framer Motion Dropdown
  const [isOpen, setIsOpen] = useState({
    Discover: false,
    Support: false,
    Product: false,
  });

  const toggleDropdown = (itemName) => {
    const updatedOpenState = { ...isOpen };

    updatedOpenState[itemName] = !isOpen[itemName];

    //This will close other dropdown when clicked
    Object.keys(updatedOpenState).forEach((key) => {
      if (key !== itemName) {
        updatedOpenState[key] = false;
      }
    });

    setIsOpen(updatedOpenState);
  };

  const closeDropdown = () => {
    setIsOpen({
      Discover: false,
      Support: false,
      Product: false,
    });
  };

  return (
    <>
      <div className="relative z-10">
        <motion.button
          animate={hamburger ? "open" : "closed"}
          onClick={() => toggleHamburger()}
          className="flex flex-col space-y-1 me-6"
        >
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 6 },
            }}
            className=" w-5 h-[2px] bg-black block"
          ></motion.span>
          <motion.span
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            className=" w-5 h-[2px] bg-black block"
          ></motion.span>
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -6 },
            }}
            className=" w-5 h-[2px] bg-black block"
          ></motion.span>
        </motion.button>
      </div>

      {/* Hamburger Menu */}
      <AnimatePresence>
        {hamburger && (
          <MotionConfig
            transition={{
              type: "spring",
              bounce: 0.25,
            }}
          >
            <motion.div
              variants={{
                open: {
                  y: "0%",
                  transition: {
                    when: "beforeChildren",
                    type: "spring",
                    bounce: 0.35,
                  },
                },
                closed: {
                  y: "-100%",
                  transition: {
                    when: "afterChildren",
                    type: "spring",
                    bounce: 0.25,
                  },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 h-[400px] bg-white space-y-10 p-6 container mx-auto"
            >
              {/* Icons */}
              <motion.div
                variants={{
                  open: {
                    y: "0%",
                    opacity: 1,
                  },
                  closed: {
                    y: "25%",
                    opacity: 0,
                  },
                }}
                className="flex gap-2"
              >
                <div>
                  <img
                    src={navbarIcons[0].icon}
                    className="w-10 aspect-square cursor-pointer "
                    alt={navbarIcons[0].name}
                  ></img>
                </div>
                <div>
                  <img
                    src={navbarIcons[1].icon}
                    className="w-10 aspect-square cursor-pointer "
                    alt={navbarIcons[1].name}
                  ></img>
                </div>
                <div>
                  <img
                    src={navbarIcons[2].icon}
                    className="w-10 aspect-square cursor-pointer "
                    alt={navbarIcons[2].name}
                    onClick={toggleModal}
                  ></img>
                </div>
              </motion.div>

              {/* Line */}
              <motion.div
                className="w-full bg-black h-px"
                variants={{
                  open: {
                    y: "0%",
                    opacity: 1,
                  },
                  closed: {
                    y: "25%",
                    opacity: 0,
                  },
                }}
              ></motion.div>

              {/* Links */}
              <motion.div
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
                <div className="w-[100px]">
                  {navbarList.map((item, i) => (
                    <nav
                      key={i}
                      className="heading text-xl font-medium py-1 border-b border-transparent hover:border-b hover:border-quantum"
                    >
                      {/* Code for the dropdown menu of Discover and support link */}
                      {item.name === "Discover" ||
                      item.name === "Support" ||
                      item.name === "Products" ? (
                        <div>
                          <button
                            className="hover:text-quantum"
                            onClick={() => toggleDropdown(item.name)}
                          >
                            {item.name}
                          </button>
                          {item.name === "Support" && (
                            <HamDropdownMenu
                              isOpen={isOpen["Support"]}
                              toggleDropdown={() => toggleDropdown("Support")}
                              animate={isOpen ? "open" : "closed"}
                              dropdownType="support"
                            />
                          )}
                          {item.name === "Discover" && (
                            // <button
                            //   onClick={() => toggleDiscover()}
                            //   animate={discover ? "open" : "closed"}
                            // ></button>
                            <HamDropdownMenu
                              isOpen={isOpen["Discover"]}
                              toggleDropdown={() => toggleDropdown("Discover")}
                              animate={isOpen ? "open" : "closed"}
                              dropdownType="discover"
                            />
                          )}
                          {item.name === "Products" && (
                            <HamDropdownMenu
                              isOpen={isOpen["Products"]}
                              toggleDropdown={() => toggleDropdown("Products")}
                              animate={isOpen ? "open" : "closed"}
                              dropdownType="products"
                            />
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={closeDropdown}
                          className="hover:text-quantum"
                        >
                          {item.name}
                        </Link>
                      )}
                    </nav>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </MotionConfig>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      {modal && (
        <div id="modal-container" className="modal z-50">
          <div onClick={toggleModal} className="overlay">
            <button
              onClick={toggleModal}
              className="close-modal hover:bg-gray-600 rounded-lg"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* PROFILE TAB */}
          <div className="modal-content rounded-lg bg-white w-96">
            {/* TABS */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <ul
                className="flex justify-evenly -mb-px heading text-md font-medium text-center text-quantum dark:text-quantum"
                id="profileTab"
              >
                <li className="mr-2">
                  <button
                    className="py-1 m-3 border-b-2 border-transparent rounded-t-lg hover:text-quantum hover:border-quantum dark:hover:text-quantum"
                    id="login-tab"
                    type="button"
                  >
                    Log in
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    className="py-1 m-3 border-b-2 border-transparent rounded-t-lg hover:text-quantum hover:border-quantum dark:hover:text-quantum"
                    id="register-tab"
                    type="button"
                  >
                    Register
                  </button>
                </li>
              </ul>
            </div>

            {/* CONTENTS */}
            <div id="profileTabContent">
              {/* LOGIN */}
              <div
                className="hidden p-4 rounded-lg bg-white dark:bg-main-body"
                id="login-contents"
              >
                <div className="heading text-center text-xl my-6">
                  Log in to QuantumGalaxy
                </div>
                <form>
                  <div className="my-4">
                    <label
                      htmlFor="login-email"
                      className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <div className="flex border rounded-lg px-3 py-3">
                      <img src={smsImage} className="w-6 mr-1 aspect-square" />
                      <input
                        type="email"
                        placeholder="Email"
                        name="login-email"
                        id="login-email"
                        className="grow bg-transparent text-sm p-0 m-0 border-none outline-none focus:ring-0 focus:border-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="my-4">
                    <label
                      htmlFor="login-password"
                      className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <div className="flex border rounded-lg px-3 py-3">
                      <img src={keyImage} className="w-6 mr-1 aspect-square" />
                      <input
                        type="password"
                        placeholder="Password"
                        name="login-password"
                        id="login-password"
                        className="grow bg-transparent text-sm p-0 m-0 border-none outline-none focus:ring-0 focus:border-none"
                        required
                      />
                      <img
                        src={eyeSlashImage}
                        className="w-6 mr-1 aspect-square"
                      />
                    </div>
                    <div className="text-right text-xs text-quantum py-1 px-3 cursor-pointer hover:text-dark-quantum">
                      Forgot password?
                    </div>
                  </div>
                  <div className="my-4 px-3 flex items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="login-remember"
                        id="login-remember"
                        className="text-sm p-0 m-0 border rounded outline-none focus:ring-0 focus:border checked:bg-quantum"
                        required
                      />
                    </div>
                    <label
                      htmlFor="login-remember"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Keep me logged in
                    </label>
                  </div>
                  <div className="flex my-4">
                    <button
                      type="submit"
                      className="grow text-white heading bg-quantum hover:bg-dark-quantum focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Log In
                    </button>
                  </div>
                  <div className="text-sm text-center my-2">
                    Don't have an account? &nbsp;{" "}
                    <span className="text-quantum hover:text-dark-quantum cursor-pointer">
                      Sign up
                    </span>
                  </div>
                </form>
              </div>

              {/* REGISTER */}
              <div
                className="hidden p-4 rounded-lg bg-white dark:bg-main-body"
                id="register-contents"
              >
                <div className="heading text-center text-xl my-6">
                  Create your account
                </div>
                <form>
                  <div className="my-4">
                    <label
                      htmlFor="register-fullname"
                      className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <div className="flex border rounded-lg px-3 py-3">
                      <img src={userImage} className="w-6 mr-1 aspect-square" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        name="register-fullname"
                        id="register-fullname"
                        className="grow bg-transparent text-sm p-0 m-0 border-none outline-none focus:ring-0 focus:border-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="my-4">
                    <label
                      htmlFor="register-email"
                      className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <div className="flex border rounded-lg px-3 py-3">
                      <img src={smsImage} className="w-6 mr-1 aspect-square" />
                      <input
                        type="email"
                        placeholder="Email"
                        name="register-email"
                        id="register-email"
                        className="grow bg-transparent text-sm p-0 m-0 border-none outline-none focus:ring-0 focus:border-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="my-4">
                    <label
                      htmlFor="register-password"
                      className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <div className="flex border rounded-lg px-3 py-3">
                      <img src={keyImage} className="w-6 mr-1 aspect-square" />
                      <input
                        type="password"
                        placeholder="Password"
                        name="register-password"
                        id="register-password"
                        className="grow bg-transparent text-sm p-0 m-0 border-none outline-none focus:ring-0 focus:border-none"
                        required
                      />
                      <img
                        src={eyeSlashImage}
                        className="w-6 mr-1 aspect-square"
                      />
                    </div>
                  </div>
                  <div className="my-4 px-3 flex items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="register-terms"
                        id="register-terms"
                        className="text-sm p-0 m-0 border rounded outline-none focus:ring-0 focus:border checked:bg-quantum"
                        required
                      />
                    </div>
                    <label
                      htmlFor="register-terms"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      I agree to all{" "}
                      <span className="text-quantum hover:text-dark-quantum cursor-pointer">
                        Terms & Conditions
                      </span>
                    </label>
                  </div>
                  <div className="flex my-4">
                    <button
                      type="submit"
                      className="grow text-white heading bg-quantum hover:bg-dark-quantum focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Create Account
                    </button>
                  </div>
                  <div className="text-sm text-center my-2">
                    Already have an account? &nbsp;{" "}
                    <span className="text-quantum hover:text-dark-quantum cursor-pointer">
                      Sign in
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {discover && <div className="fixed inset-0 h-[500px] bg-white">Link</div>} */}
    </>
  );
}
