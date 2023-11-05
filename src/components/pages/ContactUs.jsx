'use client'

import React, { useEffect, useState } from "react";
import PageTransition from "../PageTransition";
import { Link } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import contactBanner from "../../assets/contact.svg";
import emailIcon from "../../assets/sms_1.svg";
import callIcon from "../../assets/call-incoming.svg";

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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are completed
    if (formData.name && formData.email && formData.comment) {
      setMessage("Message sent.");
    } else if (!formData.name) {
      setMessage("Please enter your full name.");
    } else if (!formData.email) {
      setMessage("Please enter your email address.");
    } else if (!formData.comment) {
      setMessage("Please enter your message.");
    }
  };

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

        <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 my-8 flex flex-wrap w-full">
          <div className="lg:w-1/2 w-full text-justify lg:pr-8">
            <h2 className="heading text-xl my-2 text-dark-quantum">Send us a message</h2>
            <p>We're here to assist you every step of the way. Whether you have a question, need technical support, or simply want to share your feedback, our dedicated team is ready to listen and provide prompt assistance.</p>
            <div className="flex w-full my-12">
              <Link to="mailto:customercare@quantumgalaxy.ph" className="w-1/2 items-center flex flex-col text-center">
                <img src={emailIcon} className="w-12 h-12 aspect-square my-2" />
                <p className="heading font-medium">Email</p>
                <p className="sm:hidden">customercare@<br />quantumgalaxy.ph</p>
                <p className="hidden sm:block">customercare@quantumgalaxy.ph</p>
              </Link>
              <Link to="tel:+639123456789" className="w-1/2 items-center flex flex-col">
                <img src={callIcon} className="w-12 h-12 aspect-square my-2" />
                <p className="heading font-medium">Phone</p>
                <p className="">+63 912 345-6789</p>
              </Link>
            </div>
          </div>

          {/* MESSAGE FORM */}
          <div className="w-full lg:w-1/2 lg:pl-8 justify-center ">

            <form className="flex max-w-lg flex-col gap-4 mx-auto" onSubmit={handleSubmit}>
              <div>
                {/* NAME INPUT */}
                <div className="mb-2 block">
                  <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="name">Your full name</label>
                </div>
                <div className="flex">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-gray-500 dark:text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <input className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-transparent focus:ring-cyan-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-transparent dark:focus:ring-cyan-400 p-2.5 text-sm pl-10 rounded-lg" id="name" type="text" placeholder="QuantumGalaxy Customer" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required="" autoComplete="off" />
                  </div>
                </div>
              </div>
              <div>
                {/* EMAIL INPUT */}
                <div className="mb-2 block">
                  <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Your email</label>
                </div>
                <div className="flex">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 text-gray-500 dark:text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    </div>
                    <input className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-transparent focus:ring-cyan-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-transparent dark:focus:ring-cyan-400 p-2.5 text-sm pl-10 rounded-lg" id="email" type="email" placeholder="name@quantumgalaxy.ph" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required="" autoComplete="off" />
                  </div>
                </div>
              </div>
              <div>
                {/* COMMENT INPUT */}
                <div className="mb-2 block">
                  <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="comment">Your message</label>
                </div>
                <textarea className="block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50 text-sm bg-gray-50 border-gray-300 text-gray-900 focus:border-transparent focus:ring-cyan-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-transparent dark:focus:ring-cyan-400" id="comment" placeholder="Leave a comment..." required="" rows="4" value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })}></textarea>
              </div>
              <div>
                {/* FILE INPUT */}
                <div className="mb-2 block">
                  <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="file">Upload file</label>
                </div>
                <div className="flex">
                  <div className="relative w-full">
                    <input className="rounded-lg overflow-hidden block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-transparent focus:ring-cyan-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-transparent dark:focus:ring-cyan-400 text-sm" id="file" type="file" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">You can upload a screenshot for better assistance.</p>
              </div>
              <button type="submit" className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-quantum border border-transparent enabled:hover:bg-dark-quantum focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-quantum dark:focus:ring-cyan-800 rounded-lg focus:ring-2">
                <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">Submit</span>
              </button>
              {message && (
                <p className={`text-sm ${message === "Message sent." ? "text-dark-quantum" : "text-red-500"} mt-2`}>
                  {message}
                </p>
              )}
            </form>
          </div>

        </div>

      </PageTransition>
    </>
  );
}
