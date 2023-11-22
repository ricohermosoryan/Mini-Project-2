import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rating } from "flowbite-react";
import { shuffle } from "lodash";

export default function HomeNewProduct() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4; // Number of items per page
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(
        "https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products"
      )
      .then((res) => {
        // Filter products with a discount greater than 0
        const filteredData = res.data.products.filter((product) => product.discount > 0);
        // Limit filtered data to 20 items
        const limitedData = filteredData.slice(0, 20);
        const shuffledData = shuffle(limitedData);
        setData(shuffledData);
      })
      .catch((err) => console.error(err));

    return () => controller.abort();
  }, []);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });
  
  return (
    <>
      <div className="w-full flex flex-col justify-end items-center">
        <div className="w-full grid grid-cols-2 md:grid-cols-4 mx-4 bg-neutral-100 rounded-lg">
          {paginatedData.slice(0, 4).map((item, i) => (
            <motion.div
              key={i}
              className="aspect-square mx-3 group transition relative"
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
                <Link to={`/products/${item._id}`}>
                  <div className="relative">
                    <img src={item.image[0]} className="absolute inset-0 rounded-lg"
                      style={{
                        transform: hoveredItem === i ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.5s ease-in',
                      }}/>
                    <img
                      className="rounded-lg shadow"
                      src={hoveredItem === i ? item.image[1] : item.image[0]}
                      alt={item.name}
                      style={{
                        transform: hoveredItem === i ? 'scale(1.1)' : 'scale(1)',
                        opacity: hoveredItem === i ? 1 : 0.8,
                        transition: 'transform 0.5s ease-in, opacity 0.3s ease-in',
                      }}
                    />
                    {item.discount > 0 && (
                      <div className="absolute top-1 left-1 bg-quantum text-white font-bold text-sm text-center leading-none rounded-full p-1">{item.discount*100}%<br />OFF</div>
                    )}
                  </div>
                </Link>
              </div>
              <div>
                <Link to={`/products/${item._id}`}>
                  <p className="truncate heading font-medium">{item.name}</p>
                </Link>
                <p className="text-sm text-dark-quantum mb-2">{item.brand}</p>
                <div className="flex items-center justify-between py-2 transition-all duration-200">
                  <p className="font-semibold">{formatter.format(item.price-(item.price*item.discount))}</p>
                  <div className="flex gap-x-4 my-2">
                    <Rating className="my-auto">
                      <Rating.Star className="text-quantum"/>
                      {item.rating && <p className="text-sm ml-0.5 font-bold ">{item.rating.rate.toFixed(2)}</p>}
                    </Rating>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex w-full overflow-x-auto justify-end mt-4">
          <nav className="">
            <ul className="xs:mt-0 mt-2 inline-flex items-center -space-x-px">
              <li>
                <button type="button" onClick={() => canGoPrevious && handleChangePage(currentPage - 1)} className={`${!canGoPrevious && "cursor-not-allowed"} rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white inline-flex`} >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => canGoNext && handleChangePage(currentPage + 1)} className={`${!canGoNext && "cursor-not-allowed"
                  } rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white inline-flex`} >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
