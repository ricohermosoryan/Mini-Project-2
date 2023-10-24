import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../PageTransition";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import tagImage from '../../assets/tag.svg';

export default function Blog() {
  const { id } = useParams();
  const [data, setData] = useState({ content: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    axios
      .get(
        `https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/blogs/${id}`
      )
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
    return controller.abort();
  }, []);

  return (
    <>
      <PageTransition>
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
                <div className="flex flex-wrap md:flex-nowrap gap-x-10 my-10">
                  <div className="w-full">
                    {data.image && (<img className="my-8" src={data.image} />)}
                    {data.title && (<p className="heading text-xl font-semibold my-2">{data.title}</p>)}
                    <p className="text-base my-1"> by {data.author && (<span className="font-semibold underline">{data.author}</span>)}</p>
                    {data.date_published && (<span className="text-base my-1 italic">{data.date_published}</span>)}
                    {data.category && (<p className="text-sm my-1">{data.category}</p>)}
                    <ReactMarkdown className="text-justify my-4" rehypePlugins={[rehypeRaw]}>{data.content}</ReactMarkdown>
                    <p className="my-10 italic">For gadgets and electronics, get it at <span className="text-quantum hover:text-dark-quantum cursor-pointer">QuantumGalaxy</span>!</p>
                    <div className="flex align-center opacity-70">
                      <div className="w-5 mx-2">
                        <img src={tagImage} />
                      </div>
                      <p className="text-sm">Tags: {data.tags && (<span className="my-1 text-dark-quantum mx-2 hover:text-quantum cursor-pointer">#{data.tags.map(tag => tag.replace(/ /g, '_')).join(' #')}</span>)}</p>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </motion.div>
      </PageTransition>
    </>
  );
}
