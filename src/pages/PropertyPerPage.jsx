import { useParams } from 'react-router-dom';
import { useRealEstate } from '../context/RealEstateProvider';
import HouseCard from '../components/card/HouseCard';
import { useState } from 'react';
import { Filter, X, ChevronDown, Home, DollarSign, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import OurServices from '../components/Landing/OurServices';

const PropertyPerPage = () => {
  const { status } = useParams();
  const { properties } = useRealEstate();
  const [selectedCategory, setSelectedCategory] = useState(["All"]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const uniqueCategory = [...new Set(properties.map(p => p.property.type.toLowerCase().replace(/\s+/g)))];

  const priceRanges = [
    "200,000 - 300,000",
    "800,000 - 900,000",
    "700,000 - 800,000",
    "700,000 - 750,000",
    "400,000 - 500,000",
    "300,000 - 350,000",
    "1,000 - 1,500",
    "2,000 - 3,000",
    "1,000 - 2,000",
    "2,500 - 3,500",
    "3,500 - 4,500",
    "4,500 - 5,500",
  ];

  const propertyPage = properties.filter((item) => {
    return item.property.status.toLowerCase() === status.toLowerCase();
  });

//   const getStatus = properties.filter((item) => item.property.status === "Sale");
//   console.log(getStatus);

console.log(status);


  const filteredProperties = propertyPage.filter((property) => {
    const propertyType = property.property.type.toLowerCase().replace(/\s+/g);
    const matchType = selectedCategory.includes("All") || selectedCategory.includes(propertyType);
    
    let price = 0;
    if (property.pricing.amount) price = property.pricing.amount;
    else if (property.pricing.perMonth) price = property.pricing.perMonth;
    else if (property.pricing.perNight) price = property.pricing.perNight;
    
    const matchPrice = price >= minPrice && price <= maxPrice;
    return matchType && matchPrice;
  });

  const handleCategory = (cat) => {
    setSelectedCategory((prev) => {
      if (prev.includes("All")) {
        return [cat];
      } else {
        if (prev.includes(cat)) {
          const newCategories = prev.filter((item) => item !== cat);
          return newCategories.length === 0 ? ["All"] : newCategories;
        } else {
          return [...prev, cat];
        }
      }
    });
  };

  const clearFilters = () => {
    setSelectedCategory(["All"]);
    setMinPrice(0);
    setMaxPrice(100000);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (!selectedCategory.includes("All")) count += selectedCategory.length;
    if (minPrice !== 0 || maxPrice !== 100000) count += 1;
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-[url('/cateHeroImg.jpg')] bg-no-repeat bg-cover bg-center h-[40vh] md:h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/60"></div>
        <div className="relative z-10 text-center text-white max-w-3xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Home className="w-6 h-6 text-[#9810fa]" />
              <span className="text-sm font-semibold uppercase tracking-wide">Properties</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold capitalize mb-4">
              For {status} Properties
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
              Explore our wide range of properties available for sale. Whether you're looking to buy your dream home or invest, find listings with detailed information, photos, and features to help you make the best choice.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl py-8 md:py-12">
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#9810fa]" />
              <span className="font-semibold text-gray-700">Filters</span>
              {getActiveFilterCount() > 0 && (
                <span className="bg-[#9810fa] text-white text-xs rounded-full px-2 py-1">
                  {getActiveFilterCount()}
                </span>
              )}
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block md:w-80 flex-shrink-0`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm p-6 sticky top-24"
            >
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#9810fa]" />
                  <h3 className="font-bold text-lg text-gray-800">Filters</h3>
                </div>
                {getActiveFilterCount() > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-[#9810fa] hover:text-[#7a0cc8] transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear all</span>
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-[#9810fa]" />
                  <h4 className="font-semibold text-gray-800">Property Type</h4>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategory.includes("All")}
                      onChange={() => {
                        if (selectedCategory.includes("All")) {
                          setSelectedCategory([]);
                        } else {
                          setSelectedCategory(["All"]);
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-[#9810fa] focus:ring-[#9810fa] cursor-pointer"
                    />
                    <span className="text-gray-700 group-hover:text-[#9810fa] transition-colors">All Properties</span>
                  </label>
                  {uniqueCategory.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group ml-2">
                      <input
                        type="checkbox"
                        checked={selectedCategory.includes(cat)}
                        onChange={() => handleCategory(cat)}
                        className="w-4 h-4 rounded border-gray-300 text-[#9810fa] focus:ring-[#9810fa] cursor-pointer"
                      />
                      <span className="capitalize text-gray-700 group-hover:text-[#9810fa] transition-colors">
                        {cat.replace(/-/g, ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-[#9810fa]" />
                  <h4 className="font-semibold text-gray-800">Price Range (GHS)</h4>
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="price"
                      checked={minPrice === 0 && maxPrice === Infinity}
                      onChange={() => {
                        setMinPrice(0);
                        setMaxPrice(100000);
                      }}
                      className="w-4 h-4 text-[#9810fa] focus:ring-[#9810fa] cursor-pointer"
                    />
                    <span className="text-gray-700 group-hover:text-[#9810fa] transition-colors">All Prices</span>
                  </label>
                  {priceRanges.map((price, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        onChange={() => {
                          const [min, max] = price.split('-').map(Number);
                          setMinPrice(min);
                          setMaxPrice(max);
                        }}
                        className="w-4 h-4 text-[#9810fa] focus:ring-[#9810fa] cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-[#9810fa] transition-colors">
                        ₵{price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Active Filters Display */}
              {getActiveFilterCount() > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Active Filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {!selectedCategory.includes("All") && selectedCategory.map(cat => (
                      <span key={cat} className="text-xs bg-[#9810fa]/10 text-[#9810fa] px-2 py-1 rounded-full">
                        {cat.replace(/-/g, ' ')}
                      </span>
                    ))}
                    {(minPrice !== 0 || maxPrice !== 100000) && (
                      <span className="text-xs bg-[#9810fa]/10 text-[#9810fa] px-2 py-1 rounded-full">
                        ₵{minPrice.toLocaleString()} - ₵{maxPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Properties Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="text-gray-700">
                  Showing <span className="font-bold text-[#9810fa]">{filteredProperties.length}</span> properties
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#9810fa]">
                    <option>Latest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Most Popular</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((apartment) => (
                  <HouseCard house={apartment} key={apartment.id} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white rounded-2xl"
              >
                <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No properties found for the selected filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-[#9810fa] font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <div className=''>
        <OurServices/>
      </div>
    </div>
  );
};

export default PropertyPerPage;