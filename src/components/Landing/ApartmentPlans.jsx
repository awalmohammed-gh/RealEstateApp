import React, { useState } from 'react';
import { apartmentPlans } from '../../assets/house_data';
import { 
  Maximize2, 
  CheckCircle, 
  Home, 
  Building2,
  ArrowRight,
  Sparkles,
  Grid3x3,
  Layers,
  Bed,
  Bath
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const ApartmentPlans = () => {
  const [category, setCategory] = useState('Studio-Apartment'); 
  const [hoveredCard, setHoveredCard] = useState(null);

  // Get unique categories and convert to slug
  const uniqueCategory = [
    ...new Set(
      apartmentPlans.map(p => p.title.replace(/\s+/g, "-"))
    )
  ];

  // Filter apartments based on selected category
  const filteredApartment = apartmentPlans.filter(apartment => {
    return category === "" || category === apartment.title.replace(/\s+/g, "-")
  });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#9810fa]/10 text-[#9810fa] rounded-full text-sm font-semibold tracking-wide mb-4"
          >
            <Building2 className="w-4 h-4" />
            <span>Floor Plans</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Apartment{' '}
            <span className="text-[#9810fa] relative inline-block">
              Plans
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-0 left-0 h-1 bg-[#9810fa]/30 rounded-full"
              />
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Explore our range of apartment layouts. Find the perfect fit for your lifestyle, whether you're looking for cozy studios or spacious multi-bedroom apartments.
          </motion.p>
        </motion.div>

        {/* Category Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {uniqueCategory.map((cat, index) => (
            <motion.button
              key={index}
              onClick={() => setCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`px-5 py-2.5 rounded-full font-semibold capitalize text-sm transition-all duration-300 flex items-center gap-2
                ${category === cat 
                  ? "bg-[#9810fa] text-white shadow-lg shadow-[#9810fa]/30" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
            >
              {category === cat && <Sparkles className="w-3.5 h-3.5" />}
              {cat.replace(/\s+/g, "-")}
            </motion.button>
          ))}
        </motion.div>

        {/* Apartment Cards Grid - Side by Side Layout */}
        <AnimatePresence mode="wait">
          <div className="space-y-8">
            {filteredApartment.map((apartment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row">
                  
                  {/* Image Section - Larger */}
                  <div className="relative lg:w-1/2 overflow-hidden bg-gradient-to-br from-[#9810fa]/5 to-transparent">
                    <div className="relative h-80 lg:h-full min-h-[400px] overflow-hidden">
                      <img
                        src={apartment.image}
                        alt={apartment.title}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          hoveredCard === index ? "scale-110" : "scale-100"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-[#9810fa] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg">
                      {apartment.title.includes("Studio") ? "🏠 Cozy Studio" : 
                       apartment.title.includes("2-Bedroom") ? "👨‍👩‍👧‍👦 Family Home" : 
                       apartment.title.includes("3-Bedroom") ? "✨ Luxury Living" : "🏰 Premium Suite"}
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 md:p-8 lg:w-1/2">
                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 group-hover:text-[#9810fa] transition-colors duration-300">
                      {apartment.title}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-gray-600 mb-5 leading-relaxed">
                      {apartment.description}
                    </p>
                    
                    {/* Key Features */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Bed className="w-4 h-4 text-[#9810fa]" />
                        <span className="text-sm">
                          {apartment.title.includes("Studio") ? "1 Bed" :
                           apartment.title.includes("2-Bedroom") ? "2 Beds" :
                           apartment.title.includes("3-Bedroom") ? "3 Beds" : "4 Beds"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Bath className="w-4 h-4 text-[#9810fa]" />
                        <span className="text-sm">
                          {apartment.title.includes("Studio") ? "1 Bath" :
                           apartment.title.includes("2-Bedroom") ? "2 Baths" :
                           apartment.title.includes("3-Bedroom") ? "3 Baths" : "4 Baths"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Maximize2 className="w-4 h-4 text-[#9810fa]" />
                        <span className="text-sm">Size: {apartment.size}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Building2 className="w-4 h-4 text-[#9810fa]" />
                        <span className="text-sm">Modern Design</span>
                      </div>
                    </div>
                    
                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {apartment.features.slice(0, 4).map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full flex items-center gap-1"
                        >
                          <CheckCircle className="w-3 h-3 text-[#9810fa]" />
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-[#9810fa] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#7a0cc8] transition-all duration-300 shadow-md"
                        >
                          View Details
                        </motion.button>
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="text-[#9810fa] text-sm font-semibold flex items-center gap-1"
                        >
                          <span>Schedule Tour</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </motion.button>
                      </div>
                      
                      {/* Availability */}
                      <div className="text-right">
                        <p className="text-xs text-green-600 font-semibold">Available Now</p>
                        <p className="text-xs text-gray-500">Move-in ready</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* No Results Message */}
        {filteredApartment.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-16"
          >
            <Grid3x3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No apartments found in this category.</p>
            <button
              onClick={() => setCategory('Studio Apartment')}
              className="mt-4 text-[#9810fa] font-semibold hover:underline"
            >
              View all apartments
            </button>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-[#9810fa]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Home className="w-6 h-6 text-[#9810fa]" />
              </div>
              <p className="text-2xl font-bold text-[#9810fa]">{apartmentPlans.length}</p>
              <p className="text-xs text-gray-500">Floor Plans</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-[#9810fa]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6 text-[#9810fa]" />
              </div>
              <p className="text-2xl font-bold text-[#9810fa]">{uniqueCategory.length}</p>
              <p className="text-xs text-gray-500">Apartment Types</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-[#9810fa]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Maximize2 className="w-6 h-6 text-[#9810fa]" />
              </div>
              <p className="text-2xl font-bold text-[#9810fa]">50-200</p>
              <p className="text-xs text-gray-500">Sq Meters</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-[#9810fa]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Layers className="w-6 h-6 text-[#9810fa]" />
              </div>
              <p className="text-2xl font-bold text-[#9810fa]">1-4</p>
              <p className="text-xs text-gray-500">Bedrooms</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApartmentPlans;