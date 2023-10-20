import React from "react";
import searchImage from "../assets/search.svg";
import { useCycle, motion, AnimatePresence, MotionConfig } from "framer-motion";

export default function Search() {
  const [search, setSearch] = useCycle(false, true);

  const navbarIcons = [{ name: "Search", icon: searchImage }];
  return (
    <>
      <div>
        <motion.img
          src={navbarIcons[0].icon}
          className="w-10 aspect-square cursor-pointer"
          alt={navbarIcons[0].name}
          animate={search ? "open" : "closed"}
          onClick={() => setSearch()}
        ></motion.img>
      </div>
      <AnimatePresence>
        {search && (
          <MotionConfig
            transition={{
              type: "spring",
              bounce: 0.25,
            }}
          >
            <motion.div
              className="fixed top-[60px] inset-0 h-[50px] md:top-[100px] md:mx-[120px] lg:mx-[400px] "
              variants={{
                open: {
                  y: "70%",
                  transition: {
                    type: "spring",
                    bounce: 0.35,
                  },
                },
                closed: {
                  y: "-1400%",
                  transition: {
                    type: "spring",
                    bounce: 0.25,
                  },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="border rounded-t-lg flex">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border-gray-300 text-gray-900 text-sm  block w-full p-2.5 border-none outline-none focus:ring-0 focus:border-none"
                  placeholder="Search"
                />
                <button type="submit" className=" bg-white">
                  <img src={searchImage} alt="image" />
                </button>
              </div>
              <div className=" border h-[150px] bg-white text-center rounded-b-lg">
                No Result Found
              </div>
            </motion.div>
          </MotionConfig>
        )}
      </AnimatePresence>
    </>
  );
}
