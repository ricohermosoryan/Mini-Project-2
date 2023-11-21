import axios from "axios";
import { AnimatePresence, MotionConfig, useCycle, motion } from "framer-motion";
import React, { useState } from "react";
import { FaCreativeCommonsPdAlt } from "react-icons/fa6";

export default function AddProducts() {
  const scrollPosition = window.scrollY;
  // Set the scroll position based on the condition
  if (scrollPosition === 0) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, 48);
  }

  const [addProducts, setAddProducts] = useCycle(false, true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    price: 0,
    description: "",
    features: [],
    category: [],
    subcategory: [],
    image: [],
  });

  const handleAddProduct = async () => {
    try {
      await axios.post(
        "https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products",
        newProduct
      );

      setNewProduct({
        name: "",
        brand: "",
        price: 0,
        description: "",
        features: [],
        category: [],
        subcategory: [],
        image: [],
      });

      alert("Product added successfully!");
    } catch (error) {
      console.error("Add product error:", error.response.data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSplitInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value.split(","),
    }));
  };

  return (
    <>
      <div>
        <button
          className="border rounded-lg bg-dark-quantum px-6 py-3 text-white text-[20px] font-medium"
          animate={addProducts ? "open" : "closed"}
          onClick={() => setAddProducts()}
        >
          Add Products
        </button>
      </div>
      <AnimatePresence>
        {addProducts && (
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
              <div className="p-[30px] w-[600px]">
                <div className="mb-5 text-[25px] font-semibold">
                  Add Products
                </div>
                <div className=" space-y-3">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name"
                    required
                  ></input>

                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={newProduct.brand}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Brand"
                    required
                  ></input>

                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Price"
                    required
                  ></input>

                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your description here..."
                    required
                  ></textarea>

                  <textarea
                    id="features"
                    name="features"
                    rows="4"
                    value={newProduct.features.join(",")}
                    onChange={handleSplitInputChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your features here seperated by comma"
                    required
                  ></textarea>

                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Category"
                    required
                  ></input>

                  <input
                    type="text"
                    id="subcategory"
                    name="subcategory"
                    value={newProduct.subcategory}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Subcategory"
                    required
                  ></input>

                  <textarea
                    id="image"
                    name="image"
                    rows="4"
                    value={newProduct.image.join(",")}
                    onChange={handleSplitInputChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Place the 3 Images link separated by comma"
                    required
                  ></textarea>

                  <button
                    className="border rounded-lg bg-dark-quantum text-white text-[20px] font-medium px-6 py-3"
                    onClick={handleAddProduct}
                  >
                    Add Product
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
