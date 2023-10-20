"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import starImage from "../../assets/star.svg";
import { formatter } from "./Products";
import shopImage from "../../assets/shop.svg";
import verifyImage from "../../assets/verify.svg";
import truckImage from "../../assets/truck.svg";
import speedyTruckImage from "../../assets/speedytruck.svg";
import shieldImage from "../../assets/shield.svg";
import alertImage from "../../assets/alert.svg";
import atomeImage from "../../assets/atome.svg";
import billeaseImage from "../../assets/billease.svg";
import billeaseBaselineImage from "../../assets/billease-baseline.svg";
import gcashImage from "../../assets/gcash.svg";
import mastercardImage from "../../assets/mastercard.svg";
import mayaImage from "../../assets/maya.svg";
import visaImage from "../../assets/visa.svg";
import { Tabs } from "flowbite-react";
import { motion } from "framer-motion";
import PageTransition from "../PageTransition";

export default function Product() {
  const { id } = useParams();
  const [data, setData] = useState({ image: [], features: [] });
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    axios
      .get(
        `https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/products/${id}`
      )
      .then((res) => {
        setData(res.data);
        setSelectedImage(res.data.image[0]);
        setLoading(false);
      })
      .catch((err) => console.error(err));
    return controller.abort();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
      <PageTransition>
        <div>
          <div className="flex flex-wrap justify-center">
            {loading ? (
              // Loading image
              <div className="flex justify-center text-center mb-11 mt-10">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-quantum"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              // Product Details
              <div className="container px-4">
                <div className="flex flex-wrap md:flex-nowrap gap-x-10 my-10">
                  {/* IMAGE GALLERY */}
                  <div className="w-full">
                    <div>
                      <img
                        src={selectedImage}
                        className="w-full aspect-auto shadow rounded-t-lg"
                      />
                    </div>
                    <div className="flex justify-center overflow-x-scroll shadow rounded-b-lg">
                      {data.image.map((image) => (
                        <img
                          key={image}
                          src={image}
                          className="w-1/5 aspect-auto m-1 rounded cursor-pointer hover:shadow"
                          onClick={() => handleImageClick(image)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="w-full">
                    {/* PRODUCT NAME */}
                    {data.title && (
                      <p className="heading text-xl font-semibold my-2">
                        {data.title}
                      </p>
                    )}

                    {/* PRODUCT RATING */}
                    <div className="flex gap-4 my-2">
                      <div className="flex gap-1 bg-quantum text-white w-max p-1.5 rounded-md">
                        <img src={starImage} className="w-4 aspect-square" />
                        {data.rating && (
                          <p className="text-sm font-bold">
                            {data.rating.rate}
                          </p>
                        )}
                      </div>
                      <div className="border w-px"></div>
                      <div className="my-auto">
                        {data.rating && <p>sold {data.rating.count}</p>}
                      </div>
                    </div>

                    {/* STORE PERKS */}
                    <div className="flex flex-wrap gap-x-10 my-4">
                      <div className="flex flex-wrap gap-2">
                        <img src={shopImage} className="w-5 aspect-square" />
                        <div className="text-sm">In Stock</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <img src={verifyImage} className="w-5 aspect-square" />
                        <div className="text-sm">Guaranteed</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <img src={truckImage} className="w-5 aspect-square" />
                        <div className="text-sm">Free Delivery</div>
                      </div>
                    </div>

                    {/* PRODUCT PRICE */}
                    {data.price && (
                      <p className="heading text-2xl font-semibold my-2">
                        {formatter.format(data.price)}
                      </p>
                    )}
                    <p className="flex flex-wrap items-baseline text-sm my-2">
                      or pay up to&nbsp;
                      <span>12 monthly installments&nbsp;</span>for only&nbsp;
                      {data.price && (
                        <span className="heading text-base font-semibold">
                          {formatter.format(data.price / 12)}
                        </span>
                      )}
                      &nbsp;with&nbsp;
                      <img src={billeaseBaselineImage} className="w-16" />
                      .&nbsp;
                      <span className="text-quantum underline">
                        <a href="https://billease.ph/" target="_blank">
                          Learn More.
                        </a>
                      </span>
                    </p>

                    {/* PRODUCT DETAILS */}
                    {data.brand && (
                      <p className="text-base my-1">
                        Brand: <em>{data.brand}</em>
                      </p>
                    )}
                    {data.description && (
                      <p className="text-base">{data.description}</p>
                    )}

                    {/* BUY BUTTONS */}
                    <div className="flex gap-x-4 flex-wrap md:flex-nowrap my-4">
                      <button className="grow bg-transparent rounded-lg p-3.5 text-quantum border-2 border-quantum heading text-lg hover:text-dark-quantum hover:border-dark-quantum">
                        Add to Cart
                      </button>
                      <button className="grow bg-quantum rounded-lg p-3.5 text-white border-2 border-transparent heading text-lg hover:bg-dark-quantum">
                        Buy Now
                      </button>
                    </div>

                    {/* COMMITMENTS */}
                    <div className="flex gap-2 my-2">
                      <div className="h-5 w-5 aspect-square">
                        <img src={speedyTruckImage} className="w-full" />
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="heading font-medium my-1">
                          Speedy Delivery:
                        </p>
                        <p>Metro Manila Area: 2-3 Business Days</p>
                        <p>Greater Metropolitan Area: 3-5 Business Days</p>
                        <p>Luzon Area: 5-7 Business Days</p>
                        <p>Visayas/ Mindanao Area: 7-10 Business Days</p>
                      </div>
                    </div>
                    <div className="flex gap-2 my-2">
                      <div className="h-5 w-5 aspect-square">
                        <img src={shieldImage} className="w-full" />
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="heading font-medium my-1">
                          Safe and Easy Checkouts Using:
                        </p>
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <img src={atomeImage} className="w-20" />
                              </td>
                              <td>
                                <img src={billeaseImage} className="w-20" />
                              </td>
                              <td>
                                <img src={gcashImage} className="w-20" />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <img src={mastercardImage} className="w-20" />
                              </td>
                              <td>
                                <img src={mayaImage} className="w-20" />
                              </td>
                              <td>
                                <img src={visaImage} className="w-20" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="flex gap-2 my-2">
                      <div className="h-5 w-5 aspect-square">
                        <img src={alertImage} className="w-full" />
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="heading font-medium my-1">
                          COVID-19 Response:
                        </p>
                        <p>
                          We take our customers' safety against COVID-19 a top
                          priority. We make sure that all of our personnel are
                          fully vaccinated and protected from the virus.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-10">
                  <Tabs.Group style="fullWidth" className="overflow-x-scroll">
                    <Tabs.Item
                      active
                      title="Description"
                      className="focus:ring-transparent"
                    >
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p className="heading font-medium my-1">Features</p>
                        <ul className="mb-2">
                          {data.features.map((feature) => (
                            <li key={feature} className="list-disc ml-4">
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <p className="heading font-medium my-1">Warranty</p>
                        <ul className="mb-2">
                          <li>1 year Official Warranty</li>
                        </ul>
                      </div>
                    </Tabs.Item>
                    <Tabs.Item title="Returns and Replacement">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p className="mb-2">
                          When you receive your order, please take a video of
                          your unboxing and make sure all items in your order
                          are received and have no external defects. If
                          QuantumGalaxy does not receive report of external
                          defect within twenty four (24) hours from receipt of
                          your item, it means that you received it free from
                          external defect. Documenting your receipt and unboxing
                          can help in case of disputes with the courier or other
                          problems with your order.
                        </p>
                        <p className="mb-2">
                          Send us an email at customercare@quantumgalaxy.com.
                          You can also call/text +63 912 345-6789. We can also
                          attend to your needs via our official social media
                          channels.
                        </p>
                        <p className="mb-2">
                          By purchasing at QuantumGalaxy, you agree and accept
                          the warranty and repair policies as stated above.
                        </p>
                      </div>
                    </Tabs.Item>
                    <Tabs.Item title="Shipping">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p className="heading font-medium my-1">
                          Standard Shipping
                        </p>

                        <p className="mb-2">
                          Our delivery lead time for Metro Manila is 2-4
                          business days; For Luzon Area, 5-7 business days; and
                          for Visayas and Mindanao, it is 7-10 business days.
                          Please note that delivery times can be affected by
                          extreme weather conditions, seasonal demand peaks, and
                          other factors. Refer to your tracking number to see
                          where your package is. For unusual circumstances,
                          please contact customer service.
                        </p>

                        <p className="heading font-medium my-1">
                          Tracking Your Item
                        </p>

                        <p className="mb-2">
                          As a policy, as soon as we have sent your package for
                          shipping, the tracking number will immediately be sent
                          to you via email and SMS within 24-48 hours after
                          checkout. You may also contact us at
                          orders@quantumgalaxy.com if you still haven't received
                          the tracking number. Keep your tracking number secure
                          and private. You can also track your order thru this
                          link: https://www.quantumgalaxy.com/apps/parcelpanel
                        </p>

                        <p className="heading font-medium my-1">
                          Same Day Delivery
                        </p>

                        <p className="mb-2">
                          Same Day Delivery is currently only available within
                          Metro Manila from Mondays to Saturdays. Same Day
                          Delivery is on payment first before delivery policy.
                          The delivery rate is based on the rates provided by
                          our courier partner Grab Express via their Grab
                          Express App. Payment can be settled via GCash, or Bank
                          Transfer through Instapay at BDO or Unionbank.
                        </p>

                        <p className="heading font-medium my-1">
                          Courier Partners
                        </p>

                        <p className="mb-2">
                          QuantumGalaxy's trusted partner couriers are Entrego,
                          Gogo, and Grab Express. Delivery through LBC can be
                          considered as an alternative on a case-to-case basis.
                          If your location is not within the serviceable area of
                          our main partner couriers, shipping fees will be
                          according to LBC rates and payment must be settled
                          first before delivery. Cash On Pickup is currently not
                          available thru LBC.
                        </p>

                        <p className="heading font-medium my-1">
                          Orders Outside of the Philippines
                        </p>

                        <p className="mb-2">
                          We currently don't serve international orders on a
                          large scale. You may get in touch with us if you need
                          help with orders of this nature as we can work out a
                          plan for your order. You can order from outside of the
                          Philippines provided the item will be delivered to a
                          Philippine address.
                        </p>
                      </div>
                    </Tabs.Item>
                    <Tabs.Item title="Review">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        No reviews yet
                      </p>
                    </Tabs.Item>
                  </Tabs.Group>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </>
  );
}
