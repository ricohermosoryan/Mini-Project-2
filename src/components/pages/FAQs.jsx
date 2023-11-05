'use client'

import React, { useEffect } from "react";
import banner from "../../assets/FAQs.svg";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "../PageTransition";
import { Breadcrumb, Accordion } from "flowbite-react";
import { Link } from "react-router-dom";
import faqBanner from "../../assets/faq.svg";

export default function FAQs() {
  useEffect(() => {
    const scrollPosition = window.scrollY;

    // Set the scroll position based on the condition
    if (scrollPosition === 0) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 48);
    }
  }, []);

  const question = [
    {
      id: 1,
      question:
        "HOW DO I ORDER?",
      answer:
        "Ordering from QuantumGalaxy is as easy as 1-2-3! Just follow these steps: \n\n&nbsp;1. Create an account. \n&nbsp;2. Search for the item or browse until you find something you like and press Add to Cart. \n&nbsp;3. Fill out the details and choose the payment method you prefer. \n\nAll purchases are considered final and prices are subject to change without prior notice.",
    },
    {
      id: 2,
      question: "ARE ALL YOUR ITEMS ORIGINAL AND AUTHENTIC?",
      answer:
        "Yes, all products sold at QuantumGalaxy are brand new, sealed, and original! We take authenticity seriously. We do not sell counterfeit items.",
    },
    {
      id: 3,
      question: "IN WHAT CURRENCY ARE YOUR PRODUCTS DENOMINATED?",
      answer:
        "All items are denominated in Philippine Pesos (&#8369;).",
    },
    {
      id: 4,
      question: "WHAT IS YOUR WARRANTY POLICY?",
      answer:
        "Here at QuantumGalaxy, we value our customers and understand the need for after-sales support. Unlike other fly-by-night online gadget stores, we stick to our warranty policies. By purchasing at QuantumGalaxy, you agree and accept the warranty and repair policies clearly stated below: \n\nThe date of purchase is considered as the first day of warranty period. \n\nGadgets have life spans and naturally wear and tear over time. This also depends on your usage. All sales are final. Unit replacement due to change of color or product model indecision is not possible. \n\n**BASIS FOR WARRANTY** \nPlease do not lose the Warranty Slip given to you upon purchase. \n\nNo warranty slip, no warranty policy applies – this verifies that you bought the item with that specific serial number from us. No technical support is available for items bought outside of QuantumGalaxy. \n\nRefer to the warranty indicated in the item’s description on the website only. QuantumGalaxy does not reissue or keep your information from the warranty slip; it is the customer’s duty to store this form in a safe area. \n\n**OUR TECHNICAL PERSONNEL** \nAll QuantumGalaxy technical team members are well-equipped, licensed and certified technicians capable of doing everything from assessing conditions, simple software updates to the most difficult tasks. \n\n**FOR ITEMS PAST WARRANTY PERIOD** \nItems past their warranty period can still be diagnosed and repaired if possible. The customer however shall shoulder expenses for parts, labor, and shipping.",
    },
    {
      id: 5,
      question:
        "WHAT ARE MY PAYMENT OPTIONS?",
      answer:
        "QuantumGalaxy accepts a host of hassle-free payment options for everyone! \n\nINSTALLMENT payments are available through Billease, Atome, and options provided by GCash and Maya. \n\n**CREDIT CARD/DEBIT CARD via Visa, Mastercard, Paymaya or Paymongo** \nFor Credit Card and Debit Cardholders, we accept one-time straight payments via Paymaya and Paymongo. Just choose “Online Payment” upon checkout for guided instructions on how to proceed with your payment. \n\n**E-WALLET thru GCash, GrabPay, and Maya (formerly PayMaya)** \nGCash payments are only done through QR Code. QuantumGalaxy does not accept GCash transfers via mobile number. \n\n**NON-BANK PAYMENTS OPTIONS via Cebuana Lhuillier** \nCASH ON PICK-UP thru Technopop partner stores with minimum reservation fee of &#8369;500. \n\n**CASH ON DELIVERY** \nOrder now and pay when your item arrives at your front door! Please note that we have limited a maximum of &#8369;70,000 purchase limit for Cash-on-Delivery (COD) transactions for Metro-Manila and provincial areas. \n\n**BANK TRANSFER/DEPOSIT via local banks listed below:** \n&nbsp;- PNB \n&nbsp;- BDO \n&nbsp;- UnionBank",
    },
    {
      id: 6,
      question:
        "DO YOU DO SAME DAY DELIVERY?",
      answer:
        "Same Day Delivery is currently only available within Metro Manila. Same Day Delivery is on payment first before delivery policy. The delivery rate is based on the rates provided by our courier partner Grab Express via their Grab Express App. Payment can be settled via GCash, or Bank Transfer through Instapay at BDO or Unionbank.",
    },
    {
      id: 7,
      question:
        "WHERE CAN I SEND MY PROOF OF PAYMENT?",
      answer:
        "You can send your proof of payment to [payments@quantumgalaxy.ph](mailto:payments@quantumgalaxy.ph) together with the Purchase Order Number.",
    },
    {
      id: 8,
      question:
        "HOW DOES ATOME INSTALLMENT WORK?",
      answer:
        "Make payments easier and more affordable with Atome Installment. Just select Atome at checkout and Atome will split your bill into 3 equal payments. Make the first payment at checkout, and make the next payments 30 days apart with 0% interest and no hidden charges. Limits depend on your registered payment method on Atome with up to &#8369;15,000 for debit and up to &#8369;50,000 for credit card. \n\nFor more info, go to: [https://www.atome.ph/](https://www.atome.ph/)",
    },
    {
      id: 9,
      question:
        "HOW DOES BILLEASE INSTALLMENT WORK?",
      answer:
        "We’ve partnered with BillEase Buy Now, Pay Later to provide you with a cardless credit at checkout. First time BillEase users can avail installment payment options on orders up to &#8369;40,000, with multiple options on how many installments and downpayment. \n\nLearn more by going to: [https://billease.ph/](https://billease.ph/)",
    },
    {
      id: 10,
      question:
        "WHAT ARE YOUR STANDARD DELIVERY LEAD TIMES?",
      answer:
        "Our delivery lead time for Metro Manila is 2-4 business days; For Luzon Area, 5-7 business days; and for Visayas and Mindanao, it is 7-10 business days. Please note that delivery times can be affected by extreme weather conditions, seasonal demand peaks, and other factors. Refer to your tracking number to see where your package is. For unusual circumstances, please contact customer service.",
    },
    {
      id: 11,
      question:
        "WHO ARE YOUR COURIER PARTNERS?",
      answer:
        "QuantumGalaxy’s trusted partner couriers are Entrego, Gogo, and Grab Express. Delivery through LBC can be considered as an alternative on a case-to-case basis. If your location is not within the serviceable area of our main partner couriers, however, shipping fees will be according to LBC rates and payment must be settled first before delivery. Cash On Pickup is currently not available thru LBC. ",
    },
    {
      id: 12,
      question:
        "WHAT DO I DO WHEN I RECEIVE MY ITEM?",
      answer:
        "Congratulations on your purchase! All items shipped out by QuantumGalaxy are double-checked to make sure they are complete and in pristine condition. \n\nWhen you receive your order, please take a video of your unboxing and make sure all items in your order are received and have no external defects. If QuantumGalaxy does not receive any report of external defect within twenty four (24) hours from receipt of your item it means that you received it free from external defect. Documenting your receipt and unboxing can help in case of disputes with the courier or other problems with your order. \n\nSend us an email at [customercare@quantumgalaxy.ph](mailto:customercare@quantumgalaxy.ph). You can also call/text [+63 912 345-6789](tel:+63 912 345-6789). We can also attend to your needs via our official social media channels. \n\nBy purchasing at QuantumGalaxy, you agree and accept the warranty and repair policies as stated here.",
    },
    {
      id: 13,
      question:
        "CAN I RETURN AND/OR REPLACE MY ITEM?",
      answer:
        "QuantumGalaxy follows returns and replacements as outlined by Republic Act (R.A.) 7394 or the Consumer Act of the Philippines. Only defective products can be returned or exchanged. Customers who change their mind are not entitled to a refund or exchange. If you received a defective item, please contact: [customercare@quantumgalaxy.ph](mailto:customercare@quantumgalaxy.ph) with the following details: \n\n&nbsp;- Order Number \n&nbsp;- Photo/Video of Defective Item \n&nbsp;- Delivery Note/Warranty Receipt \n&nbsp;- Short description of concern \n\n**Contact Details** \nSend us an email at [customercare@quantumgalaxy.ph](mailto:customercare@quantumgalaxy.ph). You can also call/text [+63 912 345-6789](tel:+63 912 345-6789). We can also attend to your needs via our official social media channels: \n\n&nbsp;- **Facebook**: [facebook.com/QuantumGalaxyPH](https://www.facebook.com) \n&nbsp;- **Twitter**: [twitter.com/quantumgalaxyph](https://twitter.com) \n&nbsp;- **Instagram**: [instagram.com/quantumgalaxyph/](https://www.instagram.com) \n&nbsp;- **Youtube**: [youtube.com/@QuantumGalaxyPH](https://www.youtube.com) \n\nThese are the only OFFICIAL channels of QuantumGalaxy.ph. Please report fraud/fake accounts.",
    },
    {
      id: 14,
      question:
        "DO YOU HAVE A PHYSICAL STORE?",
      answer:
        "QuantumGalaxy is an e-commerce retail company. The website exists in cyberspace’s 1s and 0s. We do not have a physical store but you can try the omni-channel shopping experience with our partner stores TechnoPop and online at: \n\n&nbsp;- **Official Website**: [QuantumGalaxy.ph](/home) \n&nbsp;- **Lazada**: [lazada.com.ph/quantumgalaxypg](https://www.lazada.com.ph) \n&nbsp- **Shopee**: [shopee.ph/quantumgalaxyph](https://shopee.ph)",
    },
    {
      id: 15,
      question:
        "WHAT ARE YOUR STORE HOURS?",
      answer:
        "You can order from QuantumGalaxy 24 hours a day, 7 days a week! Meanwhile, Customer Support lines are open 8:00 AM to 10:00 PM Mondays to Saturdays, and 08:30 AM to 06:00 PM on Sundays.",
    },
    {
      id: 16,
      question:
        "HOW DO I TRACK MY ORDER?",
      answer:
        "As a policy, as soon as we have sent your package for shipping, the tracking number will immediately be sent to you via email and SMS within 24-48 hours after checkout. You may also contact us at [orders@quantumgalaxy.ph](mailto:orders@quantumgalaxy.ph) if you still haven't received the tracking number. Keep your tracking number secure and private. \n\nYou can also track your order thru this link: [https://www.quantumgalaxy.ph/tracking](https://www.quantumgalaxy.ph/tracking)",
    },
    {
      id: 17,
      question:
        "DO YOU DO PRE-ORDERS?",
      answer:
        "Pre-orders are only available on a case to case basis. Pre-orders are available with a reservation fee required. For further assistance, contact us [orders@quantumgalaxy.ph](mailto:orders@quantumgalaxy.ph) or to our active hotline number for call/text [+63 912 345-6789](tel:+63 912 345-6789)",
    },
    {
      id: 18,
      question:
        "CAN I ORDER OUTSIDE OF THE PHILIPPINES?",
      answer:
        "We currently don't serve international orders on a large scale. You may get in touch with us if you need help with orders of this nature as we can work out a plan for your order. \n\nYou can order from outside of the Philippines provided the item will be delivered to a Philippine address. ",
    },
    {
      id: 19,
      question:
        "HOW DO I REACH YOU FOR TIE-UPS, SPEAKING ENGAGEMENT, GUESTINGS, PARTNERSHIPS, DEALERSHIPS, AND SPONSORSHIP PROPOSALS?",
      answer:
        "Yes, we’d love to hear your ideas and proposals. Send us the complete details at [hello@quantumgalaxy.ph](mailto:hello@quantumgalaxy.ph) and we'll get back to you as soon as possible. \n\n**Got more questions?** \nNeed help on other stuff? Contact us on these channels and we will get back to you as soon as possible. \n\n&nbsp;- **Email**: [customercare@quantumgalaxy.ph](mailto:customercare@quantumgalaxy.ph) \n&nbsp;- **Mobile**: [+63 912 345-6789](tel:+63 912 345-6789)",
    },
  ];

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
                FAQs
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        {/* BANNER */}
        <div className="w-full relative">
          <img src={faqBanner} className="w-full object-cover" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="heading text-2xl lg:text-3xl xl:text-4xl text-white text-center whitespace-nowrap">FREQUENTLY ASKED QUESTIONS</h1>
            <div className="h-1 w-12 lg:w-14 xl:w-16 bg-white mx-auto my-1"></div>
          </div>
        </div>

        {/* ACCORDION */}
        <div className="container mx-auto px-0 sm:px-4 md:px-8 lg:px-12 my-8 text-justify">
          <Accordion flush>
            {question.map((q) => (
              <Accordion.Panel key={q.id}>
                <Accordion.Title><p className="heading text-dark-quantum text-lg">{q.question}</p></Accordion.Title>
                <Accordion.Content>
                  <div className="px-2 mb-2 text-gray-600 dark:text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: q.answer
                        .replace(/\n/g, "<br>")
                        .replace(/^\s*-\s+/gm, "<li>")
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>'),
                    }}
                  />
                </Accordion.Content>
              </Accordion.Panel>
            ))}
          </Accordion>
        </div>
      </PageTransition>
    </>
  );
}
