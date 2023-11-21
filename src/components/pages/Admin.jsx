import React, { useEffect, useState } from "react";
import PageTransition from "../PageTransition";
import axios from "axios";

export default function Admin() {
  const scrollPosition = window.scrollY;
  // Set the scroll position based on the condition
  if (scrollPosition === 0) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, 48);
  }

  const [user, setUser] = useState("");

  const id = localStorage.getItem("_id");

  useEffect(() => {
    axios
      .get(
        `https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/${id}`
      )
      .then((res) => setUser(res.data.user));
  }, []);

  return (
    <>
      <PageTransition>
        <div className="container mx-auto">
          <div className="flex gap-3 items-center mt-10">
            <div>
              <h1 className="text-[30px]  font-bold">Admin Page</h1>
            </div>
          </div>
          <div className="border h-[1px] border-dark-quantum mt-3"></div>
          <div className="flex justify-around gap-3">
            <div className=" p-5 border mt-10">Products</div>
            <div className="p-5 border mt-10">Blogs</div>
            <div className="p-5 border mt-10">News</div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
