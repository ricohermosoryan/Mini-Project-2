import React from "react";
import about from "../../assets/about.svg";

export default function AboutUs() {
  return (
    <>
      <div className="">
        <img
          className=" lg:object-cover lg:w-[4200px] lg:h-[250px]"
          src={about}
        />

        <div className=" text-white heading text-[20px] font-semibold my-[-60px] ms-[150px] md:my-[-106px] md:text-[28px] md:ms-[350px] lg:text-[40px] lg:my-[-170px] lg:ms-[900px]">
          ABOUT
          <div className="w-[40px] h-[0px] absolute left-[165px] md:left-[370px] lg:left-[936px] border-2 border-neutral-200 border-opacity-70 md:w-[55px] lg:w-[65px]"></div>
        </div>
      </div>
      <div className="text-xl font-medium flex justify-center mt-[130px] mb-9 text-center md:mt-[200px] lg:mt-[360px] lg:text-[30px] lg:font-semibold">
        Welcome to QuantumGalaxy, where we bring the future to your fingertips.
      </div>
      <div className="container mx-auto">
        <div className=" heading text-[32px] font-semibold mb-7">
          Our Vision
        </div>
        <div className="text-xl font-normal mb-7 ms-3 lg:ms-10">
          At QuantumGalaxy, we're on a mission to redefine innovation and
          transform the way you experience technology. With the ever-expanding
          universe of gadgets and gizmos, we believe in reaching for the stars,
          both figuratively and literally.
        </div>
        <div className="heading text-[32px] font-semibold mb-7">
          Your Gateway to the Future
        </div>
        <div className="text-xl font-normal mb-7 ms-3 lg:ms-10">
          Our store is more than just a place to buy the latest gadgets; it's a
          portal to the QuantumGalaxy. We curate a universe of cutting-edge
          tech, from mind-bending virtual reality to awe-inspiring gaming
          experiences, and everything in between. Our products are carefully
          selected to transport you to a realm of possibilities, where
          innovation knows no bounds.
        </div>
        <div className=" heading text-[32px] font-semibold mb-7">
          Expertise Beyond the Horizon
        </div>
        <div className="text-xl font-normal mb-7 ms-3 lg:ms-10">
          Our team of experts is passionate about the quantum leaps in
          technology. They're here to guide you through the cosmos of gadgets,
          offering insights, tips, and advice to help you choose the perfect
          tech companion for your journey.
        </div>
        <div className=" heading text-[32px] font-semibold mb-7">
          Reach for the Stars
        </div>
        <div className="text-xl font-normal mb-8 ms-3 lg:ms-10">
          At QuantumGalaxy, we invite you to reach for the stars, explore the
          unknown, and embrace the infinite possibilities that technology has to
          offer. Your journey to the QuantumGalaxy starts here.
          <br />
          <br />
          Experience the future. Explore the stars. Welcome to QuantumGalaxy.
        </div>
      </div>
    </>
  );
}
