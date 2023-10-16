import React from "react";
import { Link } from "react-router-dom";
import quantumLogoImage from "../assets/logo.svg";
import earthImage from "../assets/earth.svg";
import inputImage from "../assets/input.svg";
import arrowRightImage from "../assets/arrow-right.svg";
import { socialLinks, socialLinksExceptNewsletter } from "./Navbar";

export default function Footer() {
  const footerAboutUsList = [
    { name: "About QuantumGalaxy", href: "" },
    { name: "Leadership Team", href: "" },
    { name: "Privacy Policy", href: "" },
    { name: "Contact Us", href: "" },
  ];

  const footerResourcesList = [
    { name: "Blogs", href: "" },
    { name: "News", href: "" },
    { name: "Reviews", href: "" },
    { name: "FAQ", href: "" },
  ];

  return (
    <>

      {/* MAIN FOOTER */}
      <div className="bg-dark-blue mt-12">
        <div className="container grid grid-cols-2 gap-x-60 mx-auto text-white py-16">
          
          {/* MAIN FOOTER - LEFT */}
          <div>
            <img src={quantumLogoImage} className="w-max h-max aspect-auto" />
            <div className="heading text-lg font-medium text-white py-2">Your one-stop shop for the latest and greatest tech gadgets.</div>
            <div className="heading text-base text-white py-2">Discover the latest tech trends and products where innovation meets possibility! Join our newsletter for updates, exclusive offers, and more!</div>
            <div className="flex max-w-lg my-4 border rounded-lg px-3 py-1">
              <img src={inputImage} className="w-8 aspect-square"/>
              <input type="text" className="grow bg-transparent text-white text-base py-0 my-0 border-none focus:ring-0 focus:border-none" placeholder="Email address" />
              <img src={arrowRightImage} className="w-4 aspect-square" />
            </div>
          </div>

          {/* MAIN FOOTER - RIGHT */}
          <div>
            <div className="grid grid-cols-2">
              <div className="mb-8">
                <div className="heading text-base text-white font-medium mb-4">ABOUT US</div>
                <div>
                  {footerAboutUsList.map((item, i) => (
                    <div key={i} className="text-base text-white font-medium py-1 border-b border-transparent hover:text-quantum">
                      <Link to={item.href}>{item.name}</Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <div className="heading text-base text-white font-medium mb-4">RESOURCES</div>
                <div>
                  {footerResourcesList.map((item, i) => (
                    <div key={i} className="text-base text-white font-medium py-1 border-b border-transparent hover:text-quantum">
                      <Link to={item.href}>{item.name}</Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-8">
              <div className="heading text-base text-white font-medium mb-4">LET'S CONNECT</div>
              <div className="flex gap-x-6">
                {socialLinksExceptNewsletter.map((item, i) => (
                  <div key={i}>
                    <a href={item.href} target="_blank">
                      <img
                        src={item.icon}
                        className="w-12 aspect-square cursor-pointer"
                        alt={item.name}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUBFOOTER */}
      <div className="bg-black">
        <div className="container mx-auto py-3 flex justify-between items-center text-sm text-white">
          <div>&copy; &nbsp;2023&nbsp; QuantumGalaxy&trade;.&nbsp; All Rights Reserved.</div>
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div>Philippines / English</div>
              <img src={earthImage} className="w-4 aspect-square" />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
