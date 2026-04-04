import React, { useState } from 'react';
import { useRealEstate } from '../context/RealEstateProvider';
import { 
  User, 
  Mail, 
  Phone, 
  DollarSign, 
  CreditCard, 
  Building2,
  Home,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Smartphone,
  Landmark
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const MakeOffer = () => {
  const navigate = useNavigate();
  const { makeOffer, properties, setMakeOffer } = useRealEstate();
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    price: 0
  });

  const myProperties = makeOffer.map((id) =>{
    const property = properties.find((item) => item.id === id);
    return property;
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    console.log(myProperties, formData);
    setMakeOffer([])
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/listings');
      }, 2000);
    }, 1500);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md bg-white rounded-2xl p-8 shadow-xl"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Offer Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your offer has been sent successfully. The property owner will contact you shortly.
          </p>
          <Link to="/properties">
            <button className="bg-[#9810fa] text-white px-6 py-2 rounded-lg hover:bg-[#7a0cc8] transition-colors">
              Browse More Properties
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/properties" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#9810fa] transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Properties</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Make an Offer</h1>
          <p className="text-gray-600 mt-2">Submit your offer for the property you're interested in</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Properties Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#9810fa]" />
              Your Selected Properties
            </h2>
            
            <div className="space-y-4">
              {makeOffer.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                  <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No properties selected</p>
                  <Link to="/listings">
                    <button className="mt-4 text-[#9810fa] font-semibold hover:underline">
                      Browse Properties
                    </button>
                  </Link>
                </div>
              ) : (
                makeOffer.map((offer, index) => {
                  const item = properties.find((property) => String(property.id) === String(offer));
                  if (!item) return null;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Image */}
                        <div className="sm:w-32 h-32 bg-gray-100 overflow-hidden">
                          <img 
                            src={item.media.images[0]} 
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        
                        {/* Details */}
                        <div className="flex-1 p-4">
                          <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                          <div className="flex flex-wrap gap-3 mb-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Bed className="w-3.5 h-3.5" />
                              {item.property.bedrooms} beds
                            </span>
                            <span className="flex items-center gap-1">
                              <Bath className="w-3.5 h-3.5" />
                              {item.property.bathrooms} baths
                            </span>
                            <span className="flex items-center gap-1">
                              <Maximize2 className="w-3.5 h-3.5" />
                              {item.property.size.value} {item.property.size.unit}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="w-3.5 h-3.5 text-[#9810fa]" />
                            <span>{item.location.name}, {item.location.region}</span>
                          </div>
                          <div className="mt-2">
                            <span className="text-lg font-bold text-[#9810fa]">
                              {item.property.status === "Sale" 
                                ? `₵${item.pricing.amount?.toLocaleString()}`
                                : item.pricing.perNight 
                                  ? `₵${item.pricing.perNight.toLocaleString()}/night`
                                  : `₵${item.pricing.perMonth?.toLocaleString()}/month`
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>

          {/* Offer Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Formal Property Offer</h2>
              <p className="text-gray-500 text-sm mb-6">Fill in your details and submit your offer</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#9810fa]" />
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#9810fa] focus:ring-2 focus:ring-[#9810fa]/20 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#9810fa]" />
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#9810fa] focus:ring-2 focus:ring-[#9810fa]/20 transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#9810fa]" />
                      Phone Number
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#9810fa] focus:ring-2 focus:ring-[#9810fa]/20 transition-all"
                    placeholder="+233 XX XXX XXXX"
                  />
                </div>

                {/* Offer Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#9810fa]" />
                      Offer Price (GHS)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="1000"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#9810fa] focus:ring-2 focus:ring-[#9810fa]/20 transition-all"
                    placeholder="Enter your offer amount"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#9810fa]" />
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('momo')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                        paymentMethod === 'momo'
                          ? 'border-[#9810fa] bg-[#9810fa]/5 text-[#9810fa]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span className="text-sm font-medium">Mobile Money</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                        paymentMethod === 'bank'
                          ? 'border-[#9810fa] bg-[#9810fa]/5 text-[#9810fa]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Landmark className="w-4 h-4" />
                      <span className="text-sm font-medium">Bank Transfer</span>
                    </button>
                  </div>
                </div>

                {/* Note */}
                <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700">
                    By submitting this offer, you agree to our terms and conditions. 
                    The property owner will review your offer and contact you within 24-48 hours.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || makeOffer.length === 0}
                  className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    isSubmitting || makeOffer.length === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-[#9810fa] hover:bg-[#7a0cc8] shadow-lg hover:shadow-xl'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Offer</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MakeOffer;