import React, { useState, useEffect } from "react";
import searchImage from "../assets/search.svg";
import { useCycle, motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Link } from "react-router-dom";

export default function Search() {
  const [search, setSearch] = useCycle(false, true);

  const navbarIcons = [{ name: "Search", icon: searchImage }];

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    localStorage.setItem("searchQuery", searchQuery);
    const response = await fetch(
      `https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/products/search?query=${searchQuery}`
    );
    const data = await response.json();
    setSearchResults(data);
  };

  // Only show first 3 results
  const displayedResults = window.innerWidth < 1024 ? searchResults.slice(0, 2) : searchResults.slice(0, 3);

  return (
    <>
      <div>
        <motion.img
          src={navbarIcons[0].icon}
          className="w-10 aspect-square cursor-pointer"
          alt={navbarIcons[0].name}
          animate={search ? "open" : "closed"}
          onClick={() => setSearch()}
        ></motion.img>
      </div>
      <AnimatePresence>
        {search && (
          <MotionConfig
            transition={{
              type: "spring",
              bounce: 0.25,
            }}
          >
            <motion.div
              className="fixed top-[60px] inset-0 h-[50px] md:top-[100px] max-w-4xl mx-auto"
              variants={{
                open: {
                  y: "70%",
                  transition: {
                    type: "spring",
                    bounce: 0.35,
                  },
                },
                closed: {
                  y: "-1400%",
                  transition: {
                    type: "spring",
                    bounce: 0.25,
                  },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="border rounded-t-lg flex">
                <input
                  type="text"
                  id="input-group-1"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="bg-gray-50 border-gray-300 text-gray-900 text-sm  block w-full p-2.5 border-none outline-none focus:ring-0 focus:border-none"
                  placeholder="Search for products"
                />
                <button
                  type="submit"
                  className=" bg-white"
                  onClick={handleSearch}
                >
                  <img src={searchImage} alt="image" />
                </button>
              </div>

              <div className="border bg-white p-4 rounded-b-lg grid grid-cols-2 lg:grid-cols-3 justify-center mx-auto">
                {displayedResults.map((product) => (
                  <div key={product.id} className="my-4 lg:px-6 px-4">
                    <div>
                      <Link to={`products/${product.id}`}>
                        <p className=" flex justify-center">
                          <img
                            src={product.image[0]}
                            alt="image"
                            className="w-40 aspect-square"
                          />
                        </p>

                        <p className="heading hover:text-quantum sentence-truncate">
                          {product.title}
                        </p>
                      </Link>
                      <p className="text-sm sentence-truncate">
                        <span className="text-dark-quantum">{product.brand}</span> | {product.category}
                      </p>
                    </div>
                  </div>
                ))}

                {searchResults.length > 3 && (
                  <Link
                    to={{
                      pathname: "/search",
                      state: {
                        searchQuery,
                        searchResults,
                      },
                    }}
                    className="mt-4 col-span-3 flex justify-center text-sm text-quantum hover:text-dark-quantum"
                  >
                    <button>View More</button>
                  </Link>
                )}
              </div>
            </motion.div>
          </MotionConfig>
        )}
      </AnimatePresence>
    </>
  );
}
