import React, { useEffect, useState } from "react";
import phone1 from "../assets/phone1.svg";
import phone2 from "../assets/phone2.svg";
import phone3 from "../assets/phone3.svg";
import shape from "../assets/figma-shape.svg";
import axios from "axios";
import { motion } from "framer-motion";
import HomeNewProduct from "./HomeNewProduct";

export default function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5; // Number of items per page
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("https://d6fq7jdbk9.execute-api.us-east-1.amazonaws.com/dev/gadgets")
      .then((res) => {
        const limitedData = res.data.slice(0, 20); // Limit data to 20 items
        setData(limitedData);
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
      {/* Banner */}
      <div className="mx-5 mt-10">
        <div className="bg-zinc-800 rounded-[25px] flex flex-col md:flex-row justify-around items-center">
          <div className="text  md:text-left">
            <div className="text-center text-quantum  font-semibold font-['Inter'] pt-5">
              <span className="text-3xl md:text-4xl lg:text-5xl">
                Quantum Store
              </span>
              <div className=" text-center mt-5">
                <span className="text-blue-200 text-[20px] md:text-[26px] lg:text-[32px] font-medium font-['Inter']">
                  “Join us where gadgets takes you
                </span>
                <span className="text-quantum text-[20px] md:text-[26px] lg:text-[32px] font-medium font-['Inter']">
                  beyond limits
                </span>
                <span className="text-blue-200 text-[20px] md:text-[26px] lg:text-[32px] font-medium font-['Inter']">
                  ”
                </span>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <motion.button
                className="text-center text-neutral-100 text-lg md:text-xl font-medium font-['Inter'] leading-7 w-72 h-14 px-4 py-2 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-600 rounded-lg"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Explore More
              </motion.button>
            </div>
          </div>
          <div className="image relative md:mt-0 mt-11">
            <div className="">
              {/* Animation of phone hovering to air */}
              <motion.img
                className=" absolute left-[-90px] rounded-[1px] lg:left-[-250px]"
                src={phone1}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: [0, 10, 0], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.img
                className=" absolute top-[-40px] left-[-30px] lg:left-[-110px]"
                src={phone2}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: [0, 20, 0], opacity: [1, 1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <img className="" src={phone3} />
            </div>
          </div>
        </div>
      </div>

      {/* On Sale Cards */}
      <div className="bg-gray-900 rounded-lg mx-12 md:mx-20 lg:mx-40 mt-10 mb-20">
        <div className=" relative text-center text-neutral-100 text-[32px] font-medium font-['Poppins'] lg:flex">
          <img src={shape} />
          <span className="absolute top-[40px] left-[50px] md:top-[85px] md:left-[200px] lg:top-[120px] lg:left-[100px]  text-xl md:text-2xl lg:text-3xl">
            Quantum Products
            <br /> On Sale
          </span>
          <button className="absolute top-[120px] left-[120px] text-sm md:top-[200px] lg:top-[270px] md:left-[290px] lg:left-[210px]">
            View all
          </button>

          {/* Carousel Cards */}
          <div className="card">
            <div className="container">
              <div className="space-x-1 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:ms-10 lg:ms-[-10px] ms-1">
                {paginatedData.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-3 w-24 md:w-20 lg:w-52 mt-14"
                  >
                    {/* Render your card content here */}
                    <img src={item.image[0]} />
                    <p className=" text-black text-xs md:text-base lg:text-lg">
                      {item.brand}
                    </p>
                    <p className=" text-black text-xs text-left md:text-base lg:text-lg">
                      {formatter.format(item.price)}
                    </p>
                  </div>
                ))}
              </div>
              {/* Arrows */}
              <div className="mt-4 flex justify-center items-center space-x-4">
                <button
                  onClick={() =>
                    canGoPrevious && handleChangePage(currentPage - 1)
                  }
                  className={`px-3 py-1 ${
                    !canGoPrevious && "cursor-not-allowed"
                  }`}
                >
                  <span className="text-xl">←</span>
                </button>
                <button
                  onClick={() => canGoNext && handleChangePage(currentPage + 1)}
                  className={`px-3 py-1 ${!canGoNext && "cursor-not-allowed"}`}
                >
                  <span className="text-xl">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Product */}
      <div className=" ">
        <div className=" h-[0px]  shadow border border-zinc-500"></div>
        <div className="w-[239px] h-[32.66px] px-[92px] py-[7px]  bg-neutral-100 border border-zinc-500 ">
          <div className="w-[155px] h-[13px] text-center text-black text-[12px] font-medium font-['Poppins']">
            New Products
          </div>
        </div>
        <div className="">
          <HomeNewProduct />
        </div>
      </div>
    </>
  );
}
