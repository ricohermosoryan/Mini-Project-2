import axios from "axios";
import React, { useEffect, useState } from "react";
import PageTransition from "./PageTransition";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";

export default function EditNews() {
  const scrollPosition = window.scrollY;
  // Set the scroll position based on the condition
  if (scrollPosition === 0) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, 48);
  }

  const { id } = useParams();
  const history = useNavigate();
  const [news, setNews] = useState("");
  const [editNews, setEditNews] = useState({
    source: "",
    author: "",
    title: "",
    description: "",
    url_image: "",
    content: "",
  });

  useEffect(() => {
    axios
      .get(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/news/${id}`
      )
      .then((res) => setNews(res.data.news));
  }, []);

  const handleEditNews = async () => {
    try {
      const response = await axios.patch(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/news/${id}`,
        editNews
      );
      setNews(response.data.news);
      alert("News update sucessfully");
      history("/admin");
    } catch (error) {
      console.error("News update Error", error.response.data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditNews((prevUser) => ({
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
              <Breadcrumb.Item>Edit News</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="p-[30px] w-[600px] border rounded-lg bg-white">
            <div className="mb-5 text-[25px] font-semibold">Edit News</div>
            <div className=" space-y-3">
              <input
                type="text"
                id="source"
                name="source"
                value={editNews.source || news.source}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>

              <input
                type="text"
                id="author"
                name="author"
                value={editNews.author || news.author}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>

              <input
                type="text"
                id="title"
                name="title"
                value={editNews.title || news.title}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>

              <textarea
                id="description"
                name="description"
                rows="4"
                value={editNews.description || news.description}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>

              <input
                type="text"
                id="url_image"
                name="url_image"
                value={editNews.url_image || news.url_image}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>

              <textarea
                id="content"
                name="content"
                rows="4"
                value={editNews.content || news.content}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>

              <button
                className="border rounded-lg bg-dark-quantum text-white text-[20px] font-medium px-6 py-3"
                onClick={handleEditNews}
              >
                Edit Product
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
