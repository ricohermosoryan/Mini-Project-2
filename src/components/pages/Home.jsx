import React, { useEffect, useState, useRef } from "react";
import phone1 from "../../assets/phone1.svg";
import phone2 from "../../assets/phone2.svg";
import phone3 from "../../assets/phone3.svg";
import iphone from "../../assets/iphones.svg";
import playstation from "../../assets/playstation.svg";
import accessories from "../../assets/accessories.svg";
import axios from "axios";
import { motion } from "framer-motion";
import HomeSale from "../HomeSale";
import HomeNewProduct from "../HomeNewProduct";
import HomeBestSellers from "../HomeBestSellers";
import PageTransition from "../PageTransition";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { HiChevronRight } from "react-icons/hi";
import amazonImage from "../../assets/brands/amazon.png";
import ankerImage from "../../assets/brands/anker.png";
import appleImage from "../../assets/brands/apple.png";
import asusImage from "../../assets/brands/asus.png";
import boseImage from "../../assets/brands/bose.png";
import canonImage from "../../assets/brands/canon.png";
import dellImage from "../../assets/brands/dell.png";
import fitbitImage from "../../assets/brands/fitbit.png";
import fujifilmImage from "../../assets/brands/fujifilm.png";
import googleImage from "../../assets/brands/google.png";
import hpImage from "../../assets/brands/hp.png";
import htcImage from "../../assets/brands/htc.png";
import jabraImage from "../../assets/brands/jabra.png";
import jblImage from "../../assets/brands/jbl.png";
import kingstonImage from "../../assets/brands/kingston.png";
import lexarImage from "../../assets/brands/lexar.png";
import lgImage from "../../assets/brands/lg.png";
import logitechImage from "../../assets/brands/logitech.png";
import msiImage from "../../assets/brands/msi.png";
import nikonImage from "../../assets/brands/nikon.png";
import oculusImage from "../../assets/brands/oculus.png";
import philipsImage from "../../assets/brands/philips.png";
import razerImage from "../../assets/brands/razer.png";
import samsungImage from "../../assets/brands/samsung.png";
import sandiskImage from "../../assets/brands/sandisk.png";
import sonyImage from "../../assets/brands/sony.png";
import steelseriesImage from "../../assets/brands/steelseries.png";
import tplinkImage from "../../assets/brands/tplink.png";
import ugreenImage from "../../assets/brands/ugreen.png";
import westerndigitalImage from "../../assets/brands/westerndigital.png";
import bannerBackground1 from "../../assets/banner-background-1.svg";
import bannerBackground2 from "../../assets/banner-background-2.svg";
import bannerBackground3 from "../../assets/banner-background-3.svg";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo(0, 0);
    const controller = new AbortController();

    axios
      .get("https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/blogs")
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => console.error(err));
    
    axios
      .get("https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/news")
      .then((res) => {
        setNews(res.data.news);
      })
      .catch((err) => console.error(err));

    return controller.abort();
  }, []);

  const ref = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      ref.current.appendChild(ref.current.firstChild);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Banner */}
      <PageTransition>
        <div className="mt-10 mb-16">
          <div className="bg-zinc-800 flex flex-col md:flex-row justify-around items-center">
            <div className="text md:text-left">
              <div className="text-center text-quantum font-semibold heading pt-5">
                <div className=" text-center mt-5">
                  <span className="text-blue-200 text-[20px] md:text-[26px] lg:text-[32px] font-semibold heading">
                    Unleash the Future.&nbsp;
                  </span>
                  <span className="text-quantum text-[20px] md:text-[26px] lg:text-[32px] font-semibold heading whitespace-nowrap">
                    Go Beyond Limits.
                  </span>
                </div>
              </div>
              <div className="flex justify-center mt-10">
                <Link to="/products">
                  <motion.button
                    className="text-center text-neutral-100 text-lg md:text-xl font-medium heading leading-7 w-40 h-10 px-4 py-1 bg-gradient-to-br from-sky-500 via-blue-600 to-sky-500 rounded-lg"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    Shop Now
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Iphones images */}
            <div className="image relative md:mt-0 mt-11">
              <div className="">
                {/* Animation of phone hovering to air */}
                <motion.img
                  className=" absolute left-[-90px] rounded-[1px] lg:left-[-250px]"
                  src={phone1}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: [0, 10, 0], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.img
                  className=" absolute top-[-40px] left-[-30px] lg:left-[-110px]"
                  src={phone2}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: [0, 20, 0], opacity: [1, 1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <img src={phone3} />
              </div>
            </div>
          </div>
        </div>

        {/* QUANTUM PRODUCTS ON SALE */}
        <div className="container min-h-fit mx-auto my-16">
          <div className="min-h-fit" style={{
            backgroundImage: `url(${bannerBackground1})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}>
            <div className="container mx-auto px-4 lg:px-8 py-4 lg:py-8 flex flex-wrap items-center justify-center">
              <div className="w-full xl:w-1/5 grow text-center text-white">
                <div className="heading text-center text-white text-[22px] font-semibold pb-2 md:font-semibold md:text-[27px] lg:text-[40px]">
                  SALE! SALE! SALE!
                </div>
                <Link to="/products" className="w-full mx-auto">
                  <motion.button
                    className="px-12 py-2 bg-transparent rounded-lg justify-center items-center inline-flex"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="text-center opacity-75 heading text-white text-base font-medium md:text-lg">
                      View All
                    </div>
                  </motion.button>
                </Link>
              </div>
              <div className="w-full xl:w-4/5 grow flex items-center justify-center">
                <HomeSale />
              </div>
            </div>
          </div>
        </div>

        {/* New Product */}
        <div className=" mx-5 lg:mx-24 my-16">
          <div className="container mx-auto px-4">
            <div className="flex items-baseline border-b-2 border-quantum">
              <div className="border border-transparent grow h-px"></div>
              <h2 className="heading text-xl text-dark-quantum max-w-fit p-2">
                New Arrivals
              </h2>
              <div className="border border-transparent grow-[8] h-px"></div>
              <Link to="/products">
                <p className="text-sm text-dark-quantum max-w-fit p-2 flex items-center gap-x-2 hover:text-quantum">
                  View All <HiChevronRight />
                </p>
              </Link>
              <div className="border border-transparent grow h-px"></div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <HomeNewProduct />
          </div>
        </div>

        {/* IPHONE 15 */}

        <div className="w-full min-h-fit mx-auto my-16 text-center">
          <div className="w-full flex flex-wrap items-center justify-center">
            <div className="grow w-full order-2 md:order-1 md:w-1/2 2xl:w-2/3 px-8 bg-gradient-to-l from-emerald-200 via-cyan-500 to-sky-600">
              <div className="w-full py-4 md:py-8 xl:py-12 flex flex-col items-center justify-center">
                <div className="heading text-center text-[22px] font-semibold mb-2 md:font-semibold md:text-[27px] lg:text-[40px]">
                  <span className="text-black">iPhone&nbsp;</span><span className="text-white">15 Series</span>
                </div>
                <img
                  src={iphone}
                  alt="image"
                  className="h-full w-full 2xl:w-[700px] mx-auto"
                />
              </div>
            </div>
            <div className="grow w-full order-1 md:order-2 md:w-1/2 2xl:w-1/3 px-8 my-4">
              <div className="flex gap-x-4 items-center justify-center mb-8">
                <div className="text-center text-md md:text-lg lg:text-xl font-semibold px-2 py-3 border border-black rounded-lg"><span className="font-bold text-lg md:text-xl lg:text-2xl">8</span><br />DAYS</div>
                <div className="text-center text-md md:text-lg lg:text-xl font-semibold px-2 py-3 border border-black rounded-lg"><span className="font-bold text-lg md:text-xl lg:text-2xl">8</span><br />DAYS</div>
                <div className="text-center text-md md:text-lg lg:text-xl font-semibold px-2 py-3 border border-black rounded-lg"><span className="font-bold text-lg md:text-xl lg:text-2xl">8</span><br />DAYS</div>
                <div className="text-center text-md md:text-lg lg:text-xl font-semibold px-2 py-3 border border-black rounded-lg"><span className="font-bold text-lg md:text-xl lg:text-2xl">8</span><br/>DAYS</div>
              </div>
              <div className="heading text-[20px] text-center font-medium my-2 md:text-[22px] lg:text-[28px]">
                It Feels Good to be the First
              </div>
              <div className="text-[16px] text-center font-base my-2 md:text-[18px] lg:text-[24px] px-4 md:px-12 xl:px-20">
                Get ready for the future of smartphones. Experience innovation like
                never before. Stay tuned for the big iPhone 15 pre-sale.
              </div>
            </div>
          </div>
        </div>

        {/* BEST SELLERS */}
        <div className=" mx-5 lg:mx-24 my-16">
          <div className="container mx-auto px-4">
            <div className="flex items-baseline border-b-2 border-quantum">
              <div className="border border-transparent grow h-px"></div>
              <h2 className="heading text-xl text-dark-quantum max-w-fit p-2">
                Best Sellers
              </h2>
              <div className="border border-transparent grow-[8] h-px"></div>
              <Link to="/products">
                <p className="text-sm text-dark-quantum max-w-fit p-2 flex items-center gap-x-2 hover:text-quantum">
                  View All <HiChevronRight />
                </p>
              </Link>
              <div className="border border-transparent grow h-px"></div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <HomeBestSellers />
          </div>
        </div>

        {/* PLAYSTATION */}
        <div className="w-full min-h-fit mx-auto my-16 text-center">
          <div className="w-full flex flex-wrap items-center justify-center">
            <div className="grow w-full md:w-1/2 2xl:w-3/5 px-8">
              <div className="heading text-center text-[22px] font-semibold my-4 md:font-semibold md:text-[27px] lg:text-[40px]">
                Unleash the Power of the Quantum Galaxy with <br />
              PlayStation 5
              </div>
              <div className="heading text-[20px] text-center font-medium my-2 md:text-[22px] lg:text-[28px]">
                Discover the Best Deals
                to Elevate Your Gaming Experience
              </div>
            </div>
            <div className="grow w-full md:w-1/2 2xl:w-2/5 relative">
              <img src={bannerBackground2} className="min-h-full h-[450px] lg:h-[500px] w-full object-cover" />
              <div className="absolute w-full mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="heading text-center text-white text-[22px] font-semibold md:font-semibold md:text-[27px] lg:text-[40px]">
                  PLAYSTATION 5
                </div>
                <img
                  src={playstation}
                  alt="PlayStation 5"
                  className="w-96 mx-auto my-4 px-2"
                />
                <Link to="/products/6556d68eb47d6ece88210797" className="w-full ">
                  <motion.button
                    className="px-12 py-2 bg-[#075985] rounded-lg justify-center items-center inline-flex mx-auto lg:mx-8"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="text-center heading text-neutral-100 text-base font-medium md:text-lg">
                      Buy Now
                    </div>
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* TOP BRANDS */}
        <div className="container mx-auto px-4 mt-16">
          <div className="flex items-baseline border-b-2 border-quantum">
            <div className="border border-transparent grow h-px"></div>
            <h2 className="heading text-xl text-dark-quantum max-w-fit p-2">
              Top Brands
            </h2>
            <div className="border border-transparent grow-[8] h-px"></div>
            <p className="invisible text-sm text-dark-quantum max-w-fit p-2 flex items-center gap-x-2 hover:text-quantum">
              View All <HiChevronRight />
            </p>
            <div className="border border-transparent grow h-px"></div>
          </div>
        </div>

        <div className="container mx-auto px-8 mb-16">
          <div className="my-12 marquee overflow-hidden">
            <div
              className="images-left h-6 lg:h-8 flex lg:gap-x-12 gap-x-6"
              ref={ref}
            >
              <img src={amazonImage} className="h-full" />
              <img src={ankerImage} className="h-full" />
              <img src={appleImage} className="h-full" />
              <img src={asusImage} className="h-full" />
              <img src={boseImage} className="h-full" />
              <img src={canonImage} className="h-full" />
              <img src={dellImage} className="h-full" />
              <img src={fitbitImage} className="h-full" />
              <img src={fujifilmImage} className="h-full" />
              <img src={googleImage} className="h-full" />
              <img src={hpImage} className="h-full" />
              <img src={htcImage} className="h-full" />
              <img src={jabraImage} className="h-full" />
              <img src={jblImage} className="h-full" />
              <img src={kingstonImage} className="h-full" />
            </div>
          </div>

          <div className="my-12 marquee overflow-hidden">
            <div
              className="images-right h-6 lg:h-8 flex lg:gap-x-12 gap-x-6"
              ref={ref}
            >
              <img src={lexarImage} className="h-full" />
              <img src={lgImage} className="h-full" />
              <img src={logitechImage} className="h-full" />
              <img src={msiImage} className="h-full" />
              <img src={nikonImage} className="h-full" />
              <img src={oculusImage} className="h-full" />
              <img src={philipsImage} className="h-full" />
              <img src={razerImage} className="h-full" />
              <img src={samsungImage} className="h-full" />
              <img src={sandiskImage} className="h-full" />
              <img src={sonyImage} className="h-full" />
              <img src={steelseriesImage} className="h-full" />
              <img src={tplinkImage} className="h-full" />
              <img src={ugreenImage} className="h-full" />
              <img src={westerndigitalImage} className="h-full" />
            </div>
          </div>
        </div>

        {/* ACCESSORIES BANNER */}
        <div className="w-full min-h-fit mx-auto my-16">
          <div className="min-h-fit relative">
            <img src={bannerBackground3} className="min-h-full h-[550px] md:h-[400px] w-full object-cover" />
            <div className="container mx-auto px-2 flex flex-wrap items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-full md:w-1/2 grow text-center text-white">
                <div className="heading text-center text-white text-[22px] font-semibold pt-5 md:font-semibold md:text-[27px] lg:text-[40px]">
                  QUANTUM <br />
                  ACCESSORIES
                </div>
                <div className="heading text-white text-[20px] text-center font-medium pt-3 pb-5 md:text-[22px] lg:text-[28px]">
                  Explore Limitless Possibilities
                </div>
                <Link to="/products" className="w-full mx-auto">
                  <motion.button
                    className="px-12 py-2 bg-emerald-200 rounded-lg justify-center items-center inline-flex"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="text-center heading text-slate-800 text-base font-medium md:text-lg">
                      View All
                    </div>
                  </motion.button>
                </Link>
              </div>
              <div className="w-full md:w-1/2 grow flex items-center justify-center">
                <div className="image">
                  <motion.img
                    src={accessories}
                    alt="image"
                    className="md:w-[370px] lg:w-[500px]"
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: [0, 10, 0], opacity: [1, 1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QUANTUM BLOGS */}
        <div className="container mx-auto px-4 mt-16">
          <div className="flex items-baseline border-b-2 border-quantum">
            <div className="border border-transparent grow h-px"></div>
            <h2 className="heading text-xl text-dark-quantum max-w-fit p-2">
              Our Blogs
            </h2>
            <div className="border border-transparent grow-[8] h-px"></div>
            <Link to="/blogs">
              <p className="text-sm text-dark-quantum max-w-fit p-2 flex items-center gap-x-2 hover:text-quantum">
                View All <HiChevronRight />
              </p>
            </Link>
            <div className="border border-transparent grow h-px"></div>
          </div>
        </div>

        <motion.div
          className="container mx-auto mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
        >
          <div className="mx-auto sm:px-4 md:px-8 lg:px-12 my-4 flex flex-row flex-wrap">
            {blogs
              .slice(-4)
              .reverse()
              .map((item, i) => (
                <div
                  key={i}
                  className="flex flex-wrap w-full xl:w-1/2 my-4 px-4"
                >
                  <Link
                    to={`/blogs/${item._id}`}
                    className="w-full aspect-[2/1] md:w-2/5 lg:h-full shadow "
                  >
                    <img
                      src={item.image}
                      className="h-full object-cover w-full"
                    />
                  </Link>
                  <div className="w-full md:w-3/5 shadow ">
                    <Link to={`/blogs/${item._id}`}>
                      <p className="truncate mx-3 mt-2 heading text-lg font-medium">
                        {item.name}
                      </p>
                    </Link>
                    <p className="truncate mx-3 text-sm italic">
                      on {dayjs(item.date_published).format("YYYY-MM-DD")} by{" "}
                      {item.author}
                    </p>
                    <p className="truncate mx-3 text-xs">{item.category}</p>
                    <p className="mx-3 my-2 text-base sentence-truncate">
                      {item.summary}
                    </p>
                    <p className="truncate mx-3 my-2 text-xs italic">
                      <span className="text-quantum">
                        #
                        {item.tags
                          .map((tag) => tag.replace(/ /g, "_"))
                          .join(" #")}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>

        {/* TECH NEWS*/}
        <div className="container mx-auto px-4 mt-16">
          <div className="flex items-baseline border-b-2 border-quantum">
            <div className="border border-transparent grow h-px"></div>
            <h2 className="heading text-xl text-dark-quantum max-w-fit p-2">
              Tech News
            </h2>
            <div className="border border-transparent grow-[8] h-px"></div>
            <Link to="/news">
              <p className="text-sm text-dark-quantum max-w-fit p-2 flex items-center gap-x-2 hover:text-quantum">
                View All <HiChevronRight />
              </p>
            </Link>
            <div className="border border-transparent grow h-px"></div>
          </div>
        </div>

        <motion.div
          className="container mx-auto mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
        >
          <div className="mx-auto sm:px-4 md:px-8 lg:px-12 my-4 flex flex-row flex-wrap">
            {news
              .slice(-4)
              .reverse()
              .map((item, i) => (
                <div
                  key={i}
                  className="flex flex-wrap w-full xl:w-1/2 my-4 px-4"
                >
                  <Link
                    to={`/news/${item._id}`}
                    className="w-full aspect-[2/1] md:w-2/5 lg:h-full shadow "
                  >
                    <img
                      src={item.url_image}
                      className="h-full object-cover w-full"
                    />
                  </Link>
                  <div className="w-full md:w-3/5 shadow ">
                    <Link to={`/news/${item._id}`}>
                      <p className="truncate mx-3 mt-2 heading text-lg font-medium">
                        {item.title}
                      </p>
                    </Link>
                    <p className="truncate mx-3 text-sm italic">
                      on {dayjs(item.published_at).format("YYYY-MM-DD")} by{" "}
                      {item.author}
                    </p>
                    <p className="truncate mx-3 text-xs">{item.source}</p>
                    <p className="mx-3 my-2 text-base paragraph-truncate">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </PageTransition>
    </>
  );
}
