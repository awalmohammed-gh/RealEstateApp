import { User, Phone, Mail, Home, Star, MapPin, ChevronRight, Award } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const AgentCard = ({ property }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate()

  
  // Get agent's listed properties count
  const propertyCount = property.properties?.length || 0;
  
  // Generate random rating for demo (in real app, use actual data)
  const rating = (Math.random() * (5 - 4) + 4).toFixed(1);
  
  // Get agent initial for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div onClick={() => navigate(`/agent/${property.id}`)} className="block h-full">
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
          
          {/* Agent Image/Avatar */}
          <div className="relative bg-linear-to-br from-[#9810fa]/10 to-[#9810fa]/5 p-6 pt-8 text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#9810fa]/20 group-hover:border-[#9810fa] transition-all duration-300">
                {property.image ? (
                  <img 
                    src={property.image} 
                    alt={property.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#9810fa] to-[#7a0cc8] flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {getInitials(property.name)}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Badge */}
              <div className="absolute -top-2 -right-2 bg-[#9810fa] text-white rounded-full px-2 py-1 text-xs font-bold shadow-lg">
                {propertyCount} {propertyCount === 1 ? 'Property' : 'Properties'}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center gap-1 mt-4">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-gray-700">{rating}</span>
              <span className="text-xs text-gray-400">(120 reviews)</span>
            </div>
          </div>

          {/* Agent Details */}
          <div className="p-5 flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1 text-center group-hover:text-[#9810fa] transition-colors">
              {property.name}
            </h3>
            
            <p className="text-xs text-center text-gray-500 mb-4 flex items-center justify-center gap-1">
              <Award className="w-3 h-3 text-[#9810fa]" />
              <span>Licensed Real Estate Agent</span>
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-[#9810fa] shrink-0" />
                <span className="truncate">{property.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-[#9810fa] shrink-0" />
                <span className="truncate text-xs">{property.email}</span>
              </div>
            </div>

            {/* Property Locations Preview */}
            {property.properties && property.properties.length > 0 && (
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                  <MapPin className="w-3 h-3 text-[#9810fa]" />
                  <span>Listed in:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {[...new Set(property.properties.map(p => p.location.name))].slice(0, 2).map((location, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {location}
                    </span>
                  ))}
                  {[...new Set(property.properties.map(p => p.location.name))].length > 2 && (
                    <span className="text-xs text-gray-400">+{[...new Set(property.properties.map(p => p.location.name))].length - 2} more</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Button */}
          <div className="p-4 pt-0">
            <motion.div
              animate={isHovered ? { x: 5 } : { x: 0 }}
              className="flex items-center justify-center gap-2 text-[#9810fa] font-semibold text-sm"
            >
              <span>View Profile</span>
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Hover Border Effect */}
          <div className="h-1 bg-linear-to-r from-[#9810fa] to-[#7a0cc8] w-0 group-hover:w-full transition-all duration-500"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default AgentCard;