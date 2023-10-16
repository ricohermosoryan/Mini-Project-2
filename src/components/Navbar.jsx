import React, { useState } from "react";
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
import { useScroll, motion, useMotionValueEvent } from "framer-motion";

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
    { name: "Discover", href: "/discover" },
    { name: "Support", href: "/support" },
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

  //Navbar Animation
  // const [hidden, setHidden] = useState(false);

  // const { scrollY } = useScroll();

  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   const previous = scrollY.getPrevious();
  //   if (latest > previous && latest > 150) {
  //     setHidden(true);
  //   } else {
  //     setHidden(false);
  //   }
  // });

  return (
    <>
      {/* TOP HEADER */}
      <div className="bg-dark-blue">
        <div className="container mx-auto py-1 flex gap-x-4 justify-between items-center text-white text-sm font-bold">
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
                <div key={i}>
                  <a href={item.href} target="_blank">
                    <img
                      src={item.icon}
                      className="w-4 aspect-square cursor-pointer"
                      alt={item.name}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navbar animation using framer motion useScroll */}
      <motion.div
        // variants={{
        //   visible: { y: 0 },
        //   hidden: { y: 0 },
        // }}
        // animate={hidden ? "hidden" : "visible"}
        // transition={{ duration: 0.35, ease: "easeIn" }}
        className="bg-white drop-shadow z-10 sticky top-0"
      >
        {/* NAVBAR */}
        <div>
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
                <div
                  key={i}
                  className="heading text-xl font-medium py-1 border-b border-transparent  hover:border-b hover:border-quantum"
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
                </div>
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
      </motion.div>
      {/* Login Modal */}
      {modal && (
        <div className="modal z-50">
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
          <div className="modal-content ">
            <div className="chooseAccount flex gap-4 border-b-2 bg-slate-100 justify-center">
              <button className=" bg-blue-500 p-2 rounded-3xl mt-5 mb-5 ms-3">
                Login with Facebook
              </button>
              <button className=" bg-red-700 p-2 rounded-3xl mt-5 mb-5 me-3">
                Login with Google
              </button>
            </div>
            <div className="input flex mt-4 ms-5 me-2 mb-5">
              <div className="login w-1/2 border-e pe-5">
                <span className=" text-gray-600 tracking-widest text-xl font-medium">
                  LOGIN
                </span>
                <form>
                  <div className="mb-6 mt-4">
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                      placeholder="********"
                      required
                    />
                  </div>
                  <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-gray-500 focus:border-gray-500 "
                        required
                      />
                    </div>
                    <label
                      for="remember"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    LOG IN
                  </button>
                </form>
              </div>
              <div className="register w-1/2 border-s ps-2">
                <span className=" text-gray-600 tracking-widest text-xl font-medium">
                  REGISTER
                </span>
                <form>
                  <div className="mb-6 mt-4">
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                      placeholder="********"
                      required
                    />
                  </div>
                  <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-gray-500 focus:border-gray-500 "
                        required
                      />
                    </div>
                    <label
                      for="remember"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Subscribe to our TechNews
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    REGISTER
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
