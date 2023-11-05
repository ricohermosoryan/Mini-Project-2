import React, { useEffect, useState, useRef } from "react";
import phone1 from "../../assets/phone1.svg";
import phone2 from "../../assets/phone2.svg";
import phone3 from "../../assets/phone3.svg";
import shape from "../../assets/figma-shape.svg";
import iphone from "../../assets/iphones.svg";
import ellipse from "../../assets/ellipse.svg";
import ellipse1 from "../../assets/ellipse1.svg";
import ellipse2 from "../../assets/ellipse2.svg";
import playstation from "../../assets/playstation.svg";
import accessories from "../../assets/accessories.svg";
import axios from "axios";
import { motion } from "framer-motion";
import HomeNewProduct from "../HomeNewProduct";
import HomeBestSellers from "../HomeBestSellers";
import PageTransition from "../PageTransition";
import { Link } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import dayjs from "dayjs";
import { HiChevronRight } from "react-icons/hi";
import amazonImage from "../../assets/brands/amazon.png"
import ankerImage from "../../assets/brands/anker.png"
import appleImage from "../../assets/brands/apple.png"
import asusImage from "../../assets/brands/asus.png"
import boseImage from "../../assets/brands/bose.png"
import canonImage from "../../assets/brands/canon.png"
import dellImage from "../../assets/brands/dell.png"
import fitbitImage from "../../assets/brands/fitbit.png"
import fujifilmImage from "../../assets/brands/fujifilm.png"
import googleImage from "../../assets/brands/google.png"
import hpImage from "../../assets/brands/hp.png"
import htcImage from "../../assets/brands/htc.png"
import jabraImage from "../../assets/brands/jabra.png"
import jblImage from "../../assets/brands/jbl.png"
import kingstonImage from "../../assets/brands/kingston.png"
import lexarImage from "../../assets/brands/lexar.png"
import lgImage from "../../assets/brands/lg.png"
import logitechImage from "../../assets/brands/logitech.png"
import msiImage from "../../assets/brands/msi.png"
import nikonImage from "../../assets/brands/nikon.png"
import oculusImage from "../../assets/brands/oculus.png"
import philipsImage from "../../assets/brands/philips.png"
import razerImage from "../../assets/brands/razer.png"
import samsungImage from "../../assets/brands/samsung.png"
import sandiskImage from "../../assets/brands/sandisk.png"
import sonyImage from "../../assets/brands/sony.png"
import steelseriesImage from "../../assets/brands/steelseries.png"
import tplinkImage from "../../assets/brands/tplink.png"
import ugreenImage from "../../assets/brands/ugreen.png"
import westerndigitalImage from "../../assets/brands/westerndigital.png"

export default function Home() {
  const [data, setData] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5; // Number of items per page
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo(0, 0);
    const controller = new AbortController();

    axios
      .get(
        "https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/products"
      )
      .then((res) => {
        const limitedData = res.data.slice(0, 20); // Limit data to 20 items
        setData(limitedData);
      })
      .catch((err) => console.error(err));

    axios
      .get(
        "https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/blogs"
      )
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => console.error(err));

    return controller.abort();
  }, []);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

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
        <div className="mt-10">
          <div className="bg-zinc-800 flex flex-col md:flex-row justify-around items-center">
            <div className="text md:text-left">
              <div className="text-center text-quantum font-semibold heading pt-5">
                <div className=" text-center mt-5">
                  <span className="text-blue-200 text-[20px] md:text-[26px] lg:text-[32px] font-medium heading">
                    “Unleash the Future,{" "}
                  </span>
                  <span className="text-quantum text-[20px] md:text-[26px] lg:text-[32px] font-medium heading whitespace-nowrap">
                    Go Beyond Limits
                  </span>
                  <span className="text-blue-200 text-[20px] md:text-[26px] lg:text-[32px] font-medium heading">
                    ”
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

        {/* On Sale Cards */}
        <div className="bg-gray-900 rounded-lg mx-6 md:mx-20 lg:mx-40 mt-10 mb-20">
          <div className=" relative text-center text-neutral-100 text-[32px] font-medium font-['Poppins'] lg:flex">
            <img src={shape} />
            <span className="absolute top-[40px] left-[80px] md:top-[85px] md:left-[200px] lg:top-[120px] lg:left-[100px]  text-xl md:text-2xl lg:text-3xl">
              Quantum Products
              <br /> On Sale
            </span>
            <Link to="/products">
              <button className="absolute top-[120px] left-[150px] text-sm md:top-[200px] lg:top-[270px] md:left-[290px] lg:left-[210px] hover:underline">
                View all
              </button>
            </Link>

            {/* Carousel Cards */}
            <div className="container">
              <div className="space-x-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 md:ms-5 lg:ms-[-10px] mx-2 ">
                {paginatedData.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-3  mt-14 relative "
                  >
                    {/* Render your card content here */}
                    <div className="group relative mb-5">
                      <Link to={`/products/${item.id}`}>
                        <img
                          src={item.image[0]}
                          className="group-hover:scale-110 transition duration-200 "
                        />
                      </Link>
                    </div>
                    <div className="mb-10">
                      <p className=" text-black heading text-[9px] md:text-[13px] lg:text-[14px] text-left truncate">
                        {item.title}
                      </p>
                      <p className="text-quantum text-[9px] md:text-[13px] lg:text-[14px] text-left pt-2">
                        {item.brand}
                      </p>
                    </div>
                    <p className=" text-black text-xs text-left md:text-base lg:text-lg absolute bottom-3 left-2">
                      {formatter.format(item.price)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Arrows */}
              <div className="mt-4 flex justify-end  items-center space-x-4 mb-5 me-5">
                <button
                  onClick={() =>
                    canGoPrevious && handleChangePage(currentPage - 1)
                  }
                  className={`px-3 py-1 ${
                    !canGoPrevious && "cursor-not-allowed"
                  } bg-white rounded-full text-black px-1 py-3 hover:bg-black hover:text-white`}
                >
                  <span className="text-xl">
                    <AiOutlineLeft />
                  </span>
                </button>
                <button
                  onClick={() => canGoNext && handleChangePage(currentPage + 1)}
                  className={`px-3 py-1 ${
                    !canGoNext && "cursor-not-allowed"
                  } bg-white rounded-full text-black px-1 py-3 hover:bg-black hover:text-white`}
                >
                  <span className="text-xl">
                    <AiOutlineRight />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* New Product */}
        <div className=" mx-5 lg:mx-24">
          <div className="container mx-auto px-4 my-2">
            <div className="flex items-baseline border-b-2 border-quantum">
              <div className="border border-transparent grow h-px"></div>
              <h2 className="heading text-xl text-dark-quantum max-w-fit p-2">New Products</h2>
              <div className="border border-transparent grow-[8] h-px"></div>
              <Link to="/products"><p className="text-sm text-dark-quantum max-w-fit p-2 flex items-center gap-x-2 hover:text-quantum">View All <HiChevronRight /></p></Link>
              <div className="border border-transparent grow h-px"></div>
            </div>    
          </div>

          <div className="container mx-auto px-4">
            <HomeNewProduct />
          </div>
        </div>

        {/* Subbanner 1 */}
        <div className=" mt-10 mx-5 md:flex lg:border-emerald-200 lg:border-b lg:mx-20 ">
          <div className="bg-gradient-to-l from-emerald-200 via-cyan-500 to-sky-600 rounded-tl-lg rounded-bl-lg md:w-[60%] lg:w-[70%]">
            <div className="text-center ms-[190px] pt-2 md:mt-[30px] lg:ms-[790px]">
              <span className="text-neutral-950 text-[16px] md:text-[30px] lg:text-[40px] font-medium font-['Poppins']">
                Iphone
              </span>
              <span className="text-neutral-100 text-[16px] md:text-[30px] lg:text-[40px] font-medium font-['Poppins']">
                15 Series
              </span>
            </div>
            <div className="flex items-end p-3 gap-4 md:mt-[8px] lg:ms-[150px]">
              <img
                src={iphone}
                alt="image"
                className="w-[200px] md:w-[290px] lg:w-[700px]"
              />
            </div>
          </div>
          <div className="mb-3 md:w-[40%] lg:w-[30%]">
            <div className="w-[332px] h-[69px] justify-start items-start gap-4 inline-flex mt-3 ms-1 mb-3 md:ms-6 lg:mx-[100px] lg:mb-14 lg:mt-10 md:w-[270px]">
              <div className="w-[70px] h-[69px] md:w-[50px] md:h-[50px] lg:w-[80px] lg:h-[80px] px-2 py-1 rounded-lg border border-neutral-950 flex-col justify-start items-center gap-0.5 inline-flex lg:gap-3 lg:pt-3">
                <div className="self-stretch text-center text-neutral-950 text-base md:text-[15px] font-medium lg:text-[30px]">
                  8
                </div>
                <div className="self-stretch text-center text-neutral-950 text-sm md:text-[13px] font-light lg:text-[20px]">
                  Days
                </div>
              </div>
              <div className="w-[71px] h-[69px] md:w-[50px] md:h-[50px] lg:w-[80px] lg:h-[80px] px-2 py-1 rounded-lg border border-neutral-950 flex-col justify-start items-center gap-0.5 inline-flex lg:gap-3 lg:pt-3">
                <div className="self-stretch text-center text-neutral-950 text-base md:text-[15px] font-medium lg:text-[30px]">
                  8
                </div>
                <div className="self-stretch text-center text-neutral-950 text-sm md:text-[13px] font-light lg:text-[20px]">
                  Days
                </div>
              </div>
              <div className="w-[67px] h-[69px] md:w-[50px] md:h-[50px] lg:w-[80px] lg:h-[80px] px-2 py-1 rounded-lg border border-neutral-950 flex-col justify-start items-center gap-0.5 inline-flex lg:gap-3 lg:pt-3">
                <div className="self-stretch text-center text-neutral-950 text-base md:text-[15px] font-medium lg:text-[30px]">
                  8
                </div>
                <div className="self-stretch text-center text-neutral-950 text-sm md:text-[13px] font-light lg:text-[20px]">
                  Days
                </div>
              </div>
              <div className="w-[65px] h-[69px] md:w-[50px] md:h-[50px] lg:w-[80px] lg:h-[80px] px-2 py-1 rounded-lg border border-neutral-950 flex-col justify-start items-center gap-0.5 inline-flex lg:gap-3 lg:pt-3">
                <div className="self-stretch text-center text-neutral-950 text-base md:text-[15px] font-medium lg:text-[30px]">
                  8
                </div>
                <div className="self-stretch text-center text-neutral-950 text-sm md:text-[13px] font-light lg:text-[20px]">
                  Days
                </div>
              </div>
            </div>
            <div className="text-center text-neutral-950 text-[32px] md:text-[25px] font-medium mb-3 lg:text-[35px]">
              It feels good to be the first
            </div>
            <div className="text-zinc-800 text-2xl md:text-[20px] font-medium  leading-7 text-center md:text-left md:px-[25px] lg:text-[23px] lg:ps-[90px] lg:pt-[40px]">
              Get ready for the future of smartphones.Experience innovation like
              never before. Stay tuned for the big iPhone 15 pre-sale.
            </div>
          </div>
        </div>

        {/* BEST SELLERS */}
        <div className=" mx-5 lg:mx-24 my-12">
          <div className="container mx-auto px-4 my-2">
            <div className="flex items-baseline border-b-2 border-quantum">
              <div className="border border-transparent grow h-px"></div>
              <h2 className="heading text-xl text-dark-quantum max-w-fit p-2">Best Sellers</h2>
              <div className="border border-transparent grow-[8] h-px"></div>
              <Link to="/products"><p className="text-sm text-dark-quantum max-w-fit p-2 flex items-center gap-x-2 hover:text-quantum">View All <HiChevronRight /></p></Link>
              <div className="border border-transparent grow h-px"></div>
            </div>    
          </div>

          <div className="container mx-auto px-4">
            <HomeBestSellers />
          </div>
        </div>

        {/* Subbanner2 */}
        <div className="mb-[90px] md:flex mt-10 lg:mx-20 md:mx-5 lg:border-b lg:border-b-blue-200 lg:h-[425px]">
          <div className="Text mt-10 mx-[5px] md:w-[50%] lg:w-[70%] md:mt-1 ">
            <div className=" text-center text-black text-[32px] font-medium lg:mt-[90px]">
              Unleash the Power of the Quantum Galaxy with <br />
              PlayStation 5: <br />
              <div className=" text-black text-2xl font-normal mt-5 lg:mt-[50px]">
                Discover the Best Deals to Elevate Your Gaming Experience to
                Stellar Heights!
              </div>
            </div>
          </div>
          <div className="image mx-[5px] mt-[120px] md:w-[50%] lg:w-[30%]">
            <div className=" text-blue-200 text-[20px] font-medium ms-[120px] my-[-70px] lg:ms-[180px] lg:text-[26px]">
              Play Station 5
            </div>
            <div className="bg-sky-800 rounded-tl-[1px] rounded-tr-lg rounded-bl-[1px] rounded-br-lg lg:h-[363px]">
              <img src={ellipse} alt="image" />
              <img src={ellipse1} alt="image" className="lg:w-[520px]" />
              <div className=" text-sky-800 text-[16px] font-medium my-[-120px] ms-[20px] lg:my-[-170px] lg:text-[21px] lg:ms-[30px]">
                Digital Edition + 2TB
              </div>
            </div>
            <img
              src={playstation}
              alt="image"
              className="mt-[-90px] ms-[150px] lg:mt-[-260px] lg:w-[300px] lg:ms-[190px]"
            />

            <Link to="/products/43">
              <motion.button
                className="w-[148px] h-[46px] px-4 py-2 bg-sky-500 rounded-lg justify-center items-center gap-2 inline-flex ms-[20px] mt-[-50px]"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="text-center text-neutral-100 text-base font-normal">
                  Buy Now
                </div>
              </motion.button>
            </Link>
          </div>
        </div>

        {/* TOP BRANDS */}

        <div className="container mx-auto px-4 mt-8">
          <div className="flex items-baseline border-b-2 border-quantum">
            <div className="border border-transparent grow h-px"></div>
            <h2 className="heading text-xl text-dark-quantum max-w-fit p-2">Top Brands</h2>
            <div className="border border-transparent grow-[8] h-px"></div>
            <p className="invisible text-sm text-dark-quantum max-w-fit p-2 flex items-center gap-x-2 hover:text-quantum">View All <HiChevronRight /></p>
            <div className="border border-transparent grow h-px"></div>
          </div>    
        </div>

        <div className="container mx-auto px-8">
          <div className="my-12 marquee overflow-hidden">
            <div className="images-left h-6 lg:h-8 flex lg:gap-x-12 gap-x-6" ref={ref} >
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
            <div className="images-right h-6 lg:h-8 flex lg:gap-x-12 gap-x-6" ref={ref} >
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
              <img src={westerndigitalImage} className="h-full"/>
            </div>
          </div>
        </div>

        <div className=" mx-5 lg:mx-24 my-12">

          {/* Accesorries banner */}
          <div className=" my-12 lg:my-24 lg:mx-32">
            <div className="relative bg-slate-800 rounded-lg md:flex">
              <div className="text md:w-[50%] md:ms-[60px] md:mt-[70px]">
                <div className="heading text-center text-white text-[22px] font-semibold pt-5 md:font-semibold md:text-[27px] lg:text-[40px]">
                  QUANTUM <br />
                  ACCESSORIES
                </div>
                <div className="heading text-white text-[20px] text-center font-medium pt-3 pb-5 md:text-[22px] lg:text-[28px] lg:pt-10">
                  Explore limitless possibilities
                </div>
                <Link to="/products">
                  <motion.button
                    className="w-[110px] h-[30px] px-4 py-2 bg-emerald-200 rounded-lg justify-center items-center inline-flex ms-[110px] md:ms-[80px] md:h-[34px] md:w-[130px] lg:w-[200px] lg:h-[40px] lg:ms-[250px] lg:mt-[40px]"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="text-center text-slate-800 text-base font-normal md:text-lg">
                      View All
                    </div>
                  </motion.button>
                </Link>
              </div>
              <div className="image h-[370px] md:h-[341px] lg:h-[450px]">
                <img
                  src={ellipse2}
                  alt="ellipse"
                  className="w-[250px] h-[370px] ms-[85px] md:ms-[87px] md:h-[342px] lg:h-[450px] lg:w-[400px] lg:ms-[276px]"
                />
                <motion.img
                  src={accessories}
                  alt="image"
                  className="my-[-260px] md:w-[370px] md:my-[-290px] lg:w-[500px] lg:my-[-390px]"
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: [0, 10, 0], opacity: [1, 1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* QUANTUM BLOGS */}
          
        <div className="container mx-auto px-4 my-2">
          <div className="flex items-baseline border-b-2 border-quantum">
            <div className="border border-transparent grow h-px"></div>
            <h2 className="heading text-xl text-dark-quantum max-w-fit p-2">Our Blogs</h2>
            <div className="border border-transparent grow-[8] h-px"></div>
            <Link to="/blogs"><p className="text-sm text-dark-quantum max-w-fit p-2 flex items-center gap-x-2 hover:text-quantum">View All <HiChevronRight /></p></Link>
            <div className="border border-transparent grow h-px"></div>
          </div>    
        </div>

        <motion.div
          className="container mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
        >
          
          <div className="mx-auto sm:px-4 md:px-8 lg:px-12 my-4 flex flex-row flex-wrap">
            
            {blogs.slice(0, 4).reverse().map((item, i) => (
              <div key={i} className="flex flex-wrap w-full xl:w-1/2 my-4 px-4">
                <Link to={`${item.id}`} className="w-full aspect-[2/1] md:w-2/5 lg:h-full shadow ">
                  <img src={item.image} className="h-full object-cover w-full" />
                </Link>
                <div className="w-full md:w-3/5 shadow ">
                  <Link to={`${item.id}`}>
                    <p className="truncate mx-3 mt-2 heading text-lg font-medium">{item.title}</p>
                  </Link>
                  <p className="truncate mx-3 text-sm italic">
                    on {dayjs(item.date_published).format("YYYY-MM-DD")} by {item.author}
                  </p>
                  <p className="truncate mx-3 text-xs">{item.category}</p>
                  <p className="mx-3 my-2 text-base sentence-truncate">{item.summary}</p>
                  <p className="truncate mx-3 my-2 text-xs italic">
                    <span className="text-quantum">
                      #{item.tags.map((tag) => tag.replace(/ /g, "_")).join(" #")}
                    </span>
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
