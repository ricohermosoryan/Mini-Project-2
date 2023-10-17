import React from "react";
import NavbarTemplate from "../components/templates/NavbarTemplate";
import Products from "../components/Products";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "../components/pages/Shop";
import Reviews from "../components/pages/Reviews";
import Blogs from "../components/pages/Blogs";
import Product from "../components/pages/Product";
import AboutUs from "../components/AboutUs";
import Home from "../pages/Home";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<NavbarTemplate />}>
            <Route path="*" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/blogs" element={<Blogs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
