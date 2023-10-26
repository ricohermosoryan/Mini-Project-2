import React, { useState, useEffect } from "react";
import PageTransition from "../PageTransition";
import searchImage from "../../assets/search.svg";
import { Link } from "react-router-dom";

export default function SearchPage() {
    
  const [searchResults, setSearchResults] = useState([]);

const getSearchQuery = () => {
  return localStorage.getItem('searchQuery') ?? '';
}

const [searchQuery, setSearchQuery] = useState(getSearchQuery());

const [searchTrigger, setSearchTrigger] = useState(false);

const handleInputChange = (e) => {
  setSearchQuery(e.target.value);

  localStorage.setItem('searchQuery', e.target.value);
}

const handleSearchClick = () => {
  setSearchTrigger(true);
}

const handleEnter = (e) => {
  if(e.key === 'Enter') {
    setSearchTrigger(true);
  }
}

const handleSearch = async () => {
  const response = await fetch(`https://w266v3hoea.execute-api.ap-southeast-2.amazonaws.com/dev/products/search?query=${searchQuery}`);

  const data = await response.json();

  setSearchResults(data);
}
    
useEffect(() => {
  if(searchQuery) {
    setSearchTrigger(true); 
  }
}, [searchQuery]);

useEffect(() => {
  if(searchTrigger) {
    handleSearch(); 
    setSearchTrigger(false);
  }
}, [searchTrigger, searchQuery]);
    
  return (
    <>
      <PageTransition>
        <div className="container mx-auto">
          <div className="border rounded-t-lg flex my-4">
            <input
              type="text"
              id="input-group-1"
              onChange={handleInputChange}
              value={searchQuery}
              onKeyDown={handleEnter}
              className="bg-gray-50 border-gray-300 text-gray-900 text-sm  block w-full p-2.5 border-none outline-none focus:ring-0 focus:border-none"
              placeholder="Search for products"
            />
            <button type="submit" className=" bg-white" onClick={handleSearchClick}>
              <img src={searchImage} alt="image" />
            </button>
          </div>
          <div className="p-4">
            {searchResults.map(product => (
              <div key={product.id} className="my-4">
                <div className="w-40 h-40 aspect-square my-2">
                  <Link to={`../products/${product.id}`}><img src={product.image[0]} className="h-full object-cover" /></Link>
                </div>
                <div className="my-2">
                  <Link to={`../products/${product.id}`}><p className="heading hover:text-quantum">{product.title}</p></Link>
                  <p>{product.brand} | {product.category.join(", ")}</p>
                  <p className="truncate">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageTransition>
    </>
  );
}