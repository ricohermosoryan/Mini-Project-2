import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rating } from "flowbite-react";
import { shuffle } from "lodash";

export default function HomeBestSellers() {
  const [data, setData] = useState([]);

  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    axios
        .get("https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/products")
        .then((res) => {
            const shuffledData = shuffle(res.data);
            // Sort the data by rating.rate in descending order
            const sortedData = shuffledData.sort((a, b) => b.rating.rate - a.rating.rate);
            setData(sortedData);
        })
        .catch((err) => console.error(err));

    return () => controller.abort();
    }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });
  return (
    <>
      <div className="w-full hidden lg:grid grid-cols-5 mx-4">
        {data.slice(0, data.length - 1).slice(0, 5).map((item, i) => (
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
              <Link to={`${item.id}`}>
                <div className="relative">
                  <img src={item.image[0]} className="absolute inset-0 rounded-lg"
                    style={{
                      transform: hoveredItem === i ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.5s ease-in',
                    }}/>
                  <img
                    className="rounded-lg shadow"
                    src={hoveredItem === i ? item.image[1] : item.image[0]}
                    alt={item.title}
                    style={{
                      transform: hoveredItem === i ? 'scale(1.1)' : 'scale(1)',
                      opacity: hoveredItem === i ? 1 : 0.8,
                      transition: 'transform 0.5s ease-in, opacity 0.3s ease-in',
                    }}
                  />
                </div>
              </Link>
            </div>
            <div>
              <Link to={`${item.id}`}>
                <p className="truncate heading font-medium">{item.title}</p>
              </Link>
              <p className="text-sm text-dark-quantum mb-2">{item.brand}</p>
              <div className="flex items-center justify-between py-2 transition-all duration-200">
                <p className="font-semibold">{formatter.format(item.price)}</p>
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

      <div className="w-full hidden md:grid lg:hidden grid-cols-3 mx-2">
        {data.slice(0, data.length - 1).slice(0, 3).map((item, i) => (
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
              <Link to={`${item.id}`}>
                <div className="relative">
                  <img src={item.image[0]} className="absolute inset-0 rounded-lg"
                    style={{
                      transform: hoveredItem === i ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.5s ease-in',
                    }}/>
                  <img
                    className="rounded-lg shadow"
                    src={hoveredItem === i ? item.image[1] : item.image[0]}
                    alt={item.title}
                    style={{
                      transform: hoveredItem === i ? 'scale(1.1)' : 'scale(1)',
                      opacity: hoveredItem === i ? 1 : 0.8,
                      transition: 'transform 0.5s ease-in, opacity 0.3s ease-in',
                    }}
                  />
                </div>
              </Link>
            </div>
            <div>
              <Link to={`${item.id}`}>
                <p className="truncate heading font-medium">{item.title}</p>
              </Link>
              <p className="text-sm text-dark-quantum mb-2">{item.brand}</p>
              <div className="flex items-center justify-between py-2 transition-all duration-200">
                <p className="font-semibold">{formatter.format(item.price)}</p>
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

      <div className="w-full grid md:hidden grid-cols-2 mx-1">
        {data.slice(0, data.length - 1).slice(0, 2).map((item, i) => (
          <motion.div
            key={i}
            className="aspect-square mx-2 group transition relative"
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
              <Link to={`${item.id}`}>
                <div className="relative">
                  <img src={item.image[0]} className="absolute inset-0 rounded-lg"
                    style={{
                      transform: hoveredItem === i ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.5s ease-in',
                    }}/>
                  <img
                    className="rounded-lg shadow"
                    src={hoveredItem === i ? item.image[1] : item.image[0]}
                    alt={item.title}
                    style={{
                      transform: hoveredItem === i ? 'scale(1.1)' : 'scale(1)',
                      opacity: hoveredItem === i ? 1 : 0.8,
                      transition: 'transform 0.5s ease-in, opacity 0.3s ease-in',
                    }}
                  />
                </div>
              </Link>
            </div>
            <div>
              <Link to={`${item.id}`}>
                <p className="truncate heading font-medium">{item.title}</p>
              </Link>
              <p className="text-sm text-dark-quantum mb-2">{item.brand}</p>
              <div className="flex items-center justify-between py-2 transition-all duration-200">
                <p className="font-semibold">{formatter.format(item.price)}</p>
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

    </>
  );
}
