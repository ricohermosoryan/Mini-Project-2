import React from "react";
import phone1 from "../assets/phone1.svg";
import phone2 from "../assets/phone2.svg";
import phone3 from "../assets/phone3.svg";
import { motion } from "framer-motion";

export default function Home() {
  return (
    // <>
    //   <div className="w-[1723.12px] h-[742.08px] relative ms-5">
    //     <div className="w-[1866px] h-[605px] left-0 top-[55px] absolute bg-zinc-800 rounded-[25px]"></div>
    //     <div className="left-[396px] top-[196px] absolute text-center text-quantum text-[56px] font-semibold font-['Inter']">
    //       Quantum Store
    //     </div>
    //     <div className="w-[1117.12px] h-[742.08px] left-[606px] top-0 absolute">
    //       {/* Animation of phone hovering to air */}
    //       <motion.img
    //         className="w-[610.48px] h-[474.38px] left-[329px] top-[123px] absolute rounded-[1px]"
    //         src={phone1}
    //         initial={{ y: 0, opacity: 1 }}
    //         animate={{ y: [0, 10, 0], opacity: [1, 0.7, 1] }}
    //         transition={{ duration: 2, repeat: Infinity }}
    //       />
    //       <img
    //         className="w-[701.66px] h-[527.64px] left-[460px] top-0 absolute"
    //         src={phone2}
    //       />
    //       <img
    //         className="w-[470.12px] h-[496.08px] left-[807px] top-[246px] absolute"
    //         src={phone3}
    //       />
    //     </div>
    //     <div className="left-[243px] top-[322px] absolute text-center">
    //       <span className="text-blue-200 text-[32px] font-medium font-['Inter']">
    //         “Join us where gadgets takes you{" "}
    //       </span>
    //       <span className="text-quantum text-[32px] font-medium font-['Inter']">
    //         beyond limits
    //       </span>
    //       <span className="text-blue-200 text-[32px] font-medium font-['Inter']">
    //         ”
    //       </span>
    //     </div>
    //     <div className="w-72 h-14 px-4 py-2 left-[442px] top-[466px] absolute bg-gradient-to-br from-blue-600 via-blue-600 to-blue-600 rounded-lg justify-center items-center gap-2 inline-flex">
    //       <div className="text-center text-neutral-100 text-xl font-medium font-['Inter'] leading-7">
    //         Explore More
    //       </div>
    //     </div>
    //   </div>
    // </>

    <>
      <div className="container mx-auto mt-10">
        <div className="bg-zinc-800 rounded-[25px] flex flex-col md:flex-row justify-around items-center">
          <div className="text  md:text-left">
            <div className="text-center text-quantum text-3xl md:text-56 font-semibold font-['Inter'] ">
              Quantum Store
              <div className=" text-center mt-5">
                <span className="text-blue-200 text-[32px] font-medium font-['Inter']">
                  “Join us where gadgets takes you
                </span>
                <span className="text-quantum text-[32px] font-medium font-['Inter']">
                  beyond limits
                </span>
                <span className="text-blue-200 text-[32px] font-medium font-['Inter']">
                  ”
                </span>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <button className="text-center text-neutral-100 text-lg md:text-xl font-medium font-['Inter'] leading-7 w-72 h-14 px-4 py-2 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-600 rounded-lg">
                Explore More
              </button>
            </div>
          </div>
          <div className="image relative md:mt-0 mt-11">
            <div className="">
              {/* Animation of phone hovering to air */}
              <motion.img
                className=" absolute left-[-90px] rounded-[1px] lg:left-[-190px]"
                src={phone1}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: [0, 10, 0], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.img
                className=" absolute top-[-40px] left-[-30px] lg:left-[-90px]"
                src={phone2}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: [0, 20, 0], opacity: [1, 1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <img className="" src={phone3} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
