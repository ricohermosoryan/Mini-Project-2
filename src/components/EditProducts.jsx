import axios from "axios";
import { AnimatePresence, useCycle, MotionConfig, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function EditProducts() {
  const scrollPosition = window.scrollY;
  // Set the scroll position based on the condition
  if (scrollPosition === 0) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, 48);
  }

  const [cycle, setCycle] = useCycle(false, true);
  const [products, setProducts] = useState("");
  const [editProducts, setEditProducts] = useState({
    name: "",
  });

  const id = localStorage.getItem("product_id") || "";

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) {
          // Handle the case where id is null or undefined
          console.error("Product ID is null or undefined");
          return;
        }

        const response = await axios.get(
          `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products/${id}`
        );
        setProducts(response.data.product);
      } catch (error) {
        console.error("Error fetching product:", error.response.data);
      }
    }

    fetchData();
  }, [id]);

  const handleEdit = async () => {
    try {
      const response = await axios.patch(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products/${id}`,
        editProducts
      );
      setProducts(response.data.product);
      alert("Product updated successfully");
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

  return (
    <>
      <div>
        <button
          className="border rounded-lg bg-dark-quantum px-6 py-3 text-white text-[20px] font-medium"
          animate={cycle ? "open" : "closed"}
          onClick={() => setCycle()}
        >
          Edit
        </button>
      </div>

      <AnimatePresence>
        {cycle && (
          <MotionConfig
            transition={{
              type: "spring",
              bounce: 0.25,
            }}
          >
            <motion.div
              className="fixed top-[9%] right-[34%] bg-white border"
              variants={{
                open: {
                  y: "10%",
                  transition: {
                    type: "spring",
                    bounce: 0.15,
                  },
                },
                closed: {
                  y: "-400%",
                  transition: {
                    type: "spring",
                    bounce: 0.15,
                  },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="p-[30px] w-[600px] text-left">
                <div className="mb-5 text-[25px] font-semibold">
                  Edit Products
                </div>
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
                    value={editProducts.features || products.features}
                    onChange={handleInputChange}
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
                    value={editProducts.image || products.image}
                    onChange={handleInputChange}
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
            </motion.div>
          </MotionConfig>
        )}
      </AnimatePresence>
    </>
  );
}
