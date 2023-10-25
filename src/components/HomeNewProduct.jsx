import React, { useEffect, useState } from "react";
import axios from "axios";
import star from "../assets/star.svg";
import { Link } from "react-router-dom";

export default function HomeNewProduct() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(
        "https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/products"
      )
      .then((res) => {
        const limitedData = res.data.slice(0, 6);
        setData(limitedData);
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
      <div className="space-x-0 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:ms-5 lg:ms-[90px] ms-1">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-3 w-24 md:w-40 lg:w-52 mt-14"
          >
            {/* Render your card content here */}
            <Link to={`/products/${item.id}`}>
              <img
                src={item.image[0]}
                className="hover:scale-110 transition-all duration-200 mb-4"
              />
            </Link>
            <div className="border border-gray-400 h-[1px]"></div>
            <p className=" text-black text-xs md:text-base lg:text-lg mt-2">
              {item.brand}
            </p>
            <div className="flex justify-between items-center">
              <p className=" text-black text-xs text-left md:text-base lg:text-lg">
                {formatter.format(item.price)}
              </p>
              <p className="flex bg-quantum rounded-lg p-1 text-white">
                <img src={star} alt="image" className="w-[20px] h-[20px]" />
                {item.rating.rate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
