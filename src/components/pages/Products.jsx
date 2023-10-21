import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../PageTransition";
import { BsEyeFill } from "react-icons/bs";
import cart from "../../assets/cart.svg";
import star from "../../assets/star.svg";
import { useContext } from "react";
import CartContext from "../../context/CartContext";

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export default function Products() {
  // Cart Items
  const { addToCart } = useContext(CartContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        "https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/products"
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
    return controller.abort();
  }, []);

  return (
    <>
      <PageTransition>
        <div className=" rounded-md mt-5 ">
          <div className="flex flex-wrap justify-center">
            {data.map((item, i) => (
              // Products Details
              <motion.div
                key={i}
                className="w-[300px] aspect-square m-3 group transition relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  ease: "easeInOut",
                  duration: 1,
                }}
              >
                {/* Image */}
                <div className=" flex gap-3 items-center">
                  <img
                    src={item.image[0]}
                    alt="image"
                    className="h-[300px] object-cover mx-auto my-1 group-hover:scale-110 transition duration-200 mb-3 pt-8 mt-[30px] shadow-lg"
                  />
                </div>

                {/* Buttons */}
                <div className="absolute bottom-0 left-[-150px] group-hover:left-0 border-sky-300 rounded-lg border-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <button
                    className="flex gap-2 p-3 font-bold"
                    onClick={() =>
                      addToCart({
                        title: item.title,
                        price: item.price,
                        image: item.image[0],
                        quantity: 1,
                      })
                    }
                  >
                    <img src={cart} alt="image" /> Add to Cart
                  </button>
                </div>

                {/* View */}
                <div className=" bg-sky-300/40 w-[50px] h-[50px] rounded-lg absolute top-0 right-[-50px] group-hover:right-0 opacity-0 group-hover:opacity-100 flex items-center justify-end transition-all duration-200">
                  <Link
                    to={`${item.id}`}
                    className="w-[35px] h-[35px] bg-white flex items-center justify-center me-2 rounded-md"
                  >
                    <BsEyeFill className="w-[20px] h-[20px]" />
                  </Link>
                </div>

                {/* Product Details */}
                <div className="mx-4">
                  <p className="truncate mx-3 mt-[10px] text-[18px] font-semibold">
                    {item.title}
                  </p>
                  <p className=" mb-[40px] mx-3 mt-2">{item.category}</p>
                  <p className="mx-3 group-hover:hidden text-left transition-all duration-200 text-[17px] font-semibold">
                    {formatter.format(item.price)}
                  </p>

                  {/* Ratings */}
                  <div className="border bg-quantum rounded-lg flex gap-0 px-4 w-[55px] h-[35px] items-center justify-center absolute bottom-0 right-4 group-hover:hidden">
                    <img src={star} alt="image" className="w-[20px] h-[20px]" />

                    <p className="text-white font-bold">{item.rating.rate}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </PageTransition>
    </>
  );
}
