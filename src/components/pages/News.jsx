import React from "react";
import news from "../../assets/news.svg";

export default function News() {
  return (
    <>
      <div className="banner">
        <img
          src={news}
          alt="image"
          className="lg:w-screen lg:h-[400px] lg:object-cover"
        />
      </div>
      <div className="text-zinc-700 text-[22px] font-bold text-center mt-8 md:text-[30px]">
        Quantum Galaxy Tech News
      </div>
      <div class=" text-center text-zinc-700 text-[18px] font-medium mt-5 mx-5 md:text-[24px] lg:mx-[150px]">
        Welcome to the Quantum Galaxy Tech News page, your portal to the latest
        and most exciting developments in the world of technology. From
        groundbreaking innovations to cosmic discoveries, we've got you covered.
        Explore the quantum leaps in tech with us.
      </div>
      <div className=" mx-5 lg:mx-24 mt-10 md:mt-14 lg:mt-[90px]">
        <div className=" h-[0px]  shadow border border-zinc-500"></div>
        <div className="w-[139px] h-[32.66px] px-[92px] py-[7px]  bg-neutral-100 border border-zinc-500 mt-[-18px] ms-[77px] md:ms-[238px] md:w-[240px] md:h-[40px] md:mt-[-20px] lg:ms-[740px] lg:w-[300px] lg:h-[50px] lg:mt-[-26px]">
          <div className="w-[155px] h-[13px] text-center text-black text-[20px] font-bold my-[-6px]  ms-[-80px] md:text-[24px] md:ms-[-50px] lg:text-[28px] lg:w-[200px] lg:mt-[-3px] lg:ms-[-43px]">
            Hot Topics
          </div>
        </div>
        <div className="mt-[40px] md:mt-[40px] lg:mt-[70px] lg:mx-[300px] lg:flex lg:justify-center md:flex md:justify-center">
          <div className="text-center text-black text-[22px] font-medium pt-5 md:font-semibold md:text-[27px] lg:text-[40px]">
            On Development
          </div>
        </div>
      </div>
    </>
  );
}
