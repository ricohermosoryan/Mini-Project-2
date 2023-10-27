'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../PageTransition";
import { Breadcrumb } from 'flowbite-react';
import cart from "../../assets/cart.svg";
import star from "../../assets/star.svg";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export default function Products() {
  // Cart Items
  const { addToCart } = useContext(CartContext);

  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    brand: "",
    maxPrice: "",
    category: [],
    subcategory: "",
    minRating: "",
  });

  const [isAccordion1Open, setAccordion1Open] = useState(false);
  const [isAccordion2Open, setAccordion2Open] = useState(false);

  const [hoveredItem, setHoveredItem] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 24;

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        "https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/products"
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
    return controller.abort();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryCheckbox = (category) => {
    setFilters((prevFilters) => {
      const updatedCategories = prevFilters.category.includes(category)
        ? prevFilters.category.filter((c) => c !== category)
        : [...prevFilters.category, category];
      return { ...prevFilters, category: updatedCategories };
    });
  };

  const applyFilters = () => {
    const selectedCategories = filters.category;
    axios
      .get("https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/products/filter", {
        params: {
          ...filters,
          maxPrice: filters.maxPrice,
          category: selectedCategories.join(","),
        },
      })
      .then((res) => {
        const filteredData = res.data.filter((product) => {
          return (
            selectedCategories.length === 0 ||
            selectedCategories.some((category) => product.category.includes(category))
          );
        });
        setData(filteredData);
        setCurrentPage(1);
      })
      .catch((err) => console.error(err));
  };

  const maxProductPrice = Math.max(...data.map((item) => item.price));

  const clearAllFilters = () => {
    setFilters({
      brand: "",
      maxPrice: "",
      category: [],
      subcategory: "",
      minRating: "",
    });;
  };

  // For Page number pagination
  function generatePageNumbers(totalPages) {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  const pageNumbers = generatePageNumbers(totalPages);

  return (
    <>
      <PageTransition>
        <div className="container mx-auto px-4">

          {/* BREADCRUMB */}
          <div className="my-6">
            <Breadcrumb>
              <Breadcrumb.Item href="/home">
                  Home
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Products
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          {/* <div>
            <button onClick={() => setShowFilter(!showFilter)}>Filter</button>
          </div> */}

          {/* Off-canvas filter */}
          {/* <div
            className={`off-canvas fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform z-10 ${
              showFilter ? "translate-x-0" : "-translate-x-full"
            } transition-transform ease-in-out duration-300`}
          >
          </div> */}

          <div className="flex">
            {/* FILTER */}
            <div className="lg:w-1/5 xl:w-1/6 hidden lg:block">
              <div className="flex justify-between items-baseline my-4">
                <p className="font-bold">Filters</p>
                <button className="text-quantum text-xs" onClick={clearAllFilters}>Clear all</button>
              </div>
              <div className="accordion">

                {/* CATEGORY FILTER */}
                <div className="accordion-item">
                  <div className="accordion-trigger cursor-pointer" onClick={() => setAccordion1Open(!isAccordion1Open)}>
                    Category
                  </div>
                  <div className={`accordion-content ${isAccordion1Open ? "hidden" : ""}`}>
                     <div className="flex items-center gap-2">
                       <input
                         type="checkbox"
                         id="mobile"
                         checked={filters.category.includes("Smartphones and Accessories")}
                         onChange={() =>
                           handleCategoryCheckbox("Smartphones and Accessories")
                         }
                       />
                       <label htmlFor="mobile">Mobile Phones</label>
                     </div>
                     <div className="flex items-center gap-2">
                       <input
                         type="checkbox"
                         id="laptops"
                         checked={filters.category.includes("Laptops and Computers")}
                         onChange={() => handleCategoryCheckbox("Laptops and Computers")}
                       />
                       <label htmlFor="laptops">Laptops & Computers</label>
                     </div>
                     <div className="flex items-center gap-2">
                       <input
                         type="checkbox"
                         id="wearables"
                         checked={filters.category.includes("Wearable Technology")}
                         onChange={() => handleCategoryCheckbox("Wearable Technology")}
                       />
                       <label htmlFor="wearables">Wearables</label>
                     </div>
                     <div className="flex items-center gap-2">
                       <input
                         type="checkbox"
                         id="audio"
                         checked={filters.category.includes("Audio and Headphones")}
                         onChange={() => handleCategoryCheckbox("Audio and Headphones")}
                       />
                       <label htmlFor="audio">Audio</label>
                     </div>
                     <div className="flex items-center gap-2">
                       <input
                         type="checkbox"
                         id="cameras"
                         checked={filters.category.includes("Camera and Photography")}
                         onChange={() => handleCategoryCheckbox("Camera and Photography")}
                       />
                       <label htmlFor="cameras">Cameras</label>
                     </div>
                     <div className="flex items-center gap-2">
                       <input
                         type="checkbox"
                         id="gaming"
                         checked={filters.category.includes("Gaming Gear")}
                         onChange={() => handleCategoryCheckbox("Gaming Gear")}
                       />
                       <label htmlFor="gaming">Gaming</label>
                     </div>
                     <div className="flex items-center gap-2">
                       <input
                         type="checkbox"
                         id="smarthome"
                         checked={filters.category.includes("Home Automation")}
                         onChange={() => handleCategoryCheckbox("Home Automation")}
                       />
                       <label htmlFor="smarthome">Home Automation</label>
                     </div>
                     <div className="flex items-center gap-2">
                       <input
                         type="checkbox"
                         id="software"
                         checked={filters.category.includes("Software and Apps")}
                         onChange={() => handleCategoryCheckbox("Software and Apps")}
                       />
                       <label htmlFor="software">Software & Apps</label>
                     </div>
                     <div className="flex items-center gap-2">
                       <input
                         type="checkbox"
                         id="tech4kids"
                         checked={filters.category.includes("Tech for Kids")}
                         onChange={() => handleCategoryCheckbox("Tech for Kids")}
                       />
                       <label htmlFor="tech4kids">Tech for Kids</label>
                     </div>
                  </div>
                </div>

                {/* PRICE FILTER */}
                <div className="accordion-item">
                  <div className="accordion-trigger cursor-pointer" onClick={() => setAccordion2Open(!isAccordion2Open)}>
                    Price
                  </div>
                  <div className={`accordion-content ${isAccordion2Open ? "hidden" : ""}`}>
                    <div>
                      <input
                        className="w-full bg-transparent"
                        type="range"
                        id="price"
                        value={filters.maxPrice}
                        max={maxProductPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                      />
                      <div className="flex w-full items-center gap-x-2 overflow-hidden">
                        <label className="min-w-fit" htmlFor="maxPrice">Max Price: </label>
                        <div className="w-full flex items-center bg-white px-2">&#8369;&nbsp;
                          <input
                          className="w-full border-none focus:ring-0 bg-transparent"
                          type="number"
                          id="maxPrice"
                          value={filters.maxPrice}
                          onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                        />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <button onClick={applyFilters}>Apply Filters</button>

            </div>

            {/* PRODUCTS */}
            <div className="w-full lg:w-4/5 xl:w-5/6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-4">
              {/* PRODUCT ITEMS */}

              {paginatedData.map((item, i) => (
              
                <motion.div
                  key={i}
                  className="aspect-square m-3 group transition relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 1,
                  }}
                  onMouseEnter={() => setHoveredItem(i)} onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="p-4">
                    <Link to={`${item.id}`}>
                      <div className="relative">
                        <img src={item.image[0]} className="absolute inset-0 rounded-lg"
                          style={{
                            transform: hoveredItem === i ? 'scale(1.1)' : 'scale(1)',
                            transition: 'transform 0.5s ease-in',
                          }}/>
                        <img
                          className="rounded-lg shadow"
                          src={hoveredItem === i ? item.image[1] : item.image[0]}
                          alt={item.title}
                          style={{
                            transform: hoveredItem === i ? 'scale(1.1)' : 'scale(1)',
                            opacity: hoveredItem === i ? 1 : 0.8,
                            transition: 'transform 0.5s ease-in, opacity 0.3s ease-in',
                          }}
                        />
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link to={`${item.id}`}>
                      <p className="truncate heading font-medium">{item.title}</p>
                    </Link>
                    <p className="text-sm text-dark-quantum mb-2">{item.brand}</p>
                    <div className="flex items-center justify-between py-2 opacity-100 group-hover:opacity-0 transition-all duration-200">
                      <p className="font-semibold">{formatter.format(item.price)}</p>
                      <div className="bg-quantum flex gap-1 py-1 px-2 rounded-md">
                        <img src={star} alt="image" className="w-5 h-5" />
                        <p className="text-white font-bold">{item.rating.rate}</p>
                      </div>
                    </div>

                    {/* ADD TO CART */}
                    <div className="absolute bottom-0 left-[-10px] group-hover:left-0 border-sky-300 rounded-lg border-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <button
                        className="flex gap-2 p-3 font-semibold"
                        onClick={() =>
                          addToCart({
                            title: item.title,
                            price: item.price,
                            image: item.image[0],
                            quantity: 1,
                          })
                        }
                      >
                        <img src={cart} alt="image" /> Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className=" mt-[90px] flex gap-2 justify-center">
            {canGoPrevious && (
              <button
                onClick={() => handleChangePage(currentPage - 1)}
                className="border-2 border-gray-400 rounded-full px-3 py-2 hover:bg-black hover:text-white"
              >
                <FiArrowLeft />
              </button>
            )}
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handleChangePage(number)}
                className={
                  number === currentPage
                    ? "px-4 py-2 bg-black text-white rounded-full border-2"
                    : "border-gray-400 px-4 py-2 hover:bg-black hover:text-white rounded-full border-2 "
                }
              >
                {number}
              </button>
            ))}
            {canGoNext && (
              <button
                onClick={() => handleChangePage(currentPage + 1)}
                className="border-2 border-gray-400 rounded-full px-3 py-2 hover:bg-black hover:text-white"
              >
                <FiArrowRight />
              </button>
            )}
          </div>

        </div>

      </PageTransition>
    </>
  );
}
