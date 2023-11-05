import React, { useEffect } from "react";
import message from "../../assets/sendmessage.svg";
import { motion } from "framer-motion";
import PageTransition from "../PageTransition";
import { Link } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import contactBanner from "../../assets/contact.svg";

export default function ContactUs() {
  useEffect(() => {
    const scrollPosition = window.scrollY;

    // Set the scroll position based on the condition
    if (scrollPosition === 0) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 48);
    }
  }, []);

  return (
    <>
      <PageTransition>
        <div className="container mx-auto px-4">
          {/* BREADCRUMB */}
          <div className="my-6">
            <Breadcrumb className="truncate">
              <Breadcrumb.Item>
                  <Link to="/home" className="text-gray-700">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Contact Us
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        {/* BANNER */}
        <div className="w-full relative">
          <img src={contactBanner} className="w-full object-cover" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="heading text-2xl lg:text-3xl xl:text-4xl text-white text-center whitespace-nowrap">CONTACT US</h1>
            <div className="h-1 w-12 lg:w-14 xl:w-16 bg-white mx-auto my-1"></div>
          </div>
        </div>

        <div className="mt-[100px] md:mt-[180px] md:flex lg:mt-[370px] lg:mx-[300px]">
          <div className="container lg:w-[40%]">
            <div className=" text-zinc-700 text-[23px] font-bold flex mx-4 gap-2">
              <img src={message} alt="image" className="w-[27px]" />
              SEND US A MESSAGE
            </div>
            <div className=" h-[0px] border border-zinc-400 mx-3"></div>
            <div className="input mt-5 ms-3">
              <form>
                <div className="border rounded-lg shadow-sm mx-3 ">
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border-gray-300 text-gray-900 text-sm  block w-full p-2.5 border-none outline-none focus:ring-0 focus:border-none"
                    placeholder="Your Name"
                  />
                </div>

                <div className=" border rounded-lg flex items-center shadow-sm mx-3 mt-3">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border-gray-300 text-gray-900 text-sm  block w-full p-2.5 border-none outline-none focus:ring-0 focus:border-none"
                    placeholder="Email"
                  />
                </div>
                <div className="border rounded-lg shadow-sm mx-3 mt-3">
                  <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border-none focus:ring-0 focus:border-none"
                    placeholder="Leave a comment..."
                  ></textarea>
                </div>
              </form>

              <motion.button
                type="submit"
                className="grow text-white heading bg-quantum hover:bg-dark-quantum focus:outline-none font-medium rounded-lg text-base w-[120px] ms-[230px] px-5 py-2.5 text-center mt-5 mx-3 md:ms-[280px] lg:ms-[370px]"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Submit
              </motion.button>
            </div>
          </div>

          <div className="quantumpage lg:w-[60%] lg:ms-[240px]">
            <div className=" text-zinc-700 text-[23px] font-bold mt-4 mx-3 md:mt-0">
              QUANTUM GALAXY
            </div>
            <div className="mx-3 mt-4">
              <span className="text-zinc-700 text-[21px] font-semibold ">
                Office Address:{" "}
                <span className="text-zinc-700 text-[18px] font-normal ">
                  23 Road 2 Project 6 Quezon City
                </span>
              </span>
            </div>
            <div className="mx-3 mt-6">
              <span className="text-zinc-700 text-[21px] font-semibold ">
                Email:{" "}
                <span className="text-zinc-700 text-[18px] font-normal ">
                  admin@quantumgalaxy.ph
                </span>
              </span>{" "}
              <br />
              <span className="text-zinc-700 text-[21px] font-semibold ">
                Phone Number:{" "}
                <span className="text-zinc-700 text-[18px] font-normal ">
                  (02) 8745 5923
                </span>
              </span>
              <br />
              <span className="text-zinc-700 text-[21px] font-semibold ">
                Mobile Number:{" "}
                <span className="text-zinc-700 text-[18px] font-normal ">
                  +63 914 534 5923
                </span>
              </span>
            </div>
            <div className="mx-3 mt-6">
              <div>
                <span className="text-zinc-700 text-2xl font-semibold">
                  You may also reach us through the following:
                </span>
                <span className="text-zinc-700 text-xl font-semibold "> </span>
              </div>
              <span className="text-zinc-700 text-[21px] font-semibold ">
                Facebook:{" "}
                <span className="text-zinc-700 text-[15px] font-normal ">
                  https://www.facebook.com/QuantumGalaxyph
                </span>
              </span>
              <br />
              <span className="text-zinc-700 text-[21px] font-semibold ">
                Messenger: <br />
                <span className="text-zinc-700 text-[15px] font-normal ">
                  https://m.me/QuantumGalaxyph
                </span>
              </span>
              <br />
              <span className="text-zinc-700 text-[21px] font-semibold ">
                Instagram:{" "}
                <span className="text-zinc-700 text-[15px] font-normal ">
                  https://www.instagram.com/QuantumGalaxyph
                </span>
              </span>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
