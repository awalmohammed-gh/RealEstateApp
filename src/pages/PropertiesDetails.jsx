import { useNavigate, useParams } from "react-router-dom";
import { useRealEstate } from "../context/RealEstateProvider";
import { useEffect, useState } from "react";
import { 
  Home, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ChevronRight,
  Heart,
  Share2,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle,
  Building2,
  User,
  Star,
  Clock,
  Shield,
  Wifi,
  Wind,
  Coffee,
  Car,
  Award
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PropertiesDetails = () => {
  const { id } = useParams();
  const { properties,setMakeOffer } = useRealEstate();
  const [propertiesData, setPropertiesData] = useState(null);
  const [thumbnails, setThumbnails] = useState("");
  const [price, setPrice] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPropertyData = () => {
      const getProperty = properties.find((item) => item.id === id);
      if (getProperty) {
        setPropertiesData(getProperty);
        setThumbnails(getProperty.media.images[0]);
        setActiveImageIndex(0);

        let isForSale = getProperty.property.status === "Sale"
            ? `₵${getProperty.pricing.amount?.toLocaleString()}`
            : getProperty.pricing.perNight
              ? `₵${getProperty.pricing.perNight.toLocaleString()}/night`
              : `₵${getProperty.pricing.perMonth?.toLocaleString()}/month`;
        setPrice(isForSale);
      }
    };

    fetchPropertyData();
  }, [id, properties]);

  if (!propertiesData) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#9810fa] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  // Get property specs
  const getPropertySpecs = () => {
    const specs = [];
    if (propertiesData.property.bedrooms) {
      specs.push({ icon: Bed, label: "Bedrooms", value: propertiesData.property.bedrooms });
    }
    if (propertiesData.property.bathrooms) {
      specs.push({ icon: Bath, label: "Bathrooms", value: propertiesData.property.bathrooms });
    }
    if (propertiesData.property.size) {
      specs.push({ icon: Maximize2, label: "Size", value: `${propertiesData.property.size.value} ${propertiesData.property.size.unit}` });
    }
    return specs;
  };

  // Get status color
  const getStatusColor = () => {
    if (propertiesData.property.status === "Sale") return "bg-green-500";
    return "bg-blue-500";
  };

  // Get pricing type
  const getPricingType = () => {
    if (propertiesData.property.status === "Sale") return "For Sale";
    if (propertiesData.pricing.perNight) return "Per Night";
    return "Per Month";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap"
        >
          <Link to="/" className="hover:text-[#9810fa] transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/listings" className="hover:text-[#9810fa] transition-colors">
            Listings
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#9810fa] font-semibold">{propertiesData.title}</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Image Gallery Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <div className="sticky top-24">
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg mb-4">
                <img
                  src={thumbnails}
                  alt={propertiesData.title}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                
                {/* Status Badge */}
                <div className={`absolute top-4 left-4 ${getStatusColor()} text-white px-3 py-1.5 rounded-lg text-sm font-semibold`}>
                  {propertiesData.property.status}
                </div>
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {propertiesData.media.images.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setThumbnails(image);
                      setActiveImageIndex(index);
                    }}
                    className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      activeImageIndex === index ? "border-[#9810fa] shadow-lg" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Property Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              {propertiesData.title}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <MapPin className="w-4 h-4 text-[#9810fa]" />
              <span className="text-sm">
                {propertiesData.location.name}, {propertiesData.location.city}, {propertiesData.location.region}
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-bold text-[#9810fa]">{price}</span>
                <span className="text-gray-500 text-sm">{getPricingType()}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">*Inclusive of all taxes and fees</p>
            </div>

            {/* Property Specs */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white rounded-xl shadow-sm">
              {getPropertySpecs().map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="w-5 h-5 text-[#9810fa] mx-auto mb-1" />
                    <p className="text-xs text-gray-500">{spec.label}</p>
                    <p className="font-semibold text-gray-800">{spec.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Features Tags */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#9810fa]" />
                Key Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {propertiesData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3 text-[#9810fa]" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{propertiesData.description}</p>
            </div>

            {/* Agent Info */}
            <div className="mb-6 p-4 bg-gradient-to-r from-[#9810fa]/5 to-transparent rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-[#9810fa]" />
                Listed By
              </h3>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-medium text-gray-800">{propertiesData.agent.name}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <a href={`tel:${propertiesData.agent.phone}`} className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#9810fa] transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                      {propertiesData.agent.phone}
                    </a>
                    <a href={`mailto:${propertiesData.agent.email}`} className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#9810fa] transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                      Email
                    </a>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#9810fa] text-white rounded-lg hover:bg-[#7a0cc8] transition-all">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${propertiesData.agent.phone}`}>Call</a>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-[#9810fa] text-[#9810fa] rounded-lg hover:bg-[#9810fa] hover:text-white transition-all">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 py-3.5 bg-[#9810fa] text-white rounded-xl font-semibold hover:bg-[#7a0cc8] transition-all shadow-lg hover:shadow-xl">
                Schedule a Tour
              </button>
              <button onClick={() => {setMakeOffer((prev) => prev.includes(propertiesData.id)? prev : [...prev, propertiesData.id] );
              navigate("/offer");
              window.scrollTo(0,0)
              }} className="flex-1 py-3.5 border-2 border-[#9810fa] text-[#9810fa] rounded-xl font-semibold hover:bg-[#9810fa] hover:text-white transition-all">
                Make an Offer
              </button>
            </div>
          </motion.div>
        </div>

        {/* Additional Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-[#9810fa]" />
                Amenities
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-4 h-4 text-[#9810fa]" />
                  <span className="text-sm">24/7 Security</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Wifi className="w-4 h-4 text-[#9810fa]" />
                  <span className="text-sm">High-Speed WiFi</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Wind className="w-4 h-4 text-[#9810fa]" />
                  <span className="text-sm">Air Conditioning</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Coffee className="w-4 h-4 text-[#9810fa]" />
                  <span className="text-sm">Fully Furnished</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Car className="w-4 h-4 text-[#9810fa]" />
                  <span className="text-sm">Parking Space</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="w-4 h-4 text-[#9810fa]" />
                  <span className="text-sm">Power Backup</span>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-[#9810fa]" />
                Location Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Full Address</p>
                  <p className="text-gray-800 font-medium">{propertiesData.location.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="text-gray-800 font-medium">{propertiesData.location.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Region</p>
                  <p className="text-gray-800 font-medium">{propertiesData.location.region}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nearby Landmarks</p>
                  <p className="text-gray-800 font-medium">Shopping Mall, Schools, Hospital</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertiesDetails;