import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRealEstate } from "../context/RealEstateProvider";
import { MessageCircleCheck, Phone, User, Mail, MapPin, Star, Award, ChevronRight, Sparkles, Home, Building2 } from "lucide-react";
import HouseCard from "../components/card/HouseCard";
import { motion } from "framer-motion";

const AgentDetailsPage = () => {
  const { id } = useParams();
  const { properties } = useRealEstate();
  const [agentData, setAgentData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All")

  const uniqueCategory = ["All", ...new Set(properties.map((p) => p.property.status))];

  const filteredProperty = properties.filter((item) => item.agent.id === id)

  useEffect(() => {
    const fetchAgent = () => {
      const findAgent = properties.find((item) => item.agent.id === id);
      if (findAgent) {
        setAgentData(findAgent);
      }
    };

    fetchAgent();
  }, [id, properties]);

  // Get agent's property count
  const propertyCount = filteredProperty.length;
  
  // Get unique locations
  const uniqueLocations = [...new Set(filteredProperty.map(p => p.location.name))];
  
  // Get properties by status
  const saleCount = filteredProperty.filter(p => p.property.status === "Sale").length;
  const rentCount = filteredProperty.filter(p => p.property.status === "Rent").length;

  if (!agentData) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#9810fa] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading agent profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#9810fa] to-[#7a0cc8] py-16 md:py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* Agent Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                {agentData.agent.image ? (
                  <img src={agentData.agent.image} alt={agentData.agent.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#9810fa] to-[#7a0cc8] flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Agent Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center md:text-left text-white"
            >
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-semibold">Licensed Real Estate Agent</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">{agentData.agent.name}</h1>
              <p className="text-white/90 max-w-2xl">
                Licensed Real Estate Agent specializing in high-end architectural masterpieces and luxury coastal estates.
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-6 justify-center md:justify-start">
                <div className="text-center">
                  <p className="text-2xl font-bold">{propertyCount}</p>
                  <p className="text-sm text-white/80">Properties</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{saleCount}</p>
                  <p className="text-sm text-white/80">For Sale</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{rentCount}</p>
                  <p className="text-sm text-white/80">For Rent</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{uniqueLocations.length}</p>
                  <p className="text-sm text-white/80">Locations</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl py-12">
        
        {/* About & Contact Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-[#9810fa]" />
              <h3 className="text-xl font-bold text-gray-800">The Curated Perspective</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Experience a curated collection of exceptional properties, thoughtfully selected to offer the perfect balance of design, location, and value.
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-[#9810fa]/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#9810fa]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Direct Line</p>
                  <p className="font-semibold text-gray-800">{agentData.agent.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-[#9810fa]/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#9810fa]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Enquiry</p>
                  <p className="font-semibold text-gray-800">{agentData.agent.email}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                    <MessageCircleCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp Direct</p>
                    <p className="font-semibold text-gray-800">Chat with agent</p>
                  </div>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                  Connect
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Featured Portfolio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-6 h-6 text-[#9810fa]" />
                <span className="text-sm font-semibold text-[#9810fa] uppercase tracking-wide">Portfolio</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Featured <span className="text-[#9810fa]">Properties</span>
              </h1>
              <p className="text-gray-500 mt-1">Browse through {agentData.agent.name}'s exclusive listings</p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {uniqueCategory.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-[#9810fa] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat === "Sale" ? "For Sale" : cat === "Rent" ? "For Rent" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Properties Grid */}
          {filteredProperty.filter((item) => selectedCategory === "All" ? true : item.property.status === selectedCategory).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperty
                .filter((item) => selectedCategory === "All" ? true : item.property.status === selectedCategory)
                .map((property, index) => (
                  <HouseCard house={property} key={index} />
                ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl">
              <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No properties found in this category.</p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="mt-4 text-[#9810fa] font-semibold hover:underline"
              >
                View all properties
              </button>
            </div>
          )}
        </motion.div>

        {/* Expertise Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="bg-gradient-to-r from-[#9810fa]/5 to-transparent rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-sm">Luxury Villas</span>
              <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-sm">Modern Apartments</span>
              <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-sm">Investment Properties</span>
              <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-sm">Beachfront Estates</span>
              <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-sm">Commercial Real Estate</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AgentDetailsPage;