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
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "../context/CartContext";
import Cart from "../components/Cart";
import SearchPage from "../components/pages/SearchPage";
import PrivacyPolicy from "../components/pages/PrivacyPolicy";
import TermsOfService from "../components/pages/TermsOfService";
import NewsPage from "../components/pages/NewsPage";
import Checkout from "../components/pages/Checkout";
import Admin from "../components/pages/Admin";
import Regular from "../components/pages/Regular";
import EditProducts from "../components/EditProducts";
import AddProducts from "../components/AddProducts";
import AddBlogs from "../components/AddBlogs";
import EditBlogs from "../components/EditBlogs";
import AddNews from "../components/AddNews";
import EditNews from "../components/EditNews";
import AddUser from "../components/AddUser";
import EditUser from "../components/EditUser";

export default function AppRouter() {
  const location = useLocation();
  return (
    <>
      <CartProvider>
        <AnimatePresence initial={false} mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<NavbarTemplate />}>
              <Route path="*" element={<Home />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/edit-user/:id" element={<EditUser />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/add-product" element={<AddProducts />} />
              <Route path="/edit-product/:id" element={<EditProducts />} />
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/add-blogs" element={<AddBlogs />} />
              <Route path="/edit-blog/:id" element={<EditBlogs />} />
              <Route path="/faq" element={<FAQs />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/dashboard" element={<Regular />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/news" element={<News />} />
              <Route path="/add-news" element={<AddNews />} />
              <Route path="/edit-news/:id" element={<EditNews />} />
              <Route path="/news/:id" element={<NewsPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </CartProvider>
    </>
  );
}
