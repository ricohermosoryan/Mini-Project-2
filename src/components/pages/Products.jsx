"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../PageTransition";
import { Breadcrumb, Rating, Pagination } from "flowbite-react";
import cart from "../../assets/cart.svg";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import ProductFilter from "../ProductFilter";
import filterImage from "../../assets/filter.svg";
import closeButtonImage from "../../assets/xmark.svg";
import { shuffle } from "lodash";

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export default function Products() {
  // Cart Items
  const { addToCart } = useContext(CartContext);

  const [data, setData] = useState([]);

  const [hoveredItem, setHoveredItem] = useState(null);

  const [filters, setFilters] = useState({
    brand: [],
    maxPrice: "",
    category: [],
    subcategory: "",
    minRating: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 24;

  const [showFilter, setShowFilter] = useState(false);

  // Sorting state
  const [sortType, setSortType] = useState("none"); // Default is no sorting
  const sortFunctions = {
    none: (a, b) => 0,
    priceAsc: (a, b) => a.price - b.price,
    priceDesc: (a, b) => b.price - a.price,
    ratingAsc: (a, b) => a.rating.rate - b.rating.rate,
    ratingDesc: (a, b) => b.rating.rate - a.rating.rate,
  };

  useEffect(() => {
    const scrollPosition = window.scrollY;

    // Set the scroll position based on the condition
    if (scrollPosition === 0) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 48);
    }
    const controller = new AbortController();
    axios
      .get(
        "https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products"
      )
      .then((res) => {
        const shuffledData = shuffle(res.data.products); // Shuffle the data array
        setData(shuffledData);
      })
      .catch((err) => console.error(err));
    return controller.abort();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Apply sorting
  const sortedData = [...data].sort(sortFunctions[sortType]);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Run applyFilters whenever filters change
    applyFilters();
  }, [filters]);

  const handleCategoryCheckbox = (category) => {
    setFilters((prevFilters) => {
      const updatedCategories = prevFilters.category.includes(category)
        ? prevFilters.category.filter((c) => c !== category)
        : [...prevFilters.category, category];
      return { ...prevFilters, category: updatedCategories };
    });
  };

  const handleBrandCheckbox = (brand) => {
    setFilters((prevFilters) => {
      const updatedBrands = prevFilters.brand.includes(brand)
        ? prevFilters.brand.filter((c) => c !== brand)
        : [...prevFilters.brand, brand];
      return { ...prevFilters, brand: updatedBrands };
    });
  };

  const applyFilters = () => {
    const selectedCategories = filters.category;
    const selectedBrands = filters.brand;
    axios
      .get(
        "https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products/filter",
        {
          params: {
            ...filters,
            maxPrice: filters.maxPrice,
            category: selectedCategories.map(encodeURIComponent).join(","),
            brand: selectedBrands.map(encodeURIComponent).join(","),
          },
        }
      )
      .then((res) => {
        const filteredData = shuffle(res.data.results).filter((product) => {
          return (
            selectedCategories.length === 0 ||
            selectedCategories.some((category) =>
              product.category.includes(category)
            )
          );
        });
        setData(filteredData);
        setCurrentPage(1);
      })
      .catch((err) => console.error(err));
  };

  const clearAllFilters = () => {
    setFilters({
      brand: [],
      maxPrice: "",
      category: [],
      subcategory: "",
      minRating: "",
    });
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
              <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
              <Breadcrumb.Item>Products</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="flex justify-end gap-x-2">
            {/* Sort dropdown */}
            <div>
              <select
                className="text-sm bg-transparent text-dark-quantum cursor-pointer hover:text-quantum focus:border-transparent border-transparent ring-0 focus:ring-0"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option className="text-sm" value="none">
                  Sort by
                </option>
                <option className="text-sm" value="priceAsc">
                  Price - Low to High
                </option>
                <option className="text-sm" value="priceDesc">
                  Price - High to Low
                </option>
                <option className="text-sm" value="ratingAsc">
                  Rating - Low to High
                </option>
                <option className="text-sm" value="ratingDesc">
                  Rating - High to Low
                </option>
              </select>
            </div>

            {/* Filter button */}
            <div className="flex">
              <div
                className="lg:hidden cursor-pointer text-sm flex gap-x-2 items-center text-dark-quantum hover:text-quantum"
                onClick={() => setShowFilter(!showFilter)}
              >
                Filter{" "}
                <img src={filterImage} className="w-4 h-4 aspect-square" />
              </div>
            </div>
          </div>

          {/* Off-canvas filter */}
          <div
            className={`off-canvas fixed inset-y-0 left-0 w-80 bg-white shadow-lg transform z-10 p-4 overflow-y-scroll ${
              showFilter ? "translate-x-0" : "-translate-x-full"
            } transition-transform ease-in-out duration-300`}
          >
            <div className="flex justify-end">
              <img
                src={closeButtonImage}
                className="w-4 h-4 aspect-square cursor-pointer"
                onClick={() => setShowFilter(!showFilter)}
              />
            </div>
            <ProductFilter
              data={data}
              filters={filters}
              setFilters={setFilters}
              handleCategoryCheckbox={handleCategoryCheckbox}
              handleBrandCheckbox={handleBrandCheckbox}
              applyFilters={applyFilters}
              clearAllFilters={clearAllFilters}
            />
          </div>

          <div className="flex">
            {/* FILTER */}
            <div className="lg:w-1/5 xl:w-1/6 hidden lg:block">
              <ProductFilter
                data={data}
                filters={filters}
                setFilters={setFilters}
                handleCategoryCheckbox={handleCategoryCheckbox}
                handleBrandCheckbox={handleBrandCheckbox}
                applyFilters={applyFilters}
                clearAllFilters={clearAllFilters}
              />
            </div>

            {/* PRODUCTS */}
            <div className="w-full lg:w-4/5 xl:w-5/6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:mx-4 mx-1">
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
                  onMouseEnter={() => setHoveredItem(i)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="p-4">
                    <Link to={`${item._id}`}>
                      <div className="relative">
                        <img
                          src={item.image[0]}
                          className="absolute inset-0 rounded-lg"
                          style={{
                            transform:
                              hoveredItem === i ? "scale(1.1)" : "scale(1)",
                            transition: "transform 0.5s ease-in",
                          }}
                        />
                        <img
                          className="rounded-lg shadow"
                          src={
                            hoveredItem === i ? item.image[1] : item.image[0]
                          }
                          alt={item.name}
                          style={{
                            transform:
                              hoveredItem === i ? "scale(1.1)" : "scale(1)",
                            opacity: hoveredItem === i ? 1 : 0.8,
                            transition:
                              "transform 0.5s ease-in, opacity 0.3s ease-in",
                          }}
                        />
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link to={`${item._id}`}>
                      <p className="truncate heading font-medium">
                        {item.name}
                      </p>
                    </Link>
                    <p className="text-sm text-dark-quantum mb-2">
                      {item.brand}
                    </p>
                    <div className="flex items-center justify-between py-2 opacity-100 group-hover:opacity-0 transition-all duration-200">
                      <p className="font-semibold">
                        {formatter.format(item.price)}
                      </p>
                      <div className="flex gap-x-4 my-2">
                        <Rating className="my-auto">
                          <Rating.Star className="text-quantum" />
                          {item.rating && (
                            <p className="text-sm ml-0.5 font-bold ">
                              {item.rating.rate.toFixed(2)}
                            </p>
                          )}
                        </Rating>
                      </div>
                    </div>

                    {/* ADD TO CART */}
                    <div className="absolute bottom-0 left-[-10px] group-hover:left-0 border-sky-300 rounded-lg border-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <button
                        className="flex gap-2 p-3 font-semibold"
                        onClick={() =>
                          addToCart({
                            name: item.name,
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

          <div className="overflow-x-auto justify-center hidden sm:flex mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={pageNumbers.length}
              onPageChange={onPageChange}
              showIcons
            />
          </div>

          <div className="flex overflow-x-auto justify-center sm:hidden mt-10">
            <Pagination
              layout="navigation"
              currentPage={currentPage}
              totalPages={pageNumbers.length}
              onPageChange={onPageChange}
              showIcons
            />
          </div>
        </div>
      </PageTransition>
    </>
  );
}
