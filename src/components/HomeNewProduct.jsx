import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rating } from "flowbite-react";

export default function HomeNewProduct() {
  const [data, setData] = useState([]);

  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(
        "https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products"
      )
      .then((res) => {
        setData(res.data.products);
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
        {data.slice(0, data.length/2).reverse().slice(0, 5).map((item, i) => (
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
              <Link to={`/products/${item._id}`}>
                <div className="relative">
                  <img src={item.image[0]} className="absolute inset-0 rounded-lg"
                    style={{
                      transform: hoveredItem === i ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.5s ease-in',
                    }}/>
                  <img
                    className="rounded-lg shadow"
                    src={hoveredItem === i ? item.image[1] : item.image[0]}
                    alt={item.name}
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
              <Link to={`/products/${item._id}`}>
                <p className="truncate heading font-medium">{item.name}</p>
              </Link>
              <p className="text-sm text-dark-quantum mb-2">{item.brand}</p>
              <div className="flex items-center justify-between py-2 transition-all duration-200">
                <p className="font-semibold">{formatter.format(item.price-(item.price*item.discount))}</p>
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
        {data.slice(0, data.length/2).reverse().slice(0, 3).map((item, i) => (
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
              <Link to={`/products/${item._id}`}>
                <div className="relative">
                  <img src={item.image[0]} className="absolute inset-0 rounded-lg"
                    style={{
                      transform: hoveredItem === i ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.5s ease-in',
                    }}/>
                  <img
                    className="rounded-lg shadow"
                    src={hoveredItem === i ? item.image[1] : item.image[0]}
                    alt={item.name}
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
              <Link to={`/products/${item._id}`}>
                <p className="truncate heading font-medium">{item.name}</p>
              </Link>
              <p className="text-sm text-dark-quantum mb-2">{item.brand}</p>
              <div className="flex items-center justify-between py-2 transition-all duration-200">
                <p className="font-semibold">{formatter.format(item.price-(item.price*item.discount))}</p>
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
        {data.slice(0, data.length/2).reverse().slice(0, 2).map((item, i) => (
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
              <Link to={`/products/${item._id}`}>
                <div className="relative">
                  <img src={item.image[0]} className="absolute inset-0 rounded-lg"
                    style={{
                      transform: hoveredItem === i ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.5s ease-in',
                    }}/>
                  <img
                    className="rounded-lg shadow"
                    src={hoveredItem === i ? item.image[1] : item.image[0]}
                    alt={item.name}
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
              <Link to={`/products/${item._id}`}>
                <p className="truncate heading font-medium">{item.name}</p>
              </Link>
              <p className="text-sm text-dark-quantum mb-2">{item.brand}</p>
              <div className="flex items-center justify-between py-2 transition-all duration-200">
                <p className="font-semibold">{formatter.format(item.price-(item.price*item.discount))}</p>
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
