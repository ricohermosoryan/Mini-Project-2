import axios from "axios";
import React, { useEffect, useState } from "react";
import PageTransition from "./PageTransition";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";

export default function EditProducts() {
  const scrollPosition = window.scrollY;
  // Set the scroll position based on the condition
  if (scrollPosition === 0) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, 48);
  }

  const { id } = useParams();
  const history = useNavigate();
  const [products, setProducts] = useState("");
  const [editProducts, setEditProducts] = useState({
    name: "",
    brand: "",
    price: 0,
    description: "",
    features: [],
    category: [],
    subcategory: [],
    image: [],
  });

  useEffect(() => {
    axios
      .get(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products/${id}`
      )
      .then((res) => setProducts(res.data.product));
  }, []);

  const handleEdit = async () => {
    try {
      const response = await axios.patch(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products/${id}`,
        editProducts
      );
      setProducts(response.data.product);
      alert("Product updated successfully");
      history("/admin");
    } catch {
      console.error("Product update error:", error.response.data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProducts((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSplitInputChange = (e) => {
    const { name, value } = e.target;
    setEditProducts((prevProduct) => ({
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
              <Breadcrumb.Item>Edit Products</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="flex justify-center ">
          <div className="p-[30px] w-[600px] text-left border rounded-lg bg-white ">
            <div className=" mb-2 text-[25px] font-semibold">Edit Products</div>
            <div className=" space-y-3">
              <input
                type="text"
                id="name"
                name="name"
                value={editProducts.name || products.name}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>

              <input
                type="text"
                id="brand"
                name="brand"
                value={editProducts.brand || products.brand}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>

              <input
                type="number"
                id="price"
                name="price"
                value={editProducts.price || products.price}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>

              <textarea
                id="description"
                name="description"
                rows="4"
                value={editProducts.description || products.description}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>

              <textarea
                id="features"
                name="features"
                rows="4"
                value={editProducts.features.join(",") || products.features}
                onChange={handleSplitInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>

              <input
                type="text"
                id="category"
                name="category"
                value={editProducts.category || products.category}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>

              <input
                type="text"
                id="subcategory"
                name="subcategory"
                value={editProducts.subcategory || products.subcategory}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>

              <textarea
                id="image"
                name="image"
                rows="4"
                value={editProducts.image.join(",") || products.image}
                onChange={handleSplitInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>

              <button
                className="border rounded-lg bg-dark-quantum text-white text-[20px] font-medium px-6 py-3"
                onClick={handleEdit}
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
