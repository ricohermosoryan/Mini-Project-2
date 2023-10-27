import React, { useState } from 'react';

export default function ProductFilter({
  filters,
  handleCategoryCheckbox,
  maxProductPrice,
  handleBrandCheckbox,
  applyFilters,
  clearAllFilters,
  data
}) {
  const [isAccordion1Open, setAccordion1Open] = React.useState(false);
  const [isAccordion2Open, setAccordion2Open] = React.useState(false);
  const [isAccordion3Open, setAccordion3Open] = React.useState(false);

  const getUniqueBrands = (data) => {
    const brands = new Set();
    data.forEach((item) => {
      brands.add(item.brand);
    });
    const sortedBrands = Array.from(brands).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    return sortedBrands;
  }

  return (
    <>
      {/* FILTER */}
        <div className="flex justify-between items-baseline my-4">
          <p className="font-bold">Filters</p>
          <button className="text-quantum text-xs" onClick={clearAllFilters}>Clear all</button>
        </div>
        <div className="accordion">

          {/* CATEGORY FILTER */}
          <div className="accordion-item">
            <div className="accordion-trigger cursor-pointer" onClick={() => setAccordion1Open(!isAccordion1Open)}>
              Category
            </div>
            <div className={`accordion-content ${isAccordion1Open ? "hidden" : ""}`}>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="mobile"
                  checked={filters.category.includes("Smartphones and Accessories")}
                  onChange={() =>
                    handleCategoryCheckbox("Smartphones and Accessories")
                  }
                />
                <label htmlFor="mobile">Mobile Phones</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="laptops"
                  checked={filters.category.includes("Laptops and Computers")}
                  onChange={() => handleCategoryCheckbox("Laptops and Computers")}
                />
                <label htmlFor="laptops">Laptops & Computers</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="wearables"
                  checked={filters.category.includes("Wearable Technology")}
                  onChange={() => handleCategoryCheckbox("Wearable Technology")}
                />
                <label htmlFor="wearables">Wearables</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="audio"
                  checked={filters.category.includes("Audio and Headphones")}
                  onChange={() => handleCategoryCheckbox("Audio and Headphones")}
                />
                <label htmlFor="audio">Audio</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="cameras"
                  checked={filters.category.includes("Camera and Photography")}
                  onChange={() => handleCategoryCheckbox("Camera and Photography")}
                />
                <label htmlFor="cameras">Cameras</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="gaming"
                  checked={filters.category.includes("Gaming Gear")}
                  onChange={() => handleCategoryCheckbox("Gaming Gear")}
                />
                <label htmlFor="gaming">Gaming</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="smarthome"
                  checked={filters.category.includes("Home Automation")}
                  onChange={() => handleCategoryCheckbox("Home Automation")}
                />
                <label htmlFor="smarthome">Home Automation</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="software"
                  checked={filters.category.includes("Software and Apps")}
                  onChange={() => handleCategoryCheckbox("Software and Apps")}
                />
                <label htmlFor="software">Software & Apps</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="tech4kids"
                  checked={filters.category.includes("Tech for Kids")}
                  onChange={() => handleCategoryCheckbox("Tech for Kids")}
                />
                <label htmlFor="tech4kids">Tech for Kids</label>
              </div>
            </div>
          </div>

          {/* PRICE FILTER */}
          <div className="accordion-item">
            <div className="accordion-trigger cursor-pointer" onClick={() => setAccordion2Open(!isAccordion2Open)}>
              Price
            </div>
            <div className={`accordion-content ${isAccordion2Open ? "hidden" : ""}`}>
              <div>
                <input
                  className="w-full bg-transparent"
                  type="range"
                  id="price"
                  value={filters.maxPrice}
                  max={maxProductPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                />
                <div className="flex w-full items-center gap-x-2 overflow-hidden">
                  <label className="min-w-fit" htmlFor="maxPrice">Max Price: </label>
                  <div className="w-full flex items-center bg-white px-2">&#8369;&nbsp;
                    <input
                    className="w-full border-none focus:ring-0 bg-transparent"
                    type="number"
                    id="maxPrice"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                  />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BRAND FILTER */}
          <div className="accordion-item">
            <div className="accordion-trigger cursor-pointer" onClick={() => setAccordion3Open(!isAccordion3Open)}>
              Brands
            </div>
            <div className={`accordion-content max-h-60 overflow-y-scroll ${isAccordion3Open ? "hidden" : ""}`}>
              <div className="flex flex-col">
                {getUniqueBrands(data).map((brand) => (
                  <label key={brand} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.brand.includes(brand)}
                      onChange={() => handleBrandCheckbox(brand)}
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>
          </div>

        </div>

        <button onClick={applyFilters}>Apply Filters</button>

    </>
  );
}
