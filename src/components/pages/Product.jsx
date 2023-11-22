"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import { Breadcrumb, Rating, Tabs } from "flowbite-react";
import { motion } from "framer-motion";
import PageTransition from "../PageTransition";
import { getRatingIcons } from "./Reviews";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import cart from "../../assets/cart.svg";
import { shuffle } from "lodash";

export default function Product() {
  // Cart Items
  const { addToCart } = useContext(CartContext);

  const { id } = useParams();
  const [data, setData] = useState({ image: [], features: [] });
  const [selectedImage, setSelectedImage] = useState();
  const [productReviews, setProductReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const [starCounts, setStarCounts] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  useEffect(() => {
    const scrollPosition = window.scrollY;

    // Set the scroll position based on the condition
    if (scrollPosition === 0) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 48);
    }
    setLoading(true);
    const controller = new AbortController();
    axios
      .get(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products/${id}`
      )
      .then((res) => {
        setData(res.data.product);
        setSelectedImage(res.data.product.image[0]);
        setLoading(false);
      })
      .catch((err) => console.error(err));
    return controller.abort();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/reviews/products/${id}`
      );
      const data = await response.json();
      setProductReviews(data.reviews);

      const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      data.reviews.forEach((review) => {
        counts[review.rating]++;
      });

      setStarCounts(counts);
    };

    fetchReviews();
  }, [id]);


  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users"
      );
      const data = await response.json();
      setUsers(data.users);
    };

    fetchUsers();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    const fetchRelated = async () => {
        try {
            const response = await fetch('https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products');
            const responseData = await response.json();

            // Check if products is an array and not empty
            const products = responseData.products || [];
            const related = Array.isArray(products) && products.length > 0 ?
                products.filter(product => {
                    return product._id !== id && (
                        product.category.includes(data.category[0]) ||
                        product.subcategory.includes(data.subcategory[0])) &&
                        product._id !== data._id;
                }) :
                [];

            const shuffledRelated = shuffle(related);

            setRelatedProducts(shuffledRelated);
        } catch (error) {
            console.error('Error fetching or processing related products:', error);
        }
    }

    if (data.category && data.subcategory) {
        fetchRelated();
    }

}, [data.category, data.subcategory, id]);

  return (
    <>
      <PageTransition>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
        >
          <div className="container mx-auto px-4">
            {/* BREADCRUMB */}
            <div className="my-6">
              <Breadcrumb className="truncate">
                <Breadcrumb.Item>
                    <Link to="/home" className="text-gray-700">Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/products" className="text-gray-700">Products</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {data.name && (
                      <p className="truncate">
                        {data.name}
                      </p>
                    )}
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            {
              // Product Details
              <div className="">
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
                    {data.name && (
                      <p className="heading text-xl font-semibold my-2">
                        {data.name}
                      </p>
                    )}

                    {/* PRODUCT RATING */}
                    <div className="flex gap-x-4 my-2">
                      <Rating className="my-auto">
                        <Rating.Star className="text-quantum"/>
                        {data.rating && <p className="text-sm ml-2 font-bold ">{data.rating.rate.toFixed(2)}</p>}
                        <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                        {data.rating && <p className="text-sm">{data.rating.count} reviews</p>}
                      </Rating>
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
                        {formatter.format(data.price-(data.price*data.discount))}
                      </p>
                    )}
                    <p className="flex flex-wrap items-baseline text-sm my-2">
                      or pay up to&nbsp;
                      <span>12 monthly installments&nbsp;</span>for only&nbsp;
                      {data.price && (
                        <span className="heading text-base font-semibold">
                          {formatter.format((data.price-(data.price*data.discount)) / 12)}
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
                      <p className="text-base text-justify">{data.description}</p>
                    )}

                    {/* BUY BUTTONS */}
                    <div className="flex gap-x-4 flex-wrap md:flex-nowrap my-4">
                      <button
                        className="grow bg-transparent rounded-lg p-3.5 text-quantum border-2 border-quantum heading text-lg hover:text-dark-quantum hover:border-dark-quantum"
                        onClick={() =>
                          addToCart({
                            product: data._id,
                            quantity: 1,
                          })
                        }
                      >
                        Add to Cart
                      </button>
                      <Link className="grow" to={`/checkout?total=${btoa((data.price-(data.price*data.discount))*100)}`}>
                        <button className="w-full bg-quantum rounded-lg p-3.5 text-white border-2 border-transparent heading text-lg hover:bg-dark-quantum">
                        Buy Now
                        </button>
                      </Link>
                    </div>

                    {/* COMMITMENTS */}
                    <div className="flex gap-2 my-2">
                      <div className="h-5 w-5 aspect-square">
                        <img src={speedyTruckImage} className="w-full" />
                      </div>
                      <div className="text-sm text-gray-600 text-justify">
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
                      <div className="text-sm text-gray-600 text-justify">
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
                      <div className="text-sm text-gray-600 dark:text-gray-400 my-4 px-2 text-justify">
                        <p className="heading font-medium my-1">Features</p>
                        <ul className="mb-2">
                          {data.features.map((feature) => (
                            <li key={feature} className="list-disc list-inside">
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
                      <div className="text-sm text-justify text-gray-600 dark:text-gray-400 my-4 px-2">
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
                          Send us an email at customercare@quantumgalaxy.ph.
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
                      <div className="text-sm text-justify text-gray-600 dark:text-gray-400 my-4 px-2">
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
                    <Tabs.Item title="Reviews">
                      <div className="text-sm text-gray-600 dark:text-gray-400 my-4 px-2" >
                        <Rating className="mb-2">
                          {data.rating && <div>{getRatingIcons(Math.floor(data.rating.rate))}</div>}
                          {data.rating && <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{data.rating.rate.toFixed(2)} out of 5</p>}
                        </Rating>
                        {data.rating && <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">{data.rating.count} global ratings</p>}
                        
                        {data.rating &&
                          <div className="mb-8">
                            <div className="flex items-center mb-2">
                              <span className="text-sm font-medium text-quantum dark:text-cyan-500">5 star</span>
                              <div className="mx-4 h-5 lg:w-2/4 w-4/6 rounded bg-gray-200 dark:bg-gray-700">
                                <div className="h-5 rounded bg-yellow-400" data-testid="flowbite-rating-fill" style={{ width: `${(starCounts[5] / data.rating.count) * 100}%` }}></div>
                              </div>
                              <span className="text-sm font-medium text-quantum dark:text-cyan-500">{Math.round((starCounts[5] / data.rating.count) * 100)}%</span>
                            </div>

                            <div className="flex items-center mb-2">
                              <span className="text-sm font-medium text-quantum dark:text-cyan-500">4 star</span>
                              <div className="mx-4 h-5 lg:w-2/4 w-4/6 rounded bg-gray-200 dark:bg-gray-700">
                                <div className="h-5 rounded bg-yellow-400" data-testid="flowbite-rating-fill" style={{ width: `${(starCounts[4] / data.rating.count) * 100}%` }}></div>
                              </div>
                              <span className="text-sm font-medium text-quantum dark:text-cyan-500">{Math.round((starCounts[4] / data.rating.count) * 100)}%</span>
                            </div>

                            <div className="flex items-center mb-2">
                              <span className="text-sm font-medium text-quantum dark:text-cyan-500">3 star</span>
                              <div className="mx-4 h-5 lg:w-2/4 w-4/6 rounded bg-gray-200 dark:bg-gray-700">
                                <div className="h-5 rounded bg-yellow-400" data-testid="flowbite-rating-fill" style={{ width: `${(starCounts[3] / data.rating.count) * 100}%` }}></div>
                              </div>
                              <span className="text-sm font-medium text-quantum dark:text-cyan-500">{Math.round((starCounts[3] / data.rating.count) * 100)}%</span>
                            </div>

                            <div className="flex items-center mb-2">
                              <span className="text-sm font-medium text-quantum dark:text-cyan-500">2 star</span>
                              <div className="mx-4 h-5 lg:w-2/4 w-4/6 rounded bg-gray-200 dark:bg-gray-700">
                                <div className="h-5 rounded bg-yellow-400" data-testid="flowbite-rating-fill" style={{ width: `${(starCounts[2] / data.rating.count) * 100}%` }}></div>
                              </div>
                              <span className="text-sm font-medium text-quantum dark:text-cyan-500">{Math.round((starCounts[2] / data.rating.count) * 100)}%</span>
                            </div>

                            <div className="flex items-center mb-2">
                              <span className="text-sm font-medium text-quantum dark:text-cyan-500">1 star</span>
                              <div className="mx-4 h-5 lg:w-2/4 w-4/6 rounded bg-gray-200 dark:bg-gray-700">
                                <div className="h-5 rounded bg-yellow-400" data-testid="flowbite-rating-fill" style={{ width: `${(starCounts[1] / data.rating.count) * 100}%` }}></div>
                              </div>
                              <span className="text-sm font-medium text-quantum dark:text-cyan-500">{Math.round((starCounts[1] / data.rating.count) * 100)}%</span>
                            </div>

                          </div>
                        }

                        {productReviews.map((review) => {
                          const user = users.find(
                            (u) => u._id === review.user_id
                          );
                          if (!user) {
                            return (
                              <div key={review._id} className="review flex my-4">
                                <p className="italic">User not found</p>
                              </div>
                            );
                          }
                          return (
                            <div key={review._id} className="review flex my-4">
                              <div className="min-w-fit mr-2">
                                <img
                                  src={user.image}
                                  className="w-12 aspect-square rounded-full shadow"
                                />
                              </div>
                              <div className="">
                                <p className="heading font-medium">
                                  {user.first_name}&nbsp;{user.last_name}
                                </p>
                                <div className="text-dark-quantum my-0.5">
                                  {getRatingIcons(review.rating)}
                                </div>
                                <p className="italic">"{review.comment}"</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Tabs.Item>
                  </Tabs.Group>
                </div>

                <div className="my-10">
                  <h2 className="heading text-lg font-semibold mb-4">Related Products</h2>
                  
                  <div className="flex gap-4 overflow-x-scroll scroll-smooth w-full">

                    <div className="flex w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5">
                      {relatedProducts.slice(0, 10).map((product, i) => (
                        <motion.div
                          key={i}
                          className="aspect-square m-3 group transition relative min-w-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            ease: "easeInOut",
                            duration: 1,
                          }}
                          onMouseEnter={() => setHoveredItem(i)} onMouseLeave={() => setHoveredItem(null)}
                        >
                          <div className="p-4 min-w-full">
                            <Link to={`/products/${product._id}`}>
                              <div className="relative w-full">
                                <img src={product.image[0]} className="absolute inset-0 rounded-lg w-full"
                                  style={{
                                    transform: hoveredItem === i ? 'scale(1.1)' : 'scale(1)',
                                    transition: 'transform 0.5s ease-in',
                                  }}/>
                                <img
                                  className="rounded-lg shadow w-full"
                                  src={hoveredItem === i ? product.image[1] : product.image[0]}
                                  alt={product.name}
                                  style={{
                                    transform: hoveredItem === i ? 'scale(1.1)' : 'scale(1)',
                                    opacity: hoveredItem === i ? 1 : 0.8,
                                    transition: 'transform 0.5s ease-in, opacity 0.3s ease-in',
                                  }}
                                />
                              </div>
                            </Link>
                          </div>
                          <div className="min-w-full">
                            <Link to={`/products/${product._id}`}>
                              <p className="truncate heading font-medium">{product.name}</p>
                            </Link>
                            <p className="text-sm text-dark-quantum mb-2">{product.brand}</p>
                            <div className="flex items-center justify-between py-2 opacity-100 group-hover:opacity-0 transition-all duration-200">
                              <p className="font-semibold">{formatter.format(product.price)}</p>
                              <div className="flex gap-x-4 my-2">
                                <Rating className="my-auto">
                                  <Rating.Star className="text-quantum"/>
                                  {product.rating && <p className="text-sm ml-0.5 font-bold ">{product.rating.rate.toFixed(2)}</p>}
                                </Rating>
                              </div>
                            </div>

                            {/* ADD TO CART */}
                            <div className="absolute bottom-0 left-[-10px] group-hover:left-0 border-sky-300 rounded-lg border-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                              <button
                                className="flex gap-2 p-3 font-semibold"
                                onClick={() =>
                                  addToCart({
                                    product: product._id,
                                    // name: product.name,
                                    // price: product.price,
                                    // image: product.image[0],
                                    quantity: 1,
                                  })
                                }
                              >
                                <img src={cart} alt="image" /> Add to Cart
                              </button>
                            </div>
                            </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </motion.div>
      </PageTransition>
    </>
  );
}
