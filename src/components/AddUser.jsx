import axios from "axios";
import React, { useState } from "react";
import PageTransition from "./PageTransition";
import { Breadcrumb } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  const scrollPosition = window.scrollY;
  // Set the scroll position based on the condition
  if (scrollPosition === 0) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, 48);
  }

  const history = useNavigate();
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    image: "",
    role: "",
    password: "",
  });

  const handleAddUser = async () => {
    try {
      await axios.post(
        "https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/register",
        newUser
      );

      setNewUser({
        first_name: "",
        last_name: "",
        email: "",
        image: "",
        role: "",
        password: "",
      });

      alert("User added successfully");
      history("/admin");
    } catch (error) {
      console.error("Add user error:", error.response.data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <>
      <PageTransition>
        <div className="container mx-auto">
          <div className="my-6">
            <Breadcrumb className="truncate">
              <Breadcrumb.Item>
                <Link to="/home" className="text-gray-700">
                  Home
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/admin" className="text-gray-700">
                  Admin
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Add User</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="p-[30px] w-[600px] border rounded-lg bg-white">
            <div className="mb-5 text-[25px] font-semibold">Add User</div>
            <div className=" space-y-3">
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={newUser.first_name}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="First Name"
                required
              ></input>

              <input
                type="text"
                id="last_name"
                name="last_name"
                value={newUser.last_name}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Last Name"
                required
              ></input>

              <input
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
                required
              ></input>

              <input
                type="text"
                id="image"
                name="image"
                value={newUser.image}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Image Link"
                required
              ></input>

              <input
                type="text"
                id="role"
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Role"
                required
              ></input>

              <input
                type="text"
                id="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
                required
              ></input>

              <button
                className="border rounded-lg bg-dark-quantum text-white text-[20px] font-medium px-6 py-3"
                onClick={handleAddUser}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
