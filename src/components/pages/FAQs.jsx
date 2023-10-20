import React, { useState } from "react";
import banner from "../../assets/FAQs.svg";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "../PageTransition";

export default function FAQs() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const question = [
    {
      id: 1,
      question:
        "Can I purchase products from Quantum Galaxy using Installment payment?",
      answer:
        "Yes, Quantum Galaxy offers the option to purchase products using both cash and installment payments. This allows you to choose the payment method that suits your needs and budget",
    },
    {
      id: 2,
      question: "How can I engage with the magazine content on Quantum Galaxy?",
      answer:
        "You can actively engage with the magazine content by leaving comments and participating in the question-and-answer section. Feel free to share your thoughts, ask questions, and interact with fellow tech enthusiasts in the community.",
    },
    {
      id: 3,
      question: "Does Quantum Galaxy offer a warranty on its products?",
      answer:
        "Yes, Quantum Galaxy provides a warranty on all eligible products. The specific warranty details may vary depending on the manufacturer and product category. Please refer to the product description or contact our customer support for more information..",
    },
    {
      id: 4,
      question: "Is Quantum Galaxy a secure platform for online shopping?",
      answer:
        "Yes, Quantum Galaxy provides a warranty on all eligible products. The specific warranty details may vary depending on the manufacturer and product category. Please refer to the product description or contact our customer support for more information.",
    },
    {
      id: 5,
      question:
        "How can I get assistance with my purchase or any other inquiries?",
      answer:
        "If you need assistance with your purchase or have any questions, our dedicated customer support team is here to help. You can reach out to us through the contact page on our website, and we'll be happy to assist you promptly.",
    },
  ];
  return (
    <>
      <PageTransition>
        <div className="banner">
          <img src={banner} alt="image" className="lg:w-screen" />
        </div>
        <div className=" text-white heading w-[300px] md:w-[500px] lg:w-[600px] text-[16px] font-semibold my-[-40px] ms-[80px] md:my-[-80px] md:text-[28px] md:ms-[180px] lg:text-[40px] lg:my-[-170px] lg:ms-[700px]">
          FREQUENTLY ASK QUESTIONS
          <div className="w-[40px] h-[0px] absolute left-[165px] md:left-[370px] lg:left-[936px] border-2 border-gray-300 border-opacity-90 md:w-[55px] lg:w-[65px]"></div>
        </div>

        {/* Accordion */}
        <div className="mt-[80px] md:mt-[160px] lg:mt-[340px]">
          <div className="w-[89%] m-auto max-w-[1400px] bg-gray-300 p-4 rounded-lg shadow-md">
            {question.map((q) => (
              <div key={q.id} className="mb-4 last:mb-0">
                <button
                  className="w-full text-left text-[14px] md:text-[20px] lg:text-[33px] focus:outline-none p-3 bg-gray-100 rounded-lg shadow-md flex justify-between items-center font-semibold"
                  onClick={() =>
                    setActiveQuestion(activeQuestion === q.id ? null : q.id)
                  }
                >
                  {q.question}
                  {activeQuestion === q.id ? (
                    <FaMinusCircle />
                  ) : (
                    <FaPlusCircle />
                  )}
                </button>
                <AnimatePresence>
                  {activeQuestion === q.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 text-gray-600 ml-4 md:text-[20px] lg:text-[27px]"
                    >
                      <p>{q.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </PageTransition>
    </>
  );
}
