import React from "react";
import reviews from "../../assets/reviews.svg";
import { motion } from "framer-motion";
import PageTransition from "../PageTransition";

export default function Reviews() {
  return (
    <>
      <PageTransition>
        <div className="banner">
          <img
            src={reviews}
            alt="image"
            className="lg:w-screen lg:h-[400px] lg:object-cover"
          />
        </div>
        <div className=" mx-5 lg:mx-24 mt-10 md:mt-14 lg:mt-[90px]">
          <div className=" h-[0px]  shadow border border-zinc-500"></div>
          <div className="w-[139px] h-[32.66px] px-[92px] py-[7px]  bg-neutral-100 border border-zinc-500 mt-[-18px] ms-[77px] md:ms-[238px] md:w-[240px] md:h-[40px] md:mt-[-20px] lg:ms-[740px] lg:w-[300px] lg:h-[50px] lg:mt-[-26px]">
            <div className="w-[195px] h-[13px] text-center text-black text-[20px] font-bold my-[-6px] md:w-[230px]  ms-[-98px] md:text-[24px] md:ms-[-88px] lg:text-[28px] lg:w-[280px] lg:mt-[-3px] lg:ms-[-85px]">
              Customer Reviews
            </div>
          </div>
          <div className="mt-[20px] md:mt-[40px] lg:mt-[70px] lg:mx-[300px] lg:flex lg:justify-center md:flex md:justify-center">
            <div className="text-center text-black text-[22px] font-medium pt-5 md:font-semibold md:text-[27px] lg:text-[40px]">
              On Development
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
