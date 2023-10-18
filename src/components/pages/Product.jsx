import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import starImage from "../../assets/star.svg";
import { formatter } from "../Products";
import shopImage from "../../assets/shop.svg";
import verifyImage from "../../assets/verify.svg";
import truckImage from "../../assets/truck.svg";
import speedyTruckImage from "../../assets/speedytruck.svg";
import shieldImage from "../../assets/shield.svg";
import alertImage from "../../assets/alert.svg";
import atomeImage from "../../assets/atome.svg";
import billeaseImage from "../../assets/billease.svg";
import gcashImage from "../../assets/gcash.svg";
import mastercardImage from "../../assets/mastercard.svg";
import mayaImage from "../../assets/maya.svg";
import visaImage from "../../assets/visa.svg";

export default function Product() {
  const { id } = useParams();
  const [data, setData] = useState({image: []});
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    axios
      .get(
        `https://d6fq7jdbk9.execute-api.us-east-1.amazonaws.com/dev/gadgets/${id}`
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
  }

  return (
    <>
      <div className="container mx-auto">
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
                <div>
                  <div className="flex gap-10">
                    <div className="w-full">
                      <div>
                        <img src={selectedImage} className="w-full aspect-auto rounded-lg" />
                      </div>
                      <div className="flex gap-2 justify-center overflow-x-scroll ">
                          {data.image.map(image => (<img key={image} src={image} className="w-1/5 aspect-auto rounded-lg" onClick={() => handleImageClick(image)} />))}
                      </div>
                    </div>
                    <div className="w-full">
                      {data.title && <p className="heading text-xl font-semibold">{data.title}</p>}
                      <div className="flex gap-4">
                        <div className="flex gap-1 bg-quantum text-white w-max p-1.5 rounded-md">
                          <img src={starImage} className="w-4 aspect-square"/>
                          {data.rating && <p className="text-sm font-bold">{data.rating.rate}</p>}
                        </div>
                        <div className="border w-px"></div>
                        <div className="my-auto">
                          {data.rating && <p>sold {data.rating.count}</p>}
                        </div>
                      </div>
                      <div className="flex gap-10">
                        <div className="flex gap-2">
                          <img src={shopImage} className="w-5 aspect-square" />
                          <div className="text-sm">In Stock</div>
                        </div>
                        <div className="flex gap-2">
                          <img src={verifyImage} className="w-5 aspect-square" />
                          <div className="text-sm">Guaranteed</div>
                        </div>
                        <div className="flex gap-2">
                          <img src={truckImage} className="w-5 aspect-square" />
                          <div className="text-sm">Free Delivery</div>
                        </div>
                      </div>
                      {data.price && <p className="heading text-2xl font-semibold">{formatter.format(data.price)}</p>}
                      {data.brand && <p className="text-base">Brand: <em>{data.brand}</em></p>}
                      {data.description && <p className="text-base">{data.description}</p>}
                      <div className="flex gap-4">
                        <button className="grow bg-transparent rounded-lg p-3.5 text-quantum border-2 border-quantum heading text-lg hover:text-dark-quantum hover:border-dark-quantum">Add to Cart</button>
                        <button className="grow bg-quantum rounded-lg p-3.5 text-white border-2 border-transparent heading text-lg hover:bg-dark-quantum">Buy Now</button>
                      </div>
                      <div className="flex gap-2">
                        <div>
                          <img src={speedyTruckImage} className="w-5 aspect-square"/>
                        </div>
                        <div className="text-sm">
                          <p className="heading font-medium">Speedy Delivery:</p>
                          <p>Metro Manila Area: 2-3 Business Days</p>
                          <p>Greater Metropolitan Area: 3-5 Business Days</p>
                          <p>Luzon Area: 5-7 Business Days</p>
                          <p>Visayas/ Mindanao Area: 7-10 Business Days</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div>
                          <img src={shieldImage} className="w-5 aspect-square"/>
                        </div>
                        <div className="text-sm">
                          <p className="heading font-medium">Safe and Easy Checkouts Using:</p>
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
                      <div className="flex gap-2">
                        <div>
                          <img src={alertImage} className="w-5 aspect-square"/>
                        </div>
                        <div className="text-sm">
                          <p className="heading font-medium">COVID-19 Response:</p>
                          <p>We take our customers' safety against COVID-19 a top priority. We make sure that all of our personnel are fully vaccinated and protected from the virus.</p>
                        </div>
                      </div>
                    </div>
                  </div>  
                  <div></div>
                </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
