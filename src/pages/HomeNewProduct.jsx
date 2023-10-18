import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HomeNewProduct() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("https://d6fq7jdbk9.execute-api.us-east-1.amazonaws.com/dev/gadgets")
      .then((res) => {
        const limitedData = res.data.slice(0, 5);
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
      <div className="space-x-1 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:ms-10 lg:ms-[-10px] ms-1">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-3 w-24 md:w-20 lg:w-52 mt-14"
          >
            {/* Render your card content here */}
            <img src={item.image[0]} />
            <p className=" text-black text-xs md:text-base lg:text-lg">
              {item.brand}
            </p>
            <p className=" text-black text-xs text-left md:text-base lg:text-lg">
              {formatter.format(item.price)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
