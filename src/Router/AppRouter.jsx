import React from "react";
import NavbarTemplate from "../components/templates/NavbarTemplate";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Reviews from "../components/pages/Reviews";
import Blogs from "../components/pages/Blogs";
import Product from "../components/pages/Product";
import AboutUs from "../components/pages/AboutUs";
import Home from "../components/pages/Home";
import Products from "../components/pages/Products";
import FAQs from "../components/pages/FAQs";
import ContactUs from "../components/pages/ContactUs";
import News from "../components/pages/News";
import Blog from "../components/pages/Blog";
import NewsPage from "../components/pages/NewsPage";
import { AnimatePresence } from "framer-motion";

export default function AppRouter() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<NavbarTemplate />}>
            <Route path="*" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/news/:id" element={<NewsPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/FAQs" element={<FAQs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/news" element={<News />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}
