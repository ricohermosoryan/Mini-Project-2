import React, { useEffect, useState } from "react";
import PageTransition from "../PageTransition";
import axios from "axios";

export default function Regular() {
  const [user, setUser] = useState("");
  const [editUser, setEditUser] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
  });

  const scrollPosition = window.scrollY;
  // Set the scroll position based on the condition
  if (scrollPosition === 0) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, 48);
  }
  const id = localStorage.getItem("_id");

  useEffect(() => {
    axios
      .get(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/${id}`
      )
      .then((res) => setUser(res.data.user));
  }, []);

  const handleEdit = async () => {
    try {
      const response = await axios.patch(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/${id}`,
        editUser
      );
      setUser(response.data.user);
      alert("Profile updated successfully");
    } catch {
      console.error("Profile update error:", error.response.data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <PageTransition>
        <div className="container mx-auto">
          <div className="flex gap-3 items-center mt-10">
            <img
              src={user.image}
              alt="image"
              className=" aspect-square w-[170px] h-[170px] rounded-full"
            />
            <div>
              <h1 className="text-[30px]  font-bold">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-dark-quantum">{user.email}</p>
            </div>
          </div>
          <div className="border h-[1px] border-dark-quantum mt-3"></div>
          <div className="mx-[50px] mt-5">
            <p className="text-[25px] font-semibold">Profile Information</p>
            <p className="text-[15px] font-medium">
              Update your personal Information
            </p>
            <div className="m-5 w-[350px]">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={editUser.first_name || user.first_name}
                onChange={handleInputChange}
              ></input>
            </div>

            <div className="m-5 w-[350px]">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={editUser.last_name || user.last_name}
                onChange={handleInputChange}
              ></input>
            </div>

            <div className="m-5 w-[350px]">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={editUser.password}
                onChange={handleInputChange}
              ></input>
            </div>

            <div className="m-5 w-[350px]">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={editUser.email || user.email}
                onChange={handleInputChange}
              ></input>
            </div>

            <button
              className="bg-dark-quantum text-white rounded-lg px-6 py-2"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
