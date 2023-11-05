import React, { useEffect } from "react";
import about from "../../assets/about.svg";
import { motion } from "framer-motion";
import PageTransition from "../PageTransition";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";
import aboutUsBanner from "../../assets/aboutus.svg";
import about1Image from "../../assets/about1.svg";
import about2Image from "../../assets/about2.svg";
import about3Image from "../../assets/about3.svg";
import about4Image from "../../assets/about4.svg";

export default function AboutUs() {
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
        {/* BREADCRUMB */}
        <div className="container mx-auto px-4">
          <div className="my-6">
            <Breadcrumb className="truncate">
              <Breadcrumb.Item>
                  <Link to="/home" className="text-gray-700">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                About Us
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        {/* BANNER */}
        <div className="w-full relative">
          <img src={aboutUsBanner} className="w-full object-cover" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="heading text-2xl lg:text-3xl xl:text-4xl text-white text-center whitespace-nowrap">ABOUT US</h1>
            <div className="h-1 w-12 lg:w-14 xl:w-16 bg-white mx-auto my-1"></div>
          </div>
        </div>

        {/* ABOUT US */}
        <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 my-4 text-justify flex flex-wrap w-full">
          <p className="w-full my-4 order-1">
            QuantumGalaxy is a visionary destination where we bring the future to your fingertips. Our mission is to redefine innovation and transform the way you experience technology. In the ever-expanding universe of gadgets and gizmos, we believe in reaching for the stars, both figuratively and literally. Our journey began with a passion for pushing the boundaries of technology, and now, we invite you to embark on this extraordinary adventure with us.
          </p>
          <img src={about1Image} className="lg:w-1/2 object-cover lg:order-3 order-2 my-4 lg:px-8" />
          <div className="lg:w-1/2 w-full lg:order-2 order-3 lg:pr-8 lg:my-4">
            <h2 className="heading text-xl my-2 text-dark-quantum">Our Vision</h2>
            <p>At QuantumGalaxy, we are driven by a steadfast vision. We envision a world where technology seamlessly integrates into our lives, enhancing our experiences and enriching our understanding of what's possible. With an unwavering commitment to innovation, we're determined to push the boundaries of what can be achieved with cutting-edge tech. Our goal is to introduce you to a realm where the limits of innovation are pushed beyond the horizon, where the future is now.</p>
          </div>
          <img src={about2Image} className="lg:w-1/2 object-cover order-4 my-4 lg:px-8"/>
          <div className="lg:w-1/2 w-full order-5 lg:pl-8 lg:my-4">
            <h2 className="heading text-xl my-2 text-dark-quantum">Your Gateway to the Future</h2>
            <p>Our store is not just a place to buy the latest gadgets; it's a portal to the QuantumGalaxy. Here, we carefully curate a universe of mind-bending virtual reality experiences, awe-inspiring gaming adventures, and everything in between. Every product we feature has been handpicked to transport you to a realm of possibilities where innovation knows no bounds. Whether you're a seasoned tech enthusiast or just starting your journey into the technological unknown, QuantumGalaxy is your gateway to a future filled with endless possibilities.</p>
          </div>
          <img src={about3Image} className="lg:w-1/2 object-cover lg:order-7 order-6 my-4 lg:px-8" />
          <div className="lg:w-1/2 w-full lg:order-6 order-7 lg:pr-8 lg:my-4">
            <h2 className="heading text-xl my-2 text-dark-quantum">Expertise Beyond the Horizon</h2>
            <p>Our team of experts is deeply passionate about the quantum leaps in technology that shape our world. They are here to guide you through the cosmos of gadgets, offering insights, tips, and advice to help you choose the perfect tech companion for your journey. At QuantumGalaxy, we understand that technology can sometimes seem like a vast and complex galaxy. That's why our experts are dedicated to making your exploration a seamless and enjoyable experience. We're here to ensure that you not only keep up with the latest advancements but also understand how these innovations can enhance your life.</p>
          </div>
          <img src={about4Image} className="lg:w-1/2 object-cover order-8 my-4 lg:px-8"/>
          <div className="lg:w-1/2 w-full order-9 lg:pl-8 lg:my-4">
            <h2 className="heading text-xl my-2 text-dark-quantum">Reach for the Stars</h2>
            <p>At QuantumGalaxy, we invite you to reach for the stars, explore the unknown, and embrace the infinite possibilities that technology has to offer. Our mission is not just to sell gadgets, but to be your companion on a journey of exploration, discovery, and inspiration. Whether you're a dreamer, an explorer, or a creator, your journey to the QuantumGalaxy starts here.</p>
          </div>
          <p className="w-full my-4 order-10">
            Experience the future. Explore the stars. Welcome to QuantumGalaxy, where we believe that the sky is not the limit, but just the beginning of a limitless universe of technological possibilities. We're excited to be your guiding light on this captivating journey, and we look forward to sharing the wonders of the QuantumGalaxy with you.
          </p>
        </div>
      </PageTransition>
    </>
  );
}
