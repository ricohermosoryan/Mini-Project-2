import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const nav = [
    { name: "Shop", href: "/shop" },
    { name: "Product", href: "/products" },
    { name: "Reviews", href: "/reviews" },
    { name: "Blogs", href: "/blogs" },
  ];

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <div className="bg-gray-800">
        <div className="container  mx-auto text-white">
          <div className="row-1 flex justify-between items-center p-2 border-b lg:mx-52">
            <div>
              <Link to="*">
                <img src="./src/assets/logo.svg" className="h-16" />
              </Link>
            </div>
            <div>Search</div>
            <div className="flex">
              Cart ||
              <button
                onClick={toggleModal}
                className="block text-gray-500 hover:text-white hover:underline"
                type="button"
              >
                Login/Register
              </button>
            </div>
          </div>
          <div className="row-2 flex justify-center gap-10 p-2">
            {nav.map((item, i) => (
              <div
                key={i}
                className=" text-gray-500 hover:text-white hover:underline"
              >
                <Link to={item.href}>{item.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Login Modal */}
      {modal && (
        <div className="modal z-10">
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
