import React from "react";
import { Link } from "react-router-dom";
import quantumLogoImage from "../assets/logo.svg";
import earthImage from "../assets/earth.svg";
import inputImage from "../assets/input.svg";
import arrowRightImage from "../assets/arrow-right.svg";
import { socialLinks, socialLinksExceptNewsletter } from "./Navbar";

export default function Footer() {
  const footerAboutUsList = [
    { name: "About QuantumGalaxy", href: "/about" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Contact Us", href: "/contactus" },
  ];

  const footerResourcesList = [
    { name: "Blogs", href: "/blogs" },
    { name: "News", href: "/news" },
    { name: "Reviews", href: "/reviews" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <>
      {/* FOOTER */}
      <footer className="bg-dark-blue mt-12">
        {/* MAIN FOOTER */}
        <div className="container lg:grid lg:grid-cols-2 gap-x-60 mx-auto text-white py-16 px-2">
          {/* MAIN FOOTER - LEFT */}
          <div>
            <img src={quantumLogoImage} className="w-max h-max aspect-auto" />
            <div className="heading text-lg font-medium text-white py-2">
              Your one-stop shop for the latest and greatest tech gadgets.
            </div>
            <div className="heading text-base text-white py-2">
              Discover the latest tech trends and products where innovation
              meets possibility! Join our newsletter for updates, exclusive
              offers, and more!
            </div>
            <div id="newsletter" className="flex max-w-lg my-4 border rounded-lg px-3 py-1">
              <img src={inputImage} className="w-8 aspect-square" />
              <input
                type="text"
                className="grow bg-transparent text-white text-base py-0 my-0 border-none focus:ring-0 focus:border-none"
                placeholder="Email address"
              />
              <img src={arrowRightImage} className="w-4 aspect-square" />
            </div>
          </div>

          {/* MAIN FOOTER - RIGHT */}
          <div>
            <div className="grid grid-cols-2 mt-10 lg:mt-0">
              <div className="mb-8">
                <div className="heading text-base text-white font-medium mb-4">
                  ABOUT US
                </div>
                <nav>
                  {footerAboutUsList.map((item, i) => (
                    <div
                      key={i}
                      className="text-base text-white font-medium py-1 border-b border-transparent hover:text-quantum"
                    >
                      <Link to={item.href}>{item.name}</Link>
                    </div>
                  ))}
                </nav>
              </div>
              <div className="mb-8">
                <div className="heading text-base text-white font-medium mb-4">
                  RESOURCES
                </div>
                <nav>
                  {footerResourcesList.map((item, i) => (
                    <div
                      key={i}
                      className="text-base text-white font-medium py-1 border-b border-transparent hover:text-quantum"
                    >
                      <Link to={item.href}>{item.name}</Link>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
            <div className="mb-8">
              <div className="heading text-base text-white font-medium mb-4">
                LET'S CONNECT
              </div>
              <div className="flex gap-x-6">
                {socialLinksExceptNewsletter.map((item, i) => (
                  <nav key={i}>
                    <a href={item.href} target="_blank">
                      <img
                        src={item.icon}
                        className="w-12 aspect-square cursor-pointer"
                        alt={item.name}
                      />
                    </a>
                  </nav>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SUBFOOTER */}
        <div className="bg-black">
          <div className="container mx-auto py-3 lg:flex justify-between items-center text-sm text-white px-2">
            <div>
              &copy; &nbsp;2023&nbsp; QuantumGalaxy&trade;.&nbsp; All Rights
              Reserved.
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div>Philippines / English</div>
                <img src={earthImage} className="w-4 aspect-square" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
