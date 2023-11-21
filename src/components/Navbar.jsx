import React, { useState, useEffect, useDebugValue } from "react";
import { Link, redirect } from "react-router-dom";
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
import facebookLoginImage from "../assets/facebook-login.svg";
import googleLoginImage from "../assets/google-login.svg";
import Hamburger from "./Hamburger";
import Search from "./Search";
import Cart from "./Cart";
import icon from "../assets/icon.svg";
import CartContext from "../context/CartContext";
import { useContext } from "react";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { useCycle, motion, AnimatePresence, MotionConfig } from "framer-motion";
import axios from "axios";
import bcrypt from "bcryptjs";
import { FaRegImage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const socialLinks = [
  { name: "Newsletter", icon: newletterImage, href: "#newsletter" },
  { name: "Facebook", icon: facebookImage, href: "https://www.facebook.com" },
  { name: "Twitter", icon: twitterImage, href: "https://twitter.com" },
  {
    name: "Instagram",
    icon: instagramImage,
    href: "https://www.instagram.com",
  },
  { name: "YouTube", icon: youtubeImage, href: "https://www.youtube.com" },
];

export const socialLinksExceptNewsletter = socialLinks.slice(1);

export default function Navbar() {
  const messages = ["Ships anywhere in the Philippines"];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleNewsletterClick = (event) => {
    event.preventDefault();
    const newsletterElement = document.querySelector("#newsletter");
    if (newsletterElement) {
      newsletterElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  // Cart Items
  const { items } = useContext(CartContext);

  const navbarList = [
    { name: "Home", href: "/home" },
    { name: "Products", href: "/products" },
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
    setLoginErrors({});
    setRegisterErrors({});
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

      if (modal) {
        loginTab = document.getElementById("login-tab");
        registerTab = document.getElementById("register-tab");
      }
    }
  }, [modal]);

  const switchToLogin = () => {
    const loginTab = document.getElementById("login-tab");
    loginTab.click();
  };

  const switchToRegister = () => {
    const registerTab = document.getElementById("register-tab");
    registerTab.click();
  };

  //Framer Motion Dropdown
  const [isOpen, setIsOpen] = useState({
    Discover: false,
    Support: false,
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
    });
  };

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState({});
  // Use the userToken to check if the user is logged in
  const userToken = localStorage.getItem("userLogin");
  const userRole = localStorage.getItem("role");
  const userImage = localStorage.getItem("image");
  const [user, setUser] = useState(userToken ? true : false);
  const [foundUser, setFoundUser] = useState([]);
  const history = useNavigate();

  const clearLoginFields = () => {
    setLoginEmail("");
    setLoginPassword("");
    setLoginErrors({});
  };

  useEffect(() => {
    axios
      .get("https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users")
      .then((response) => {
        setFoundUser(response.data.users);
      });
  }, []);

  const validateLogin = async () => {
    let errors = {};
    let details = null;

    if (!loginEmail || !loginPassword) {
      errors.email = "Please enter your email";
      errors.password = "Please enter your password";
    } else {
      const userWithEmail = foundUser.find((user) => user.email === loginEmail);

      if (!userWithEmail) {
        errors.email = "Invalid email or password";
        errors.password = "Invalid email or password";
      } else {
        try {
          const passwordMatch = await bcrypt.compare(
            loginPassword,
            userWithEmail.password
          );

          if (!passwordMatch) {
            errors.email = "Invalid email or password";
            errors.password = "Invalid email or password";
          } else {
            details = userWithEmail;
          }
        } catch (error) {
          console.error("Error comparing passwords:", error);
          errors.password = "Error comparing passwords";
        }
      }
    }

    setLoginErrors(errors);
    setUser(details ? true : false);

    return { isValid: Object.keys(errors).length === 0, errors, details };
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const isValidData = await validateLogin(foundUser);
    const { isValid, errors, details } = isValidData;

    if (isValid) {
      try {
        const response = await axios.post(
          "https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/login",
          {
            email: loginEmail,
            password: loginPassword,
          }
        );

        console.log("Login response:", response.data);

        const user = foundUser.find((user) => user.email === loginEmail);
        const id = user ? user._id : null;
        const userFirstName = user ? user.first_name : null;
        const userLastName = user ? user.last_name : null;
        const userEmail = user ? user.email : null;
        const userImage = user ? user.image : null;
        const userRole = user ? user.role : null;

        localStorage.setItem("id", id);
        localStorage.setItem("role", userRole);
        localStorage.setItem("image", userImage);

        toggleModal();
        setUser(details ? true : false);

        // Set user state and save session token in a cookie
        localStorage.setItem("userLogin", response.data);

        // Clear login fields
        clearLoginFields();

        alert("Login Successful");
      } catch (error) {
        console.error("Login error:", error.response.data);
        // Handle login error, display an error message, etc.
      }
    } else {
      setLoginErrors(errors);
    }
  };

  const handleLogout = async () => {
    try {
      // Make a request to your logout API endpoint
      await axios.post(
        "https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/logout"
      );

      // Clear the session token cookie and user state
      localStorage.removeItem("userLogin");
      localStorage.removeItem("role");
      localStorage.removeItem("image");
      localStorage.removeItem("id");
      setUser(false);

      history("/home");

      // Clear login fields
      clearLoginFields();

      toggleProfile();

      alert("Logout Successful");
    } catch (error) {
      console.error("Logout error:", error.response.data);
      // Handle logout error, display an error message, etc.
    }
  };

  // Register form

  const [registerFirstname, setRegisterFirstName] = useState("");
  const [registerLastname, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerImage, setRegisterImage] = useState("");
  const [registerTerms, setRegisterTerms] = useState(false);
  const [registerErrors, setRegisterErrors] = useState({});

  const clearRegisterFields = () => {
    setRegisterFirstName("");
    setRegisterLastName("");
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterTerms(false);
    setRegisterErrors({});
  };

  const validateRegister = () => {
    let errors = {};

    if (!registerFirstname) {
      errors.firstname = "Please enter your first name";
    }

    if (!registerLastname) {
      errors.lastname = "Please enter your last name";
    }

    if (!registerEmail) {
      errors.email = "Please enter a valid email address";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(registerEmail)) {
      errors.email = "Invalid email address format";
    }

    if (!registerPassword) {
      errors.password = "Create a unique password (min. 8 characters)";
    } else if (registerPassword.length < 8) {
      errors.password = "Passwords must be at least 8 characters long";
    }

    if (!registerTerms) {
      errors.terms_accepted = "You must agree before submitting";
    }

    setRegisterErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const isValid = validateRegister();
    console.log(isValid);

    if (isValid) {
      // submit form

      const data = {
        first_name: registerFirstname,
        last_name: registerLastname,
        email: registerEmail,
        password: registerPassword,
        image: registerImage,
      };

      axios
        .post(
          "https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/register",
          data
        )
        .then(async (response) => {
          console.log(response.data);
          alert("Registration successful");

          // Clear register fields
          clearRegisterFields();

          // Refetch the user data after successful registration
          const userResponse = await axios.get(
            "https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users"
          );
          setFoundUser(userResponse.data.users);
        })
        .catch((error) => {
          console.error("Error registering user:", error);
          alert("Registration failed");
        });
    }
  };

  // to show the password
  const [showPassword, setShowPassword] = useState(false);

  // Profile dropdown
  const [profile, toggleProfile] = useCycle(false, true);

  return (
    <>
      {/* TOP HEADER */}
      <div className="bg-dark-blue">
        <div className="container mx-auto py-1 md:flex gap-x-4 justify-between items-center text-white text-sm font-bold px-2">
          <div className="truncate uppercase">{messages[messageIndex]}</div>
          <div className="flex gap-x-4">
            <div className="flex items-center md:px-4 pr-4 border-r md:border-l border-l-0 border-t-0 border-b-0 border-gray-300">
              <Link
                to={socialLinks[0].href}
                onClick={handleNewsletterClick}
                className="flex gap-x-2 cursor-pointer scroll-smooth"
              >
                <img
                  src={socialLinks[0].icon}
                  className="w-4 h-4 aspect-square"
                  alt={socialLinks[0].name}
                ></img>
                <div>Newsletter</div>
              </Link>
            </div>
            <div className="flex gap-x-2 items-center">
              {socialLinksExceptNewsletter.map((item, i) => (
                <nav key={i} className="w-4 h-4">
                  <Link to={item.href} target="_blank">
                    <img
                      src={item.icon}
                      className="w-4 h-4 aspect-square cursor-pointer"
                      alt={item.name}
                    />
                  </Link>
                </nav>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="bg-white opacity-100  drop-shadow z-10 sticky top-0">
        <div className="container mx-auto py-5 flex  justify-between items-center md:gap-1">
          <Link to={companyLogo[0].href}>
            <img
              src={icon}
              className="w-[60px] h-[60px] aspect-auto cursor-pointer block md:block lg:hidden"
              alt={companyLogo[0].name}
            ></img>
          </Link>
          <div className="lg:mx-[-330px]">
            <Link to={companyLogo[0].href}>
              <img
                src={companyLogo[0].image}
                className="w-60 h-20 aspect-auto cursor-pointer hidden md:hidden lg:block"
                alt={companyLogo[0].name}
              ></img>
            </Link>
          </div>

          <div className="flex gap-12 md:gap-4 lg:gap-12 lg:ms-[360px]">
            {navbarList.map((item, i) => (
              <nav
                key={i}
                className="heading text-xl font-medium py-1 border-b border-transparent hover:border-b hover:border-quantum hidden md:block lg:block"
                onMouseLeave={() => toggleDropdown(item.name)}
              >
                {/* Code for the dropdown menu of Product, Discover and support link */}
                {item.name === "Discover" || item.name === "Support" ? (
                  <div>
                    <button
                      className="hover:text-quantum"
                      onClick={() => toggleDropdown(item.name)}
                      onMouseEnter={() => toggleDropdown(item.name)}
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
          <div className="flex gap-2 me-[60px] lg:me-[10px]">
            <div>
              <Search />
            </div>
            <div className=" relative">
              <Link to="/cart">
                <img
                  src={navbarIcons[1].icon}
                  alt={navbarIcons[1].name}
                  className="w-10 aspect-square cursor-pointer "
                />
              </Link>
              <div className=" rounded-full bg-red-700 w-[20px] h-[20px] flex justify-center items-center absolute bottom-0 right-0 text-white">
                {items.length}
              </div>
            </div>
            {user ? (
              <div>
                <img
                  src={userImage}
                  className="w-10 aspect-square rounded-full cursor-pointer "
                  alt={userImage}
                  animate={profile ? "open" : "closed"}
                  onClick={() => toggleProfile()}
                />
                <AnimatePresence>
                  {[
                    profile && (
                      <MotionConfig
                        key="motion-config-key"
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
                                type: "spring",
                                bounce: 0.25,
                              },
                            },
                            closed: {
                              y: "-300%",
                              transition: {
                                type: "spring",
                                bounce: 0.25,
                              },
                            },
                          }}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          className="fixed h-[80px] w-[180px] bg-white shadow-lg rounded-lg border"
                        >
                          <ul className=" space-y-1 mx-2 my-2 text-lg font-bold">
                            {userRole === "admin" ? (
                              <Link to={"/admin"}>
                                <li>Admin Dashboard</li>
                              </Link>
                            ) : (
                              <Link to={"/regular"}>
                                <li>Account Profile</li>
                              </Link>
                            )}
                            <li>
                              <button
                                onClick={handleLogout}
                                className="hover:text-quantum hover:border-b hover:border-quantum"
                              >
                                Logout
                              </button>
                            </li>
                          </ul>
                        </motion.div>
                      </MotionConfig>
                    ),
                  ]}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center">
                <IoLogInOutline
                  className="w-[32px] h-[32px] aspect-square cursor-pointer "
                  onClick={toggleModal}
                />
              </div>
            )}
          </div>
          <div className="md:hidden lg:hidden">
            <Hamburger />
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {modal && (
        <div id="modal-container" className="modal flex justify-center z-50">
          <div onClick={toggleModal} className="overlay"></div>
          {/* PROFILE TAB */}
          <div className="modal-content rounded-lg bg-white w-96 absolute top-20">
            {/* TABS */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <ul
                className="flex justify-evenly -mb-px heading text-md font-semibold text-center text-quantum dark:text-quantum"
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
                <div className="heading text-center text-xl mb-6">
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
                        onInput={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  {loginErrors.email && (
                    <p className="text-sm text-red-500 -mt-3">
                      {loginErrors.email}
                    </p>
                  )}
                  <div className="my-4">
                    <label
                      htmlFor="login-password"
                      className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <div className="flex border rounded-lg px-3 py-3 mb-4">
                      <img src={keyImage} className="w-6 mr-1 aspect-square" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="login-password"
                        id="login-password"
                        className="grow bg-transparent text-sm p-0 m-0 border-none outline-none focus:ring-0 focus:border-none"
                        value={loginPassword}
                        onInput={(e) => setLoginPassword(e.target.value)}
                      />
                      <img
                        src={showPassword ? eyeImage : eyeSlashImage}
                        onClick={() => setShowPassword(!showPassword)}
                        className="w-6 mr-1 aspect-square"
                      />
                    </div>
                    {loginErrors.password && (
                      <p className="text-sm text-red-500 -mt-3">
                        {loginErrors.password}
                      </p>
                    )}
                    <div className="text-right text-xs text-quantum my-1 px-3 cursor-pointer hover:text-dark-quantum">
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
                </form>
                {/* <div className="flex justify-center items-center gap-4 my-2">
                  <div className="h-px border grow"></div>
                  <div className="text-sm">or Log In with</div>
                  <div className="h-px border grow"></div>
                </div>
                <div className="flex gap-2 my-4">
                  <div className="flex grow w-full justify-center items-center gap-2 py-2 border border-quantum rounded-lg cursor-pointer hover:border-dark-quantum">
                    <img src={googleLoginImage} className="w-6 aspect-square" />
                    <span className="text-quantum heading font-medium text-base hover:text-dark-quantum">
                      Google
                    </span>
                  </div>
                  <div className="flex grow w-full justify-center items-center gap-2 py-2 border border-quantum rounded-lg cursor-pointer hover:border-dark-quantum">
                    <img
                      src={facebookLoginImage}
                      className="w-6 aspect-square"
                    />
                    <span className="text-quantum heading font-medium text-base hover:text-dark-quantum">
                      Facebook
                    </span>
                  </div>
                </div> */}
                <div className="text-sm text-center my-2">
                  Don't have an account? &nbsp;{" "}
                  <span
                    className="text-quantum hover:text-dark-quantum cursor-pointer"
                    onClick={switchToRegister}
                  >
                    Sign up
                  </span>
                </div>
              </div>

              {/* REGISTER */}
              <div
                className="hidden p-4 rounded-lg bg-white dark:bg-main-body"
                id="register-contents"
              >
                <div className="heading text-center text-xl mb-6">
                  Create your account
                </div>
                <form onSubmit={handleRegisterSubmit}>
                  <div className="my-4">
                    <label
                      htmlFor="register-firstname"
                      className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <div className="flex border rounded-lg px-3 py-3">
                      <img src={userImage} className="w-6 mr-1 aspect-square" />
                      <input
                        type="text"
                        placeholder="First Name"
                        name="register-firstname"
                        id="register-firstname"
                        className="grow bg-transparent text-sm p-0 m-0 border-none outline-none focus:ring-0 focus:border-none"
                        onInput={(e) => setRegisterFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  {registerErrors.firstname && (
                    <p className="text-sm text-red-500 -mt-3">
                      {registerErrors.firstname}
                    </p>
                  )}

                  <div className="my-4">
                    <label
                      htmlFor="register-lastname"
                      className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <div className="flex border rounded-lg px-3 py-3">
                      <img src={userImage} className="w-6 mr-1 aspect-square" />
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="register-lastname"
                        id="register-lastname"
                        className="grow bg-transparent text-sm p-0 m-0 border-none outline-none focus:ring-0 focus:border-none"
                        onInput={(e) => setRegisterLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  {registerErrors.lastname && (
                    <p className="text-sm text-red-500 -mt-3">
                      {registerErrors.lastname}
                    </p>
                  )}

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
                        onInput={(e) => setRegisterEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  {registerErrors.email && (
                    <p className="text-sm text-red-500 -mt-3">
                      {registerErrors.email}
                    </p>
                  )}
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
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="register-password"
                        id="register-password"
                        className="grow bg-transparent text-sm p-0 m-0 border-none outline-none focus:ring-0 focus:border-none"
                        value={registerPassword}
                        onInput={(e) => setRegisterPassword(e.target.value)}
                      />
                      <img
                        src={showPassword ? eyeImage : eyeSlashImage}
                        onClick={() => setShowPassword(!showPassword)}
                        className="w-6 mr-1 aspect-square"
                      />
                    </div>
                  </div>
                  {registerErrors.password && (
                    <p className="text-sm text-red-500 -mt-3">
                      {registerErrors.password}
                    </p>
                  )}

                  <div className="my-4">
                    <label
                      htmlFor="register-lastname"
                      className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Image
                    </label>
                    <div className="flex border rounded-lg px-3 py-3">
                      <FaRegImage className="w-6 h-6 mr-1 aspect-square text-[#bcbcbc]" />
                      <input
                        type="text"
                        placeholder="Image"
                        name="image"
                        id="image"
                        className="grow bg-transparent text-sm p-0 m-0 border-none outline-none focus:ring-0 focus:border-none"
                        onInput={(e) => setRegisterImage(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="my-4 px-3 flex items-center">
                    <input
                      type="checkbox"
                      name="register-terms"
                      id="register-terms"
                      className="text-sm p-0 m-0 border rounded outline-none focus:ring-0 focus:border checked:bg-quantum self-baseline"
                      value={registerTerms}
                      onInput={(e) => setRegisterTerms(e.target.checked)}
                    />
                    <label
                      htmlFor="register-terms"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-white relative -top-0.5"
                    >
                      I agree to the&nbsp;
                      <span className="text-quantum hover:text-dark-quantum cursor-pointer">
                        <Link to={"/terms-of-service"}>Terms of Service</Link>
                      </span>
                      &nbsp;and&nbsp;
                      <span className="text-quantum hover:text-dark-quantum cursor-pointer">
                        <Link to={"/privacy-policy"}>Privacy Policy</Link>
                      </span>
                    </label>
                  </div>
                  {registerErrors.terms_accepted && (
                    <p className="text-sm text-red-500 -mt-3">
                      {registerErrors.terms_accepted}
                    </p>
                  )}
                  <div className="flex my-4">
                    <button
                      type="submit"
                      className="grow text-white heading bg-quantum hover:bg-dark-quantum focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
                {/* <div className="flex justify-center items-center gap-4 my-2">
                  <div className="h-px border grow"></div>
                  <div className="text-sm">or Sign Up with</div>
                  <div className="h-px border grow"></div>
                </div>
                <div className="flex gap-2 my-4">
                  <div className="flex grow w-full justify-center items-center gap-2 py-2 border border-quantum rounded-lg cursor-pointer hover:border-dark-quantum">
                    <img src={googleLoginImage} className="w-6 aspect-square" />
                    <span className="text-quantum heading font-medium text-base hover:text-dark-quantum">
                      Google
                    </span>
                  </div>
                  <div className="flex grow w-full justify-center items-center gap-2 py-2 border border-quantum rounded-lg cursor-pointer hover:border-dark-quantum">
                    <img
                      src={facebookLoginImage}
                      className="w-6 aspect-square"
                    />
                    <span className="text-quantum heading font-medium text-base hover:text-dark-quantum">
                      Facebook
                    </span>
                  </div>
                </div> */}
                <div className="text-sm text-center my-2">
                  Already have an account? &nbsp;{" "}
                  <span
                    className="text-quantum hover:text-dark-quantum cursor-pointer"
                    onClick={switchToLogin}
                  >
                    Sign in
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
