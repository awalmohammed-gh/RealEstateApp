import React, { useState } from 'react';
import { useRealEstate } from '../context/RealEstateProvider';
import AgentCard from '../components/card/AgentCard';
import { Users, Phone, Mail, MapPin, Star, ChevronRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import OurServices from '../components/Landing/OurServices';

const Agents = () => {
  const { properties } = useRealEstate();
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique agents from properties
  const agentMap = new Map();

  properties.forEach(property => {
    if (property.agent && !agentMap.has(property.agent.email)) {
      agentMap.set(property.agent.email, {
        ...property.agent,
        properties: [property],
        id: property.agent.id
      });
    } else if (property.agent && agentMap.has(property.agent.email)) {
      agentMap.get(property.agent.email).properties.push(property);
    }
  });

  const agents = Array.from(agentMap.values());

  // Filter agents based on search
  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-[url('/agentBg.jpg')] bg-no-repeat bg-cover bg-center h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/60"></div>
        <div className="relative z-10 text-center text-white max-w-3xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-8 h-8 text-[#9810fa]" />
              <span className="text-sm font-semibold uppercase tracking-wider">Our Team</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              Meet Our Real Estate Experts
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
              Discover our team of trusted and experienced real estate agents ready to help you buy, sell, or rent with confidence. Each agent brings local market knowledge, professional guidance, and a commitment to helping you find the perfect property or secure the best deal.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl py-12 md:py-16">
        
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by agent name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#9810fa] focus:ring-2 focus:ring-[#9810fa]/20 transition-all shadow-sm"
            />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-[#9810fa]">{agents.length}</p>
            <p className="text-xs text-gray-500">Expert Agents</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-[#9810fa]">{properties.length}</p>
            <p className="text-xs text-gray-500">Properties Listed</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-[#9810fa]">500+</p>
            <p className="text-xs text-gray-500">Happy Clients</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-[#9810fa]">98%</p>
            <p className="text-xs text-gray-500">Satisfaction Rate</p>
          </div>
        </motion.div>

        {/* Agents Grid */}
        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredAgents.map((property, index) => (
              <AgentCard key={index} property={property} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-2xl"
          >
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No agents found matching your search.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-[#9810fa] font-semibold hover:underline"
            >
              Clear search
            </button>
          </motion.div>
        )}
      </div>

      <div className=''>
        <OurServices/>
      </div>
    </div>
  );
};

export default Agents;