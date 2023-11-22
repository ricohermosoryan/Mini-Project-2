import axios from "axios";
import React, { useEffect, useState } from "react";
import PageTransition from "./PageTransition";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";

export default function EditUser() {
  const scrollPosition = window.scrollY;
  // Set the scroll position based on the condition
  if (scrollPosition === 0) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, 48);
  }

  const { id } = useParams();
  const history = useNavigate();
  const [users, setUsers] = useState("");
  const [editUser, setEditUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    image: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/${id}`
      )
      .then((res) => setUsers(res.data.user));
  }, []);

  const handleEditUser = async () => {
    try {
      const response = await axios.patch(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/${id}`,
        editUser
      );
      setUsers(response.data.user);
      alert("User updated successfully");
      history("/admin");
    } catch {
      console.error("User update error:", error.response.data);
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
              <Breadcrumb.Item>Edit User</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="p-[30px] w-[600px] border rounded-lg bg-white">
            <div className="mb-5 text-[25px] font-semibold">Edit User</div>
            <div className=" space-y-3">
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={editUser.first_name || users.first_name}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>

              <input
                type="text"
                id="last_name"
                name="last_name"
                value={editUser.last_name || users.last_name}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>

              <input
                type="email"
                id="email"
                name="email"
                value={editUser.email || users.email}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>

              <input
                type="text"
                id="image"
                name="image"
                value={editUser.image || users.image}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>

              <input
                type="text"
                id="role"
                name="role"
                value={editUser.role || users.role}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>

              <input
                type="text"
                id="password"
                name="password"
                value={editUser.role || users.password}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>

              <button
                className="border rounded-lg bg-dark-quantum text-white text-[20px] font-medium px-6 py-3"
                onClick={handleEditUser}
              >
                Edit User
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
