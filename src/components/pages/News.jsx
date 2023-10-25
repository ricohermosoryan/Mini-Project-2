import React, { useEffect, useState } from "react";
import news from "../../assets/news.svg";
import PageTransition from "../PageTransition";
import axios from "axios";
import dayjs from "dayjs";
import newsIcon from "../../assets/newsicon.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function News() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=09ec3da0970a4c6ba2fb492c17461e4d"
      )
      .then((res) => {
        const limitedData = res.data.articles.slice(0, 1);
        setData(limitedData);
      })
      .catch((err) => console.error(err));

    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=09ec3da0970a4c6ba2fb492c17461e4d"
      )
      .then((res) => {
        const limitedData = res.data.articles.slice(0, 10);
        setData1(limitedData);
      })
      .catch((err) => console.error(err));

    return controller.abort();
  }, []);

  return (
    <>
      <PageTransition>
        <div className="banner">
          <img
            src={news}
            alt="image"
            className="lg:w-screen lg:h-[400px] lg:object-cover"
          />
        </div>
        <div className="text-zinc-700 text-[22px] font-bold text-center mt-8 md:text-[30px]">
          Quantum Galaxy Tech News
        </div>
        <div className=" text-center text-zinc-700 text-[18px] font-medium mt-5 mx-5 md:text-[24px] lg:mx-[150px]">
          Welcome to the Quantum Galaxy Tech News page, your portal to the
          latest and most exciting developments in the world of technology. From
          groundbreaking innovations to cosmic discoveries, we've got you
          covered. Explore the quantum leaps in tech with us.
        </div>
        <div className=" mx-5 lg:mx-24 mt-10 md:mt-14 lg:mt-[90px]">
          <div className=" h-[0px]  shadow border border-zinc-500"></div>
          <div className="w-[139px] h-[32.66px] px-[92px] py-[7px]  bg-neutral-100 border border-zinc-500 mt-[-18px] ms-[77px] md:ms-[238px] md:w-[240px] md:h-[40px] md:mt-[-20px] lg:ms-[740px] lg:w-[300px] lg:h-[50px] lg:mt-[-26px]">
            <div className="w-[155px] h-[13px] text-center text-black text-[20px] font-bold my-[-6px]  ms-[-80px] md:text-[24px] md:ms-[-50px] lg:text-[28px] lg:w-[200px] lg:mt-[-3px] lg:ms-[-43px]">
              Hot Topics
            </div>
          </div>

          <motion.div
            className="mb-[70px] mt-[20px] md:mt-[40px] lg:mt-[70px] lg:mx-[300px] lg:flex lg:justify-center md:flex md:justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: "easeInOut",
              duration: 1,
            }}
          >
            <div className="text-center text-black text-[22px] font-medium pt-5 md:font-semibold md:text-[27px] lg:text-[40px]">
              {data.map((item, i) => (
                <div key={i}>
                  <div className=" lg:flex lg:gap-5">
                    <div className="lg:w-[1330px] lg:h-[400px]">
                      <a href={item.url} target="_blank">
                        <img
                          src={item.urlToImage}
                          alt="No Image"
                          className=" object-cover"
                        />
                      </a>
                    </div>
                    <div className="text-left">
                      <span className="flex text-[17px] lg:pb-[20px] lg:pt-3">
                        <img src={newsIcon} alt="img" />{" "}
                        {dayjs(item.publishedAt).format("MMM DD, YYYY")}
                      </span>
                      <h2 className="lg:pb-5 lg:text-[25px]">{item.title}</h2>
                      <p className=" lg:text-[20px] lg:pb-[15px]">
                        {item.description}
                      </p>
                      <div className="border border-gray-400 h-[1px] mt-3 mb-5"></div>
                      <div className="flex justify-between items-center lg:justify-around">
                        <p className="lg:text-[18px]">{item.author}</p>
                        <a href={item.url} target="_blank">
                          <button className=" bg-slate-600 rounded-lg px-6 py-3 text-white lg:px-5 lg:py-2 lg:text-[23px]">
                            Read More
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className=" h-[0px]  shadow border border-zinc-500"></div>
          <div className="w-[139px] h-[32.66px] px-[92px] py-[7px]  bg-neutral-100 border border-zinc-500 mt-[-18px] ms-[77px] md:ms-[238px] md:w-[240px] md:h-[40px] md:mt-[-20px] lg:ms-[740px] lg:w-[300px] lg:h-[50px] lg:mt-[-26px]">
            <div className="w-[155px] h-[13px] text-center text-black text-[20px] font-bold my-[-6px]  ms-[-80px] md:text-[24px] md:ms-[-50px] lg:text-[28px] lg:w-[200px] lg:mt-[-3px] lg:ms-[-43px]">
              Latest News
            </div>
          </div>

          <motion.div
            className="mt-[30px] grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: "easeInOut",
              duration: 1,
            }}
          >
            {data1.map((item, i) => (
              <div key={i} className=" shadow-lg rounded-lg">
                <a href={item.url} target="_blank">
                  <img
                    src={item.urlToImage}
                    alt="No Image"
                    className=" object-cover h-[100px] lg:w-[340px] lg:h-[200px]"
                  />

                  <div className="h-[100px]">
                    <h6 className="text-[13px] pt-[10px] lg:text-[18px]">
                      {item.title}
                    </h6>
                  </div>
                </a>
                <span className="flex text-[13px] mt-3 py-5">
                  <img src={newsIcon} alt="img" className="h-[17px] w-[17px]" />{" "}
                  {dayjs(item.publishedAt).format("MMM DD, YYYY")}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </PageTransition>
    </>
  );
}
