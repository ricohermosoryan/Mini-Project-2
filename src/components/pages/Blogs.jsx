import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import blogs from "../../assets/blogs.svg";
import PageTransition from "../PageTransition";

export default function Blogs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        "https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/blogs"
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
        <div className="banner">
          <img src={blogs} alt="image" className="lg:w-screen" />
        </div>
        <div className=" text-white heading text-[20px] font-semibold my-[-60px] ms-[150px] md:my-[-106px] md:text-[28px] md:ms-[350px] lg:text-[40px] lg:my-[-170px] lg:ms-[900px]">
          BLOGS
          <div className="w-[40px] h-[0px] absolute left-[165px] md:left-[370px] lg:left-[936px] border-2 border-neutral-200 border-opacity-70 md:w-[55px] lg:w-[65px]"></div>
        </div>
        <div className="container mx-auto p-2 flex flex-row-reverse flex-wrap-reverse gap-x-4 justify-around mt-[100px] md:mt-[180px] lg:mt-[370px] ">
          {data.map((item, i) => (
              <Link to={`${item.id}`} key={i} className="flex flex-wrap w-full xl:w-[600px] 2xl:w-[750px] my-4 shadow">
                <div className="w-full md:w-2/5 lg:h-full">
                  <img src={item.image} className="h-full object-cover" />
                </div>
                <div className="w-full md:w-3/5">
                  <p className="truncate mx-3 mt-2 heading text-lg font-medium">{item.title}</p>
                  <p className="truncate mx-3 text-sm italic">on {item.date_published} by {item.author}</p>
                  <p className="truncate mx-3 text-xs">{item.category}</p>
                  <p className="mx-3 my-2 text-base sentence-truncate">{item.summary}</p>
                  <p className="truncate mx-3 my-2 text-xs italic"><span className="text-quantum">#{item.tags.map(tag => tag.replace(/ /g, '_')).join(' #')}</span></p>
                </div>
              </Link>
          ))}
        </div>
      </PageTransition>
    </>
  );
}
