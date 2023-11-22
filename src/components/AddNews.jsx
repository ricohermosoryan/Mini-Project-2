import axios from "axios";
import React, { useState } from "react";
import PageTransition from "./PageTransition";
import { Breadcrumb } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

export default function AddNews() {
  const scrollPosition = window.scrollY;
  // Set the scroll position based on the condition
  if (scrollPosition === 0) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, 48);
  }

  const history = useNavigate();
  const [newNews, setNewNews] = useState({
    source: "",
    author: "",
    title: "",
    description: "",
    url_image: "",
    content: "",
  });

  const handAddNews = async () => {
    try {
      await axios.post(
        "https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/news",
        newNews
      );

      setNewNews({
        source: "",
        author: "",
        title: "",
        description: "",
        url_image: "",
        content: "",
      });

      alert("News added successfully");
      history("/admin");
    } catch (error) {
      console.error("Add News error", error.response.data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNews((prevProduct) => ({
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
              <Breadcrumb.Item>Add News</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="p-[30px] w-[600px] border rounded-lg bg-white">
            <div className="mb-5 text-[25px] font-semibold">Add News</div>
            <div className=" space-y-3">
              <input
                type="text"
                id="source"
                name="source"
                value={newNews.source}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Source"
                required
              ></input>

              <input
                type="text"
                id="author"
                name="author"
                value={newNews.author}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Author"
                required
              ></input>

              <input
                type="text"
                id="title"
                name="title"
                value={newNews.title}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title"
                required
              ></input>

              <textarea
                id="description"
                name="description"
                rows="4"
                value={newNews.description}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your description here..."
                required
              ></textarea>

              <input
                type="text"
                id="url_image"
                name="url_image"
                value={newNews.url_image}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Image"
                required
              ></input>

              <textarea
                id="content"
                name="content"
                rows="4"
                value={newNews.content}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your content here..."
                required
              ></textarea>

              <button
                className="border rounded-lg bg-dark-quantum text-white text-[20px] font-medium px-6 py-3"
                onClick={handAddNews}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
