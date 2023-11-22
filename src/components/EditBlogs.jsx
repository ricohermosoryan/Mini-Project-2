import React, { useEffect, useState } from "react";
import PageTransition from "./PageTransition";
import { Breadcrumb } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditBlogs() {
  const scrollPosition = window.scrollY;
  // Set the scroll position based on the condition
  if (scrollPosition === 0) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, 48);
  }

  const { id } = useParams();
  const history = useNavigate();
  const [blogs, setBlogs] = useState("");
  const [editBlog, setEditBlog] = useState({
    title: "",
    image: "",
    category: "",
    tags: [],
    summary: "",
    content: "",
  });

  useEffect(() => {
    axios
      .get(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/blogs/${id}`
      )
      .then((res) => setBlogs(res.data.blog));
  }, []);

  const handleEditBlog = async () => {
    try {
      const response = await axios.patch(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/blogs/${id}`,
        editBlog
      );
      setBlogs(response.data.blog);
      alert("Blog updated sucessfully");
      history("/admin");
    } catch (error) {
      console.error("Blog update error", error.response.data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditBlog((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSplitTagsChange = (e) => {
    const { name, value } = e.target;
    setEditBlog((prevProduct) => ({
      ...prevProduct,
      [name]: value.split(","),
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
              <Breadcrumb.Item>Edit Blogs</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="p-[30px] w-[600px] border rounded-lg bg-white">
            <div className="mb-5 text-[25px] font-semibold">Edit Blogs</div>
            <div className=" space-y-3">
              <input
                type="text"
                id="title"
                name="title"
                value={editBlog.title || blogs.title}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>

              <input
                type="text"
                id="image"
                name="image"
                value={editBlog.image || blogs.image}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Image Link"
                required
              ></input>

              <input
                type="text"
                id="category"
                name="category"
                value={editBlog.category || blogs.category}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Category"
                required
              ></input>

              <textarea
                id="tags"
                name="tags"
                rows="4"
                value={editBlog.tags.join(",") || blogs.tags}
                onChange={handleSplitTagsChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your Tags here seperated by comma..."
                required
              ></textarea>

              <input
                type="text"
                id="summary"
                name="summary"
                value={editBlog.summary || blogs.summary}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Summary"
                required
              ></input>

              <textarea
                id="content"
                name="content"
                rows="4"
                value={editBlog.content || blogs.content}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your content here..."
                required
              ></textarea>

              <button
                className="border rounded-lg bg-dark-quantum text-white text-[20px] font-medium px-6 py-3"
                onClick={handleEditBlog}
              >
                Edit Blogs
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
