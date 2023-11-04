import React, { useState } from "react";
import PageTransition from "../PageTransition";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";
import privacyPolicyBanner from "../../assets/privacypolicy.svg";

export default function PrivacyPolicy() {
  
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
                Privacy Policy
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        {/* BANNER */}
        <div className="w-full relative">
          <img src={privacyPolicyBanner} className="w-full object-cover" />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 heading text-2xl text-white text-center">Privacy Policy</h1>
        </div>

        <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 my-8 text-justify">

          <p className="my-2">Our Privacy Policy was updated on September 28, 2023.</p>
          <p className="my-2">Please take a moment to familiarize yourself with our privacy practices and let us know if you have any questions.</p>

          <h2 className="heading text-xl text-dark-quantum mt-4 mb-1 text-left">INTRODUCTION</h2>

          <p className="my-2">Understanding the importance of your privacy and the data given to us, QuantumGalaxy has committed to the strict compliance of processing them based on this outline and in compliance with Republic Act 10173 or the Data Privacy Act of 2012 (DPA), along with its implementing rules and regulations (IRR). QuantumGalaxy  shall regularly review the sufficiency and accuracy of this policy. We reserve the right to modify or change the privacy policy at any time.</p>

          <h2 className="heading text-xl text-dark-quantum mt-4 mb-1 text-left">COLLECTION OF DATA (Personal and Sensitive Information)</h2>

          <p className="my-2">By ordering/registering in QuantumGalaxy, you voluntarily disclose to us personal data which may include sensitive personal information (such as: Name, Address, Emails, Contact Information, and alike). Such data attained will only be processed upon your express consent freely given and will only be used within a primary purpose of collection and other matters/concerns within the context allowed by the DPA and its IRR. Some of the uses, among others, are as follows:</p>
          <ul className="my-2">
            <li className="list-disc list-inside">Use, access and denial access (if data would show that QuantumGalaxy does not cater to a certain individual – i. minors and infringers) of QuantumGalaxy online and its services;</li>
            <li className="list-disc list-inside">Processing of orders (selection, reservation as well as payment);</li>
            <li className="list-disc list-inside">Delivery (we may share your data to a third party/partner to make the delivery of the order – i. courier or ride hailing application/service);</li>
            <li className="list-disc list-inside">Administration of account (client/customer research, verification and monitoring of inventories);</li>
            <li className="list-disc list-inside">Direct Marketing and Advertisements;</li>
            <li className="list-disc list-inside">Information and updates; and</li>
            <li className="list-disc list-inside">Other instances allowed by local and international laws.</li>
          </ul>

          <p className="my-2">QuantumGalaxy may share your personal data with third parties and our affiliates for the abovementioned purposes, specifically completing transactions with you, managing your account and our relationship with you and fulfilling any legal or regulatory requirements and requests as deemed necessary. In doing so, we commit to ensure that these parties keep your personal data secure from unauthorized access, collection, use, disclosure or other similar risks and retain your personal data only for as long as they need your data to fulfill abovementioned purposes.</p>

          <h2 className="heading text-xl text-dark-quantum mt-4 mb-1 text-left">WITHDRAWAL OF CONSENT</h2>

          <p className="my-2">The Data Subject also has the right to withdraw consent. Such may be made by a request (written or electronic) addressed to us or sent through our email provided below. However, QuantumGalaxy reserves the right to inform and discontinue providing its services or performing any other transactions in certain instances depending on the extent of the consent withdrawal.</p>

          <h2 className="heading text-xl text-dark-quantum mt-4 mb-1 text-left">COMMITMENT TO LAWFUL PROCESSES</h2>

          <p className="my-2">As part of our community, you hereby agree and authorize QuantumGalaxy to disclose personal information in any legal and regulatory enforcement and/or public authority within the framework of and in compliance with the DPA and its IRR. Such instances may be for:</p>
          <ul className="my-2">
            <li className="list-disc list-inside">Regulation purposes</li>
            <li className="list-disc list-inside">Legal purposes</li>
            <li className="list-disc list-inside">Law enforcement</li>
            <li className="list-disc list-inside">Compliance of a Legal Order</li>
          </ul>

          <p className="my-2">WITH THIS CONCERNS, YOU HEREBY WAIVE ANY RIGHT OF ACTION REGARDING THE DISCLOSURE OF YOUR PERSONAL AND SENSITIVE INFORMATION ACCORDING TO THE PURPOSE AND INSTANCES ABOVEMENTIONED.</p>

          <h2 className="heading text-xl text-dark-quantum mt-4 mb-1 text-left">COOKIES</h2>

          <p className="my-2">QuantumGalaxy may use cookies and other online technologies in the storage of data aimed to provide a better experience in using our website and other platforms.</p>

          <h2 className="heading text-xl text-dark-quantum mt-4 mb-1 text-left">SPAMS, VIRUSES, SPYWARES, AND OTHER SECURITY THREATS</h2>

          <p className="my-2">QuantumGalaxy does not tolerate Spams, Viruses and Spywares. Likewise, we request from you to not use any email or accounts which may contain the same. For any suspicion on your messages and emails, please do contact us in the information as provided in the “Complaints Section” below.</p>

          <h2 className="heading text-xl text-dark-quantum mt-4 mb-1 text-left">PERSONAL INFORMATION SECURITY</h2>

          <p className="my-2">QuantumGalaxy ensures that all information collected will be safely and securely stored. We protect your personal information by:</p>
          <ul className="my-2">
            <li className="list-disc list-inside">Restricting access to personal information</li>
            <li className="list-disc list-inside">Maintaining technology products to prevent unauthorized computer access</li>
            <li className="list-disc list-inside">Securely destroying your personal information when it is no longer needed for any legal or business purpose</li>
          </ul>

          <p className="my-2">If you believe that your privacy has been breached by QuantumGalaxy, please contact us at our e-mail address below.</p>

          <p className="my-2">Your password is the key to your account. Please use unique numbers, letters and special characters, and do not share your QuantumGalaxy password to anyone. If you do share your password with others, you will be responsible for all actions taken in the name of your account and the consequences. If you lose control of your password, you may lose substantial control over your personal information and other information submitted to QuantumGalaxy. You could also be subject to legally binding actions taken on your behalf. Therefore, if your password has been compromised for any reason or if you have grounds to believe that your password has been compromised, you should immediately contact us and change your password. You are reminded to log off of your account and close the browser when finished using a shared computer.</p>

          <h2 className="heading text-xl text-dark-quantum mt-4 mb-1 text-left">INQUIRIES AND COMPLAINTS</h2>

          <p className="my-2"><span className="font-semibold">General:</span> Every data subject has the right to reasonable access to his or her personal data being processed by the personal information controller or personal information processor.</p>

          <p className="my-2">Other available rights, subject to the provisions of this manual, include: (1) right to dispute the inaccuracy or error in the personal data; (2) right to request the suspension, withdrawal, blocking, removal or destruction of personal data; and (3) right to complain and be indemnified for any damages sustained due to inaccurate, incomplete, outdated, false, unlawfully obtained or unauthorized use of personal data.</p>

          <p className="my-2"><span className="font-semibold">Right to Inquiry:</span> Data subjects may inquire or request for information regarding any matter relating to the processing of their personal data under the custody of QuantumGalaxy, including the data privacy and security policies implemented to ensure the protection of their personal data. They may write to QuantumGalaxy at <a href="mailto:dataprivacy@quantumgalaxy.ph" className="text-dark-quantum hover:text-quantum">dataprivacy@quantumgalaxy.ph</a> and briefly discuss the inquiry, together with their contact details for reference.</p>

          <p className="my-2"><span className="font-semibold">Complaints:</span> Complaints shall be filed in three (3) printed copies, or sent to <a href="mailto:dataprivacy@quantumgalaxy.ph" className="text-dark-quantum hover:text-quantum">dataprivacy@quantumgalaxy.ph</a>. The concerned department or unit shall confirm with the complainant its receipt of the complaint.</p>

        </div>
      </PageTransition>
    </>
  );
}
