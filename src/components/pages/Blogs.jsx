import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import blogs1 from "../../assets/blogs.svg";
import PageTransition from "../PageTransition";
import { motion } from "framer-motion";
import { Breadcrumb } from "flowbite-react";
import blogsBanner from "../../assets/blogs_1.svg";
import dayjs from "dayjs";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        "https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/blogs"
      )
      .then((res) => {
        setBlogs(res.data);
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
                  <Link to="/home" className="text-gray-700">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Blogs
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        {/* BANNER */}
        <div className="w-full relative">
          <img src={blogsBanner} className="w-full object-cover" />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 heading text-2xl text-white text-center">Blogs</h1>
        </div>

        {/* FEATURED ARTICLE */}
        <div className="container mx-auto px-4 mt-8 flex items-center">
          <div className="border border-quantum grow h-px"></div>
          <h2 className="heading text-xl text-dark-quantum max-w-fit p-2">Featured Article</h2>
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
          {blogs.length > 0 && (
            <div className="flex flex-wrap w-full my-4">
              <Link to={`${blogs[blogs.length-1].id}`} className="w-full md:w-2/5 lg:h-full shadow">
                <img src={blogs[blogs.length-1].image} className="h-full object-cover" />
              </Link>
              <div className="w-full md:w-3/5 shadow">
                <Link to={`${blogs[blogs.length-1].id}`}>
                  <p className="mx-3 mt-2 heading text-lg font-medium">
                    {blogs[blogs.length-1].title}
                  </p>
                </Link>
                <p className="mx-3 text-sm italic">
                  on {dayjs(blogs[blogs.length - 1].date_published).format("YYYY-MM-DD")} by {blogs[blogs.length-1].author}
                </p>
                <p className="mx-3 text-xs">{blogs[blogs.length-1].category}</p>
                <p className="mx-3 my-2 text-base sentence-truncate">
                  {blogs[blogs.length-1].summary}
                </p>
                <p className="mx-3 my-2 text-xs italic">
                  <span className="text-quantum">
                    #{blogs[blogs.length-1].tags.map((tag) => tag.replace(/ /g, "_")).join(" #")}
                  </span>
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* RECENT ARTICLES */}
        <div className="container mx-auto px-4 mt-8 flex items-center">
          <div className="border border-quantum grow h-px"></div>
          <h2 className="heading text-xl text-dark-quantum max-w-fit p-2">Recent Articles</h2>
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
            {blogs.slice(0, blogs.length - 1).reverse().map((item, i) => (
              <div key={i} className="flex flex-wrap w-full xl:w-1/2 my-4 px-4">
                <Link to={`${item.id}`} className="w-full md:w-2/5 lg:h-full shadow ">
                  <img src={item.image} className="h-full object-cover" />
                </Link>
                <div className="w-full md:w-3/5 shadow ">
                  <Link to={`${item.id}`}>
                    <p className="truncate mx-3 mt-2 heading text-lg font-medium">{item.title}</p>
                  </Link>
                  <p className="truncate mx-3 text-sm italic">
                    on {dayjs(item.date_published).format("YYYY-MM-DD")} by {item.author}
                  </p>
                  <p className="truncate mx-3 text-xs">{item.category}</p>
                  <p className="mx-3 my-2 text-base sentence-truncate">{item.summary}</p>
                  <p className="truncate mx-3 my-2 text-xs italic">
                    <span className="text-quantum">
                      #{item.tags.map((tag) => tag.replace(/ /g, "_")).join(" #")}
                    </span>
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
