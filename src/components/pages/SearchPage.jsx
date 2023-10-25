import React from "react";
import PageTransition from "../PageTransition";
import { useLocation } from 'react-router-dom';

export default function SearchPage() {

  const location = useLocation();
  const { searchQuery, searchResults } = location.state || {};

if(!searchQuery) {
  return <div>No results</div> 
}

  return (
    <>
      <PageTransition>
        <div>
          {searchResults.map(product => (
            <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                {product.title} 
                </Link>
            </div>
            ))}
        </div>  
      </PageTransition>
    </>
  );
}