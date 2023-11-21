import React, { useEffect, useState } from "react";
import PageTransition from "../PageTransition";
import axios from "axios";
import AddProducts from "../AddProducts";
import EditProducts from "../EditProducts";

export default function Admin() {
  const scrollPosition = window.scrollY;
  // Set the scroll position based on the condition
  if (scrollPosition === 0) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, 48);
  }

  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);

  const id = localStorage.getItem("_id");

  useEffect(() => {
    axios
      .get(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/${id}`
      )
      .then((res) => setUser(res.data.user));

    axios
      .get(
        "https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products"
      )
      .then((res) => setProducts(res.data.products));
  }, []);

  return (
    <>
      <PageTransition>
        <div className="container mx-auto">
          <div className="flex gap-3 items-center mt-10">
            <div>
              <h1 className="text-[30px]  font-bold">Admin Page</h1>
              <p className="text-dark-quantum">{user.email}</p>
            </div>
          </div>
          <div className="border h-[1px] border-dark-quantum mt-3"></div>
          <div className="flex justify-between gap-3">
            <div className=" p-5 border mt-10 rounded-lg shadow-lg">
              <h1 className="text-[25px]  font-semibold">Products</h1>
              <p className="text-[20px] font-medium">
                Total Products: {products.length}
              </p>
              <div className="mt-5 mb-5">
                <AddProducts />
              </div>
              <h1 className="text-[25px]  font-semibold">Product Preview</h1>
              <div className=" overflow-y-auto h-[400px] w-[600px]">
                <ul className="space-y-2">
                  {products.map((item, i) => {
                    return (
                      <li key={i} className=" truncate border rounded-lg">
                        <p className="text-[20px] font-semibold">{item.name}</p>
                        <div
                          onClick={() =>
                            localStorage.setItem("product_id", item._id)
                          }
                        >
                          <EditProducts />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="p-5 border mt-10">Blogs</div>
            <div className="p-5 border mt-10">News</div>
            <div className="p-5 border mt-10">Users</div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
