import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTransition from "../PageTransition";
import { Breadcrumb } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function NewsPage() {
  const { id } = useParams();
  const [news, setNews] = useState({ content: "" });

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/news/${id}`
      )
      .then((res) => setNews(res.data.news))
      .catch((err) => console.error(err));
    return controller.abort();
  }, []);

  return (
    <>
      <PageTransition>
        <div className="container mx-auto px-4">
          {/* BREADCRUMB */}
          <div className="my-6">
            <Breadcrumb className="truncate">
              <Breadcrumb.Item>
                <Link to="/home" className="text-gray-700">
                  Home
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/blogs" className="text-gray-700">
                  Blogs
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {news.title && <p className="truncate">{news.title}</p>}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: "easeInOut",
              duration: 1,
            }}
          >
            <div className="flex flex-wrap justify-center">
              {
                <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
                  <div className="flex flex-wrap md:flex-nowrap gap-x-10 mb-10">
                    <div className="w-full">
                      {news.url_image && (
                        <img className="mb-8" src={news.url_image} />
                      )}
                      {news.title && (
                        <h2 className="heading text-xl text-dark-quantum font-semibold my-2">
                          {news.title}
                        </h2>
                      )}
                      <p className="text-base my-1">
                        {" "}
                        by{" "}
                        {news.author && (
                          <span className="font-semibold">{news.author}</span>
                        )}
                      </p>
                      {news.published_at && (
                        <span className="text-base my-1 italic">
                          {dayjs(news.published_at).format("YYYY-MM-DD")}
                        </span>
                      )}
                      {news.source && (
                        <p className="text-sm my-1 text-quantum">
                          {news.source}
                        </p>
                      )}
                      <ReactMarkdown
                        className="text-justify my-4"
                        rehypePlugins={[rehypeRaw]}
                      >
                        {news.content}
                      </ReactMarkdown>
                      <p className="my-10 italic">
                        For gadgets and electronics, get it at&nbsp;
                        <Link to="/home">
                          <span className="text-quantum hover:text-dark-quantum cursor-pointer">
                            QuantumGalaxy
                          </span>
                        </Link>
                        !
                      </p>
                    </div>
                  </div>
                </div>
              }
            </div>
          </motion.div>
        </AnimatePresence>
      </PageTransition>
    </>
  );
}
