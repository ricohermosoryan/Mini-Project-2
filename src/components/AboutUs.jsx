import React from "react";
import about from "../assets/about.svg";

export default function AboutUs() {
  return (
    <>
      <div className="relative">
        <img className="w-full object-cover h-[270px]" src={about} />

        <div className="left-[943px] top-[106px] absolute text-white heading text-[32px] font-semibold">
          ABOUT
          <div className="w-14 h-[0px] absolute left-[27px] border-2 border-neutral-200 border-opacity-70"></div>
        </div>
      </div>
      <div className="text-xl font-medium flex justify-center mt-9 mb-9">
        Welcome to QuantumGalaxy, where we bring the future to
        your fingertips.
      </div>
      <div className="container mx-auto">
        <div className=" heading text-[32px] font-semibold mb-7">
          Our Vision
        </div>
        <div className="text-xl font-normal mb-7 ms-10">
          At QuantumGalaxy, we're on a mission to redefine innovation and
          transform the way you experience technology. With the ever-expanding
          universe of gadgets and gizmos, we believe in reaching for the stars,
          both figuratively and literally.
        </div>
        <div className="heading text-[32px] font-semibold mb-7">
          Your Gateway to the Future
        </div>
        <div className="text-xl font-normal mb-7 ms-10">
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
        <div className="text-xl font-normal mb-7 ms-10">
          Our team of experts is passionate about the quantum leaps in
          technology. They're here to guide you through the cosmos of gadgets,
          offering insights, tips, and advice to help you choose the perfect
          tech companion for your journey.
        </div>
        <div className=" heading text-[32px] font-semibold mb-7">
          Reach for the Stars
        </div>
        <div className="text-xl font-normal mb-8 ms-10">
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
