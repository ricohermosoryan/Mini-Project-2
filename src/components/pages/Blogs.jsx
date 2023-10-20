import React from "react";
import blogs from "../../assets/blogs.svg";
import PageTransition from "../PageTransition";

export default function Blogs() {
  return (
    <>
      <PageTransition>
        <div className="banner">
          <img src={blogs} alt="image" className="lg:w-screen" />
        </div>
        <div className=" text-white heading w-[200px] md:w-[400px] lg:w-[600px] text-[16px] font-semibold my-[-40px] ms-[160px] md:my-[-80px] md:text-[28px] md:ms-[350px] lg:text-[40px] lg:my-[-170px] lg:ms-[900px]">
          BLOGS
          <div className="w-[30px] h-[0px] absolute left-[170px] md:left-[370px] lg:left-[936px] border-2 border-gray-300 border-opacity-90 md:w-[55px] lg:w-[65px]"></div>
        </div>

        <div className="mt-[100px] md:mt-[180px] lg:mt-[370px] lg:mx-[300px] lg:flex lg:justify-center md:flex md:justify-center">
          <div className="text-center text-black text-[22px] font-medium pt-5 md:font-semibold md:text-[27px] lg:text-[40px]">
            On Development
          </div>
        </div>
      </PageTransition>
    </>
  );
}
