import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../PageTransition";
import { BsEyeFill } from "react-icons/bs";
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

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 24;

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
        <div className=" rounded-md mt-10 flex lg:mx-[150px]">
          {/* Filter */}
          <div className=" hidden lg:block w-[500px] mt-5 ">
            <h3 className="mx-3">Filter</h3>
            <div className="h-[1px] border border-gray-400 mx-3"></div>
          </div>

          {/* Products */}
          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:me-[40px]">
            {paginatedData.map((item, i) => (
              // Products Details
              <motion.div
                key={i}
                className=" aspect-square m-3 group transition relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  ease: "easeInOut",
                  duration: 1,
                }}
              >
                {/* Image */}
                <div className=" flex gap-3 items-center">
                  <img
                    src={item.image[0]}
                    alt="image"
                    className=" mx-auto my-1 group-hover:scale-110 transition duration-200 mb-3 pt-8 mt-[30px] shadow-lg  "
                  />
                </div>

                {/* Buttons */}
                <div className="absolute bottom-0 left-[-150px] group-hover:left-0 border-sky-300 rounded-lg border-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <button
                    className="flex gap-2 p-3 font-bold"
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

                {/* View */}
                <div className=" bg-sky-300/40 w-[50px] h-[50px] rounded-lg absolute top-[-60px] right-0 group-hover:top-0 opacity-0 group-hover:opacity-100 flex items-center justify-end transition-all duration-200 lg:top-0 lg:right-[-50px] lg:group-hover:right-0">
                  <Link
                    to={`${item.id}`}
                    className="w-[35px] h-[35px] bg-white flex items-center justify-center me-2 rounded-md"
                  >
                    <BsEyeFill className="w-[20px] h-[20px]" />
                  </Link>
                </div>

                {/* Product Details */}
                <div className="mx-4 lg:h-[150px]">
                  <p className="truncate mx-3 mt-[10px] text-[18px] font-semibold">
                    {item.title}
                  </p>
                  <p className=" mb-[60px] mx-3 mt-2 text-xs md:text-lg">
                    {item.category}
                  </p>
                  <p className="mx-3 group-hover:hidden text-left transition-all duration-200 text-[17px] font-semibold">
                    {formatter.format(item.price)}
                  </p>

                  {/* Ratings */}
                  <div className="border bg-quantum rounded-lg flex gap-0 px-4 w-[55px] h-[35px] items-center justify-center absolute bottom-[-40px] left-4 group-hover:hidden md:bottom-0 md:left-[170px] lg:left-[260px]">
                    <img src={star} alt="image" className="w-[20px] h-[20px]" />

                    <p className="text-white font-bold">{item.rating.rate}</p>
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
      </PageTransition>
    </>
  );
}
