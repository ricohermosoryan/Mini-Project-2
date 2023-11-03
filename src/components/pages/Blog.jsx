import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "../PageTransition";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import tagImage from "../../assets/tag.svg";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Blog() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({ content: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    axios
      .get(
        `https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/blogs/${id}`
      )
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
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
                    <Link to="/home" className="text-gray-700">Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/blogs" className="text-gray-700">Blogs</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {blogs.title && (
                      <p className="truncate">
                        {blogs.title}
                      </p>
                    )}
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
                <div className="container px-4">
                  <div className="flex flex-wrap md:flex-nowrap gap-x-10 mb-10">
                    <div className="w-full">
                      {blogs.image && (
                        <img className="mb-8" src={blogs.image} />
                      )}
                      {blogs.title && (
                        <p className="heading text-xl font-semibold my-2">
                          {blogs.title}
                        </p>
                      )}
                      <p className="text-base my-1">
                        {" "}
                        by{" "}
                        {blogs.author && (
                          <span className="font-semibold underline">
                            {blogs.author}
                          </span>
                        )}
                      </p>
                      {blogs.date_published && (
                        <span className="text-base my-1 italic">
                          {blogs.date_published}
                        </span>
                      )}
                      {blogs.category && (
                        <p className="text-sm my-1">{blogs.category}</p>
                      )}
                      <ReactMarkdown
                        className="text-justify my-4"
                        rehypePlugins={[rehypeRaw]}
                      >
                        {blogs.content}
                      </ReactMarkdown>
                      <p className="my-10 italic">
                        For gadgets and electronics, get it at{" "}
                        <span className="text-quantum hover:text-dark-quantum cursor-pointer">
                          QuantumGalaxy
                        </span>
                        !
                      </p>
                      <div className="flex align-center opacity-70">
                        <div className="w-5 mx-2">
                          <img src={tagImage} />
                        </div>
                        <p className="text-sm">
                          Tags:{" "}
                          {blogs.tags && (
                            <span className="my-1 text-dark-quantum mx-2 hover:text-quantum cursor-pointer">
                              #
                              {blogs.tags
                                .map((tag) => tag.replace(/ /g, "_"))
                                .join(" #")}
                            </span>
                          )}
                        </p>
                      </div>
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
