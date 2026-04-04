import { useEffect, useRef, useState } from "react";
import { heroContent, properties } from "../../assets/house_data";
import { 
  ChevronLeft, 
  ChevronRight, 
  House, 
  Search,
  MapPin,
  Home,
  Tag,
  ChevronDown,
  Sparkles,
  Building2,
  Heart,
  Shield,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [formData, setFormData] = useState({
    area: "",
    propertyStatus: "",
    propertyType: ""
  });

  const slideIntervalRef = useRef(null);
  const touchStartX = useRef(0);

  // Extract unique locations from properties data
  const areaOptions = [...new Set(properties.map(prop => prop.location.name))].map(area => ({
    value: area.toLowerCase().replace(/\s+/g, '-'),
    label: area
  }));

  // Extract unique property statuses
  const propertyStatusOptions = [...new Set(properties.map(prop => prop.property.status))].map(status => ({
    value: status.toLowerCase().replace(/\s+/g, '-'),
    label: status
  }));

  // Extract unique property types
  const propertyTypeOptions = [...new Set(properties.map(prop => prop.property.type))].map(type => ({
    value: type.toLowerCase().replace(/\s+/g, '-'),
    label: type
  }));

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === heroContent.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? heroContent.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => setCurrentIndex(index);

  useEffect(() => {
    if (!isPaused) {
      slideIntervalRef.current = setInterval(goToNext, 5000);
    }
    return () => clearInterval(slideIntervalRef.current);
  }, [isPaused, currentIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goToPrev() : goToNext();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFindNow = (e) => {
    e.preventDefault();
    
    // Filter properties based on form data
    const filteredProperties = properties.filter(prop => {
      let matches = true;
      
      // Filter by area
      if (formData.area) {
        const selectedArea = areaOptions.find(area => area.value === formData.area)?.label;
        matches = matches && prop.location.name === selectedArea;
      }
      
      // Filter by property status
      if (formData.propertyStatus) {
        const selectedStatus = propertyStatusOptions.find(status => status.value === formData.propertyStatus)?.label;
        matches = matches && prop.property.status === selectedStatus;
      }
      
      // Filter by property type
      if (formData.propertyType) {
        const selectedType = propertyTypeOptions.find(type => type.value === formData.propertyType)?.label;
        matches = matches && prop.property.type === selectedType;
      }
      
      return matches;
    });
    
    // Navigate to properties page with search params or state
    navigate('/properties', { 
      state: { 
        filters: formData,
        filteredProperties: filteredProperties 
      } 
    });
    
    console.log("Search Results:", filteredProperties);
    console.log("Total matches:", filteredProperties.length);
  };

  // Get count for quick stats
  const forSaleCount = properties.filter(p => p.property.status === "For Sale").length;
  const forRentCount = properties.filter(p => p.property.status === "For Rent").length;
  const totalProperties = properties.length;

  const currentSlide = heroContent[currentIndex];

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${currentSlide.image})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/60 to-black/70" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 overflow-y-auto py-12">

        {/* Animated Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white max-w-3xl mb-8 md:mb-12"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center items-center gap-2 mb-4"
            >
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="uppercase text-xs md:text-sm tracking-wider font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                Premier Real Estate
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            >
              {currentSlide.title}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl mb-6 text-white/90 max-w-2xl mx-auto"
            >
              {currentSlide.description}
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white hover:bg-white/90 text-[#9810fa] px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-all duration-300 shadow-lg"
            >
              <House className="w-4 h-4 md:w-5 md:h-5" />
              Make An Enquiry
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Animated Form */}
        <motion.form
          onSubmit={handleFindNow}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden"
        >
          <div className="p-5 md:p-6 lg:p-8">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              
              {/* Area Select */}
              <div className="relative">
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#9810fa]" />
                  <span>Area</span>
                </label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#9810fa] focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
                >
                  <option value="">All Areas</option>
                  {areaOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 bottom-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Property Status Select */}
              <div className="relative">
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
                  <Tag className="w-3.5 h-3.5 text-[#9810fa]" />
                  <span>Status</span>
                </label>
                <select
                  name="propertyStatus"
                  value={formData.propertyStatus}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#9810fa] focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
                >
                  <option value="">All Statuses</option>
                  {propertyStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 bottom-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Property Type Select */}
              <div className="relative">
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
                  <Home className="w-3.5 h-3.5 text-[#9810fa]" />
                  <span>Type</span>
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#9810fa] focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
                >
                  <option value="">All Types</option>
                  {propertyTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 bottom-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Find Now Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-[#9810fa] to-[#7a0cc8] hover:from-[#7a0cc8] hover:to-[#5e0a9e] text-white font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <Search className="w-5 h-5" />
              <span>FIND NOW</span>
            </motion.button>
          </div>
        </motion.form>

        {/* Navigation Arrows */}
        <motion.button
          whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.9 }}
          onClick={goToPrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full text-white transition-all duration-300 hover:bg-white/30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.9 }}
          onClick={goToNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full text-white transition-all duration-300 hover:bg-white/30"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroContent.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex 
                  ? "w-6 bg-white" 
                  : "w-1.5 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;