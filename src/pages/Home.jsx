import React, { useEffect, useState } from "react";
import phone1 from "../assets/phone1.svg";
import phone2 from "../assets/phone2.svg";
import phone3 from "../assets/phone3.svg";
import shape from "../assets/figma-shape.svg";
import axios from "axios";
import { motion } from "framer-motion";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5; // Number of items per page
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();

    axios
      .get("https://d6fq7jdbk9.execute-api.us-east-1.amazonaws.com/dev/gadgets")
      .then((res) => {
        const limitedData = res.data.slice(0, 20); // Limit data to 20 items
        setData(limitedData);
        setLoading(false);
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
      <div className="bg-gray-900 rounded-lg mx-12 md:mx-20 lg:mx-40 mt-10">
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
              {loading ? (
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
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
              )}
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
    </>
  );
}
