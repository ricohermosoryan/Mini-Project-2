import React, { useEffect, useState } from "react";
import news from "../../assets/news.svg";
import PageTransition from "../PageTransition";
import axios from "axios";
import dayjs from "dayjs";
import newsIcon from "../../assets/newsicon.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import newsBanner from "../../assets/news_1.svg";

export default function News() {
  const [news, setNews] = useState([]);

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
      .get("https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/news")
      .then((res) => {
        setNews(res.data.news);
      })
      .catch((err) => console.error(err));
    return controller.abort();
  }, []);

  return (
    <>
      <PageTransition>
        {/* BREADCRUMB */}
        <div className="container mx-auto px-4">
          <div className="my-6">
            <Breadcrumb className="truncate">
              <Breadcrumb.Item>
                <Link to="/home" className="text-gray-700">
                  Home
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>News</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        {/* BANNER */}
        <div className="w-full relative">
          <img src={newsBanner} className="w-full object-cover" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="heading text-2xl lg:text-3xl xl:text-4xl text-white text-center whitespace-nowrap">
              NEWS
            </h1>
            <div className="h-1 w-12 lg:w-14 xl:w-16 bg-white mx-auto my-1"></div>
          </div>
        </div>

        {/* HOT TOPIC */}
        <div className="container mx-auto px-4 mt-8 flex items-center">
          <div className="border border-quantum grow h-px"></div>
          <h2 className="heading text-xl text-dark-quantum max-w-fit p-2">
            Hot Topic
          </h2>
          <div className="border border-quantum grow-[8] h-px"></div>
        </div>

        <motion.div
          className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 my-2 flex gap-x-4 justify-around"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
        >
          {news.length > 0 && (
            <div className="flex flex-wrap w-full my-4">
              <Link
                to={`${news[news.length - 1].url}`}
                target="_blank"
                className="w-full aspect-[2/1] md:w-2/5 lg:h-full shadow"
              >
                <img
                  src={news[news.length - 1].url_image}
                  className="h-full object-cover w-full"
                />
              </Link>
              <div className="w-full md:w-3/5 shadow">
                <Link to={`${news[news.length - 1].url}`} target="_blank">
                  <p className="mx-3 mt-2 heading text-lg font-medium">
                    {news[news.length - 1].title}
                  </p>
                </Link>
                <p className="mx-3 text-sm italic">
                  on{" "}
                  {dayjs(news[news.length - 1].publishedAt).format(
                    "YYYY-MM-DD"
                  )}{" "}
                  by {news[news.length - 1].author}
                </p>
                <p className="mx-3 text-xs">&nbsp;</p>
                <p className="mx-3 my-2 text-base paragraph-truncate">
                  {news[news.length - 1].content}
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* LATEST NEWS */}
        <div className="container mx-auto px-4 mt-8 flex items-center">
          <div className="border border-quantum grow h-px"></div>
          <h2 className="heading text-xl text-dark-quantum max-w-fit p-2">
            Latest News
          </h2>
          <div className="border border-quantum grow-[8] h-px"></div>
        </div>

        <motion.div
          className="container mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
        >
          <div className="mx-auto sm:px-4 md:px-8 lg:px-12 my-2 flex flex-row flex-wrap">
            {news
              .slice(0, news.length - 1)
              .reverse()
              .slice(0, 10)
              .map((item, i) => (
                <div
                  key={i}
                  className="flex flex-wrap w-full xl:w-1/2 my-4 px-4"
                >
                  <Link
                    to={`${item.url}`}
                    target="_blank"
                    className="w-full aspect-[2/1] md:w-2/5 lg:h-full shadow "
                  >
                    <img
                      src={item.url_image}
                      className="h-full object-cover w-full"
                    />
                  </Link>
                  <div className="w-full md:w-3/5 shadow ">
                    <Link to={`${item.url}`} target="_blank">
                      <p className="truncate mx-3 mt-2 heading text-lg font-medium">
                        {item.title}
                      </p>
                    </Link>
                    <p className="truncate mx-3 text-sm italic">
                      on {dayjs(item.publishedAt).format("YYYY-MM-DD")} by{" "}
                      {item.author}
                    </p>
                    <p className="truncate mx-3 text-xs">&nbsp;</p>
                    <p className="mx-3 my-2 text-base paragraph-truncate">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </PageTransition>
    </>
  );
}
