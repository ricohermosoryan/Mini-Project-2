import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import quantumLogoImage from "../assets/logo.svg";
import newletterImage from "../assets/newsletter.svg";
import facebookImage from "../assets/facebook.svg";
import twitterImage from "../assets/twitter.svg";
import instagramImage from "../assets/instagram.svg";
import youtubeImage from "../assets/youtube.svg";
import searchImage from "../assets/search.svg";
import basketImage from "../assets/basket.svg";
import profileImage from "../assets/profile.svg";
import DropdownMenu from "./DropdownMenu";
import { Tabs } from "flowbite";
import userImage from "../assets/user.svg";
import keyImage from "../assets/key.svg";
import smsImage from "../assets/sms.svg";
import eyeSlashImage from "../assets/eye-slash.svg";
import eyeImage from "../assets/eye.svg";
import { motion, useAnimation, useMotionValue } from "framer-motion";

export const socialLinks = [
  { name: "Newsletter", icon: newletterImage, href: "" },
  { name: "Facebook", icon: facebookImage, href: "" },
  { name: "Twitter", icon: twitterImage, href: "" },
  { name: "Instagram", icon: instagramImage, href: "" },
  { name: "YouTube", icon: youtubeImage, href: "" },
];

export const socialLinksExceptNewsletter = socialLinks.slice(1);

export default function Navbar() {
  const navbarList = [
    { name: "Home", href: "/home" },
    { name: "Products", href: "/" },
    { name: "Discover", href: "/" },
    { name: "Support", href: "/" },
  ];

  const companyLogo = [
    { name: "QuantumGalaxy", image: quantumLogoImage, href: "/home" },
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

      const inactiveTab = tabs.getTab("register");

      const activeTab = tabs.getActiveTab();

      let loginTab; 
      let registerTab;

      if(modal) {
        loginTab = document.getElementById('login-tab');
        registerTab = document.getElementById('register-tab'); 
      }
    }
  }, [modal]);

  const switchToLogin = () => {
    const loginTab = document.getElementById('login-tab');
    loginTab.click();
  }

  const switchToRegister = () => {
    const registerTab = document.getElementById('register-tab');
    registerTab.click(); 
  }

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

  // FORM VALIDATION
  // Login form

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState({});

  const validateLogin = () => {
    let errors = {};

    if(!loginEmail) {
      errors.email = 'Email is required';
    } else {
      errors.email = "";
    }

    if(!loginPassword) {
      errors.password = 'Password is required';
    } else {
      errors.password = "";
    }

    setLoginErrors(errors);

    return Object.keys(errors).length === 0;
  }

  const handleLoginSubmit = e => {
    e.preventDefault();

    const isValid = validateLogin();

    if(isValid) {
      // submit form
    }
  }

  // Register form

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerTerms, setRegisterTerms] = useState(false);
  const [registerErrors, setRegisterErrors] = useState({});

  const validateRegister = () => {
    let errors = {};

    if(!registerName) {
      errors.name = 'Name is required';
    } else {
      errors.name = "";
    }

    if(!registerEmail) {
      errors.email = 'Email is required';
    } else {
      errors.email = "";
    }

    if(!registerPassword) {
      errors.password = 'Password is required';
    } else {
      errors.password = "";
    }

    if(!registerTerms) {
      errors.terms = 'You must accept the Terms & Conditions';
    } else {
      errors.terms = "";
    }

    // other validations

    setRegisterErrors(errors);

    return Object.keys(errors).length === 0;
  } 

  const handleRegisterSubmit = e => {
    e.preventDefault();

    const isValid = validateRegister();

    if(isValid) {
      // submit form
    }
  }

  // to show the password
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <>
      {/* TOP HEADER */}
      <div className="bg-dark-blue">
        <div className="container mx-auto py-1 md:flex gap-x-4 justify-between items-center text-white text-sm font-bold">
          <div className="truncate">SHIPS ANYWHERE IN THE PHILIPPINES</div>
          <div className="flex gap-x-4">
            <div className="flex items-center px-4 border-r border-l border-t-0 border-b-0 border-gray-300">
              <a
                href={socialLinks[0].href}
                className="flex gap-x-2 cursor-pointer"
              >
                <img
                  src={socialLinks[0].icon}
                  className="w-4 aspect-square"
                  alt={socialLinks[0].name}
                ></img>
                <div>Newsletter</div>
              </a>
            </div>
            <div className="flex gap-x-2 items-center">
              {socialLinksExceptNewsletter.map((item, i) => (
                <nav key={i}>
                  <a href={item.href} target="_blank">
                    <img
                      src={item.icon}
                      className="w-4 aspect-square cursor-pointer"
                      alt={item.name}
                    />
                  </a>
                </nav>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="bg-white opacity-95 drop-shadow z-10 sticky top-0">
        <div className="container mx-auto py-5 flex justify-between items-center">
          <a href={companyLogo[0].href}>
            <img
              src={companyLogo[0].image}
              className="w-60 h-20 aspect-auto cursor-pointer"
              alt={companyLogo[0].name}
            ></img>
          </a>
          <div className="flex gap-12">
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
                      <DropdownMenu
                        isOpen={isOpen["Support"]}
                        toggleDropdown={() => toggleDropdown("Support")}
                        dropdownType="support"
                      />
                    )}
                    {item.name === "Discover" && (
                      <DropdownMenu
                        isOpen={isOpen["Discover"]}
                        toggleDropdown={() => toggleDropdown("Discover")}
                        dropdownType="discover"
                      />
                    )}
                    {item.name === "Products" && (
                      <DropdownMenu
                        isOpen={isOpen["Products"]}
                        toggleDropdown={() => toggleDropdown("Products")}
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
          <div className="flex gap-2">
            <div>
              <img
                src={navbarIcons[0].icon}
                className="w-10 aspect-square cursor-pointer"
                alt={navbarIcons[0].name}
              ></img>
            </div>
            <div>
              <img
                src={navbarIcons[1].icon}
                className="w-10 aspect-square cursor-pointer"
                alt={navbarIcons[1].name}
              ></img>
            </div>
            <div>
              <img
                src={navbarIcons[2].icon}
                className="w-10 aspect-square cursor-pointer"
                alt={navbarIcons[2].name}
                onClick={toggleModal}
              ></img>
            </div>
          </div>
        </div>
      </div>

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
                <form onSubmit={handleLoginSubmit}>
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
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  {loginErrors.email && <p className="text-sm text-red-500">{loginErrors.email}</p>}
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
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        name="login-password"
                        id="login-password"
                        className="grow bg-transparent text-sm p-0 m-0 border-none outline-none focus:ring-0 focus:border-none"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                      />
                      <img
                        src={showPassword ? eyeImage : eyeSlashImage}
                        onClick={() => setShowPassword(!showPassword)}
                        className="w-6 mr-1 aspect-square"
                      />
                    </div>
                    {loginErrors.password && <p className="text-sm text-red-500">{loginErrors.password}</p>}
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
                    <span className="text-quantum hover:text-dark-quantum cursor-pointer" onClick={switchToRegister}>
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
                <form onSubmit={handleRegisterSubmit}>
                  <div className="my-4">
                    <label
                      htmlFor="register-fullname"
                      className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Full Name
                    </label>
                    <div className="flex border rounded-lg px-3 py-3">
                      <img src={userImage} className="w-6 mr-1 aspect-square" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        name="register-fullname"
                        id="register-fullname"
                        className="grow bg-transparent text-sm p-0 m-0 border-none outline-none focus:ring-0 focus:border-none"
                        onChange={e => setRegisterName(e.target.value)}
                      />
                    </div>
                  </div>
                  {registerErrors.name && <p className="text-sm text-red-500">{registerErrors.name}</p>}
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
                        value={registerEmail}
                        onChange={e => setRegisterEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  {registerErrors.email && <p className="text-sm text-red-500">{registerErrors.email}</p>}
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
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        name="register-password"
                        id="register-password"
                        className="grow bg-transparent text-sm p-0 m-0 border-none outline-none focus:ring-0 focus:border-none"
                        value={registerPassword}
                        onChange={e => setRegisterPassword(e.target.value)} 
                      />
                      <img
                        src={showPassword ? eyeImage : eyeSlashImage}
                        onClick={() => setShowPassword(!showPassword)}
                        className="w-6 mr-1 aspect-square"
                      />
                    </div>
                  </div>
                  {registerErrors.password && <p className="text-sm text-red-500">{registerErrors.password}</p>}
                  <div className="my-4 px-3 flex items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="register-terms"
                        id="register-terms"
                        className="text-sm p-0 m-0 border rounded outline-none focus:ring-0 focus:border checked:bg-quantum"
                        value={registerTerms}
                        onChange={e => setRegisterTerms(e.target.checked)} 
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
                  {registerErrors.terms && <p className="text-sm text-red-500">{registerErrors.terms}</p>}
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
                    <span className="text-quantum hover:text-dark-quantum cursor-pointer" onClick={switchToLogin}>
                      Sign in
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
