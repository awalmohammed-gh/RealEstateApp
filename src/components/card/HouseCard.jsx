import { MapPin, Bed, Bath, Square, TrendingUp, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useState } from 'react';

const HouseCard = ({ house }) => {
  const [isLiked, setIsLiked] = useState(false);

  const { id, title, pricing, location, property, features, media } = house;

  const isForSale = property.status === "Sale";

  const handleScroll = () =>{
    window.scrollTo(0,0)
  }

  const priceDisplay = isForSale 
    ? `₵${pricing.amount?.toLocaleString()}`
    : pricing.perNight 
      ? `₵${pricing.perNight.toLocaleString()}/night`
      : `₵${pricing.perMonth?.toLocaleString()}/month`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link onClick={handleScroll} to={`/house/${id}`}>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">

          {/* Image */}
          <div className="relative h-60 overflow-hidden">
            <img 
              src={media.images[0]} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />

            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Status */}
            <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-white rounded-full ${
              property.status === "For Sale" 
                ? "bg-green-500"
                : property.status === "For Rent"
                ? "bg-blue-500"
                : "bg-purple-500"
            }`}>
              {property.status}
            </span>

            {/* Like */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow hover:scale-110 transition"
            >
              <Heart
                className={`w-4 h-4 ${
                  isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
                }`}
              />
            </button>

            {/* Price */}
            <div className="absolute bottom-4 left-4 bg-white text-[#9810fa] px-3 py-1.5 rounded-lg text-sm font-bold shadow">
              {priceDisplay}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
              <MapPin className="w-4 h-4 text-[#9810fa]" />
              <span>{location.name}, {location.region}</span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-1 group-hover:text-[#9810fa] transition">
              {title}
            </h3>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {features?.slice(0, 3).map((feature, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-[#f4f0ff] text-[#9810fa] px-2.5 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-4 flex items-center justify-between">

              {/* Property details */}
              <div className="flex items-center gap-4 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4 text-[#9810fa]" />
                  {property.bedrooms}
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4 text-[#9810fa]" />
                  {property.bathrooms}
                </div>
                <div className="flex items-center gap-1">
                  <Square className="w-4 h-4 text-[#9810fa]" />
                  {property.size.value}{property.size.unit}
                </div>
              </div>

              {/* CTA */}
              <div className="text-[#9810fa] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                View
                <TrendingUp className="w-4 h-4" />
              </div>

            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default HouseCard;