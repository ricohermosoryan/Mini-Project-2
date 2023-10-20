import React, { useEffect, useState } from "react";
import axios from "axios";
import reviews from "../../assets/reviews.svg";
import { motion } from "framer-motion";
import PageTransition from "../PageTransition";

// Rating icon
export const getRatingIcons = (rating) => {
    let icons;
    switch (rating) {
      case 1:
        icons = (
          <>
            <i className='bx bxs-star'></i><i className='bx bx-star'></i><i className='bx bx-star'></i><i className='bx bx-star'></i><i className='bx bx-star'></i>
          </>
        );
        break;
      case 2:
        icons = (
          <>
            <i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bx-star'></i><i className='bx bx-star'></i><i className='bx bx-star'></i>
          </>
        );
        break;
      case 3:
        icons = (
          <>
            <i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bx-star'></i><i className='bx bx-star'></i>
          </>
        );
        break;
      case 4:
        icons = (
          <>
            <i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bx-star'></i>
          </>
        );
        break;
      case 5:
        icons = (
          <>
            <i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i>
          </>
        );
        break;
    }
    return icons;
  };

export default function Reviews() {

  const [data, setData] = useState([]);
  const [displayedReviews, setDisplayedReviews] = useState([]); 
  const [reviewsToShow, setReviewsToShow] = useState(21);
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
      setData(reviewsData);
    }

    fetchData()
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

    setDisplayedReviews(data.slice(0, reviewsToShow));

  }, [data, reviewsToShow]);

  return (
    <>
      <PageTransition>
        <div className="banner">
          <img
            src={reviews}
            alt="image"
            className="lg:w-screen lg:h-[400px] lg:object-cover"
          />
        </div>
        <div className=" mx-5 lg:mx-24 mt-10 md:mt-14 lg:mt-[90px]">
          <div className=" h-[0px]  shadow border border-zinc-500"></div>
          <div className="w-[139px] h-[32.66px] px-[92px] py-[7px]  bg-neutral-100 border border-zinc-500 mt-[-18px] ms-[77px] md:ms-[238px] md:w-[240px] md:h-[40px] md:mt-[-20px] lg:ms-[740px] lg:w-[300px] lg:h-[50px] lg:mt-[-26px]">
            <div className="w-[195px] h-[13px] text-center text-black text-[20px] font-bold my-[-6px] md:w-[230px]  ms-[-98px] md:text-[24px] md:ms-[-88px] lg:text-[28px] lg:w-[280px] lg:mt-[-3px] lg:ms-[-85px]">
              Customer Reviews
            </div>
          </div>
          <div className="container mx-auto">
            <div className="flex flex-wrap flex-row justify-center my-10 gap-4">
              {displayedReviews.map(review => {
                // Find user
                const user = users.find(u => u.id === review.userId);

                // Find product 
                const product = products.find(p => p.id === review.productId);
                            
                return (
                  <div key={review.id} className="review flex shadow w-96 h-auto p-2">
                    <div className="min-w-fit mr-2">
                      <img src={user.image} className="w-12 aspect-square rounded-full shadow"/>
                    </div>
                    <div className="">
                      <p className="heading font-medium">{user.fullName}</p>
                      <p className="text-sm">{product.title}</p>
                      <p className="text-dark-quantum">{getRatingIcons(review.rating)}</p>
                      <p className="italic">"{review.comment}"</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-center">
              {displayedReviews.length < data.length && (
                <button className="text-quantum hover:text-dark-quantum" onClick={() => setReviewsToShow(prev => prev + 21)}>
                  Show More
                </button>
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
