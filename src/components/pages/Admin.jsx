import React, { useEffect, useState } from "react";
import PageTransition from "../PageTransition";
import axios from "axios";
import AddProducts from "../AddProducts";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Admin() {
  const scrollPosition = window.scrollY;
  // Set the scroll position based on the condition
  if (scrollPosition === 0) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, 48);
  }

  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [news, setNews] = useState([]);
  const [users, setUsers] = useState([]);

  const id = localStorage.getItem("_id");

  useEffect(() => {
    axios
      .get(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/${id}`
      )
      .then((res) => setUser(res.data.user));

    axios
      .get(
        "https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products"
      )
      .then((res) => setProducts(res.data.products));

    axios
      .get("https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/blogs")
      .then((res) => setBlogs(res.data.blogs));

    axios
      .get("https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/news")
      .then((res) => setNews(res.data.news));

    axios
      .get("https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users")
      .then((res) => setUsers(res.data.users));
  }, []);

  const handleDeleteProducts = (productId) => {
    axios
      .delete(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products/${productId}`
      )
      .then((res) => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        alert("Product deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting product", error);
      });
  };

  const handleDeleteBlogs = (blogId) => {
    axios
      .delete(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/blogs/${blogId}`
      )
      .then((res) => {
        setProducts((prevProducts) =>
          prevProducts.filter((blog) => blog._id !== blogId)
        );
        alert("Blog deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting blog", error);
      });
  };

  return (
    <>
      <PageTransition>
        <div className="container mx-auto">
          <div className="my-6 mx-2">
            <Breadcrumb className="truncate">
              <Breadcrumb.Item>
                <Link to="/home" className="text-gray-700">
                  Home
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="flex gap-3 items-center">
            <div className="mx-2">
              <h1 className="text-[30px]  font-bold">Admin Page</h1>
              <p className="text-dark-quantum">{user.email}</p>
            </div>
          </div>

          <div className="border h-[1px] border-dark-quantum mt-3 mx-2"></div>

          <div className="grid md:grid-cols-2  gap-3 ">
            <div className=" p-5 border mt-10 rounded-lg shadow-lg">
              <h1 className="text-[25px]  font-semibold">Products</h1>
              <p className="text-[20px] font-medium">
                Total Products: {products.length}
              </p>
              <div className="mt-5 mb-5">
                <div>
                  <Link to={"/add-product"}>
                    <button className="border rounded-lg bg-dark-quantum px-6 py-3 text-white text-[20px] font-medium">
                      Add Products
                    </button>
                  </Link>
                </div>
              </div>

              <h1 className="text-[25px]  font-semibold">Product Preview</h1>
              <div className=" overflow-y-auto h-[400px] w-[333px] lg:w-[730px]">
                <ul className="space-y-2">
                  {products.map((item, i) => {
                    return (
                      <li key={i} className=" border rounded-lg">
                        <p className="text-[20px] font-semibold truncate">
                          {item.name}
                        </p>
                        <div>
                          <Link to={`/edit-product/${item._id}`}>
                            <button className="border rounded-lg bg-dark-quantum px-6 py-3 text-white text-[20px] font-medium">
                              Edit
                            </button>
                          </Link>
                          <button
                            className="border rounded-lg bg-dark-quantum px-6 py-3 text-white text-[20px] font-medium"
                            onClick={() => handleDeleteProducts(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="p-5 border mt-10 rounded-lg shadow-lg">
              <h1 className="text-[25px]  font-semibold">Blogs</h1>
              <p className="text-[20px] font-medium">
                Total Blogs Count: {blogs.length}
              </p>
              <div className="mt-5 mb-5">
                <div>
                  <Link to={"/add-blogs"}>
                    <button className="border rounded-lg bg-dark-quantum px-6 py-3 text-white text-[20px] font-medium">
                      Add Blogs
                    </button>
                  </Link>
                </div>
              </div>

              <h1 className="text-[25px]  font-semibold">
                Blogs Title Preview
              </h1>
              <div className=" overflow-y-auto h-[400px] w-[333px] lg:w-[730px]">
                <ul className="space-y-2">
                  {blogs.map((item, i) => {
                    return (
                      <li key={i} className="border rounded-lg">
                        <p className="text-[20px] font-semibold truncate">
                          {item.title}
                        </p>
                        <div>
                          <Link to={`/edit-blog/${item._id}`}>
                            <button className="border rounded-lg bg-dark-quantum px-6 py-3 text-white text-[20px] font-medium">
                              Edit
                            </button>
                          </Link>
                          <button
                            className="border rounded-lg bg-dark-quantum px-6 py-3 text-white text-[20px] font-medium"
                            onClick={() => handleDeleteBlogs(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="p-5 border mt-10 rounded-lg shadow-lg">
              <h1 className="text-[25px]  font-semibold">News</h1>
              <p className="text-[20px] font-medium">
                Total News Count: {news.length}
              </p>
              <div className="mt-5 mb-5">
                <div>
                  <Link to={"/add-news"}>
                    <button className="border rounded-lg bg-dark-quantum px-6 py-3 text-white text-[20px] font-medium">
                      Add News
                    </button>
                  </Link>
                </div>
              </div>

              <h1 className="text-[25px]  font-semibold">News Tile Preview</h1>
              <div className=" overflow-y-auto h-[400px] w-[333px] lg:w-[730px]">
                <ul className="space-y-2">
                  {news.map((item, i) => {
                    return (
                      <li key={i} className=" border rounded-lg">
                        <p className="text-[20px] font-semibold truncate">
                          {item.title}
                        </p>
                        <div>
                          <Link to={`/edit-news/${item._id}`}>
                            <button className="border rounded-lg bg-dark-quantum px-6 py-3 text-white text-[20px] font-medium">
                              Edit
                            </button>
                          </Link>
                          <button
                            className="border rounded-lg bg-dark-quantum px-6 py-3 text-white text-[20px] font-medium"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="p-5 border mt-10 rounded-lg shadow-lg">
              <h1 className="text-[25px]  font-semibold">Users</h1>
              <p className="text-[20px] font-medium">
                Total Users: {users.length}
              </p>
              <div className="mt-5 mb-5">
                <div>
                  <Link to={""}>
                    <button className="border rounded-lg bg-dark-quantum px-6 py-3 text-white text-[20px] font-medium">
                      Add Users
                    </button>
                  </Link>
                </div>
              </div>

              <h1 className="text-[25px]  font-semibold">Users Preview</h1>
              <div className=" overflow-y-auto h-[400px] w-[333px] lg:w-[730px]">
                <ul className="space-y-2">
                  {users.map((item, i) => {
                    return (
                      <li key={i} className=" border rounded-lg">
                        <p className="text-[20px] font-semibold truncate">
                          {item.first_name} {item.last_name}
                        </p>
                        <div>
                          <Link to={`/edit-users/${item._id}`}>
                            <button className="border rounded-lg bg-dark-quantum px-6 py-3 text-white text-[20px] font-medium">
                              Edit
                            </button>
                          </Link>
                          <button
                            className="border rounded-lg bg-dark-quantum px-6 py-3 text-white text-[20px] font-medium"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
