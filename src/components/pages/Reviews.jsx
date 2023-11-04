import React, { useEffect, useState } from "react";
import axios from "axios";
import reviews from "../../assets/reviews.svg";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "../PageTransition";
import { Breadcrumb, Rating } from "flowbite-react";
import { shuffle } from "lodash";
import { Link } from "react-router-dom";
import reviewsBanner from "../../assets/reviews_1.svg";

// Rating icon
export const getRatingIcons = (rating) => {
  let icons;
  switch (rating) {
    case 1:
      icons = (
        <>
          <Rating>
            <Rating.Star className="text-quantum"/>
            <Rating.Star filled={false} />
            <Rating.Star filled={false} />
            <Rating.Star filled={false} />
            <Rating.Star filled={false} />
          </Rating>
        </>
      );
      break;
    case 2:
      icons = (
        <>
          <Rating>
            <Rating.Star className="text-quantum"/>
            <Rating.Star className="text-quantum"/>
            <Rating.Star filled={false} />
            <Rating.Star filled={false} />
            <Rating.Star filled={false} />
          </Rating>
        </>
      );
      break;
    case 3:
      icons = (
        <>
          <Rating>
            <Rating.Star className="text-quantum"/>
            <Rating.Star className="text-quantum"/>
            <Rating.Star className="text-quantum"/>
            <Rating.Star filled={false} />
            <Rating.Star filled={false} />
          </Rating>
        </>
      );
      break;
    case 4:
      icons = (
        <>
          <Rating>
            <Rating.Star className="text-quantum"/>
            <Rating.Star className="text-quantum"/>
            <Rating.Star className="text-quantum"/>
            <Rating.Star className="text-quantum"/>
            <Rating.Star filled={false} />
          </Rating>
        </>
      );
      break;
    case 5:
      icons = (
        <>
          <Rating>
            <Rating.Star className="text-quantum"/>
            <Rating.Star className="text-quantum"/>
            <Rating.Star className="text-quantum"/>
            <Rating.Star className="text-quantum"/>
            <Rating.Star className="text-quantum"/>
          </Rating>
        </>
      );
      break;
  }
  return icons;
};

export default function Reviews() {

  const [data, setData] = useState([]);
  const [displayedReviews, setDisplayedReviews] = useState([]); 
  const initialReviewsToShow = 21;
  const [reviewsToShow, setReviewsToShow] = useState(initialReviewsToShow);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      const usersRes = await fetch('https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/users');
      const userData = await usersRes.json();
      setUsers(userData);

      const productsRes = await fetch('https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/products');
      const productData = await productsRes.json(); 
      setProducts(productData);

      const reviewsRes = await axios.get("https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/reviews");
      const reviewsData = reviewsRes.data;
      setData(shuffle(reviewsData));
    }

    fetchData()
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setDisplayedReviews(data.slice(0, reviewsToShow));
  }, [data, reviewsToShow]);

  // INFINITE SCROLLING
  useEffect(() => {
  setDisplayedReviews(data.slice(0, reviewsToShow));

  function handleScroll() {
    const distanceToBottom = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY);
    const scrollThreshold = 200;
    if (distanceToBottom < scrollThreshold) {
      setReviewsToShow((prev) => prev + 21);
    }
  }

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [data, reviewsToShow]);

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
                Reviews
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        {/* BANNER */}
        <div className="w-full relative">
          <img src={reviewsBanner} className="w-full object-cover" />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 heading text-2xl lg:text-3xl xl:text-4xl text-white text-center">CUSTOMER REVIEWS</h1>
        </div>


          {/* User Reviews */}
        <AnimatePresence>
          <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 my-8">
            <div className="flex flex-wrap flex-row justify-center my-10 gap-4">
              {displayedReviews.map((review) => {
                // Find user
                const user = users.find((u) => u.id === review.userId);

                // Find product
                const product = products.find(
                  (p) => p.id === review.productId
                );

                return (
                  <motion.div
                    key={review.id}
                    className="review flex shadow w-96 h-auto p-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      ease: "easeInOut",
                      duration: 1,
                    }}
                  >
                    <div className="min-w-fit mr-2">
                      <img
                        src={user.image}
                        className="w-12 aspect-square rounded-full shadow"
                      />
                    </div>
                    <div className="">
                      <p className="heading font-medium">{user.fullName}</p>
                      <p className="text-sm">{product.title}</p>
                      <div className="text-dark-quantum my-0.5">
                        {getRatingIcons(review.rating)}
                      </div>
                      <p className="italic">"{review.comment}"</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </AnimatePresence>
      </PageTransition>
    </>
  );
}