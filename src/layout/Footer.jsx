import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  ArrowRight,
  Heart,
  Sparkles,
  ChevronUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show scroll button after scrolling
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setShowScrollTop(window.scrollY > 500);
    });
  }

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
    { name: "FAQs", path: "/faqs" }
  ];

  const services = [
    { name: "Buy a Home", path: "/buy" },
    { name: "Rent a Home", path: "/rent" },
    { name: "Sell a Home", path: "/sell" },
    { name: "Property Management", path: "/management" },
    { name: "Real Estate Consulting", path: "/consulting" },
    { name: "Home Valuation", path: "/valuation" }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribed with email:", email);
      setEmail('');
      alert("Thank you for subscribing!");
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 max-w-7xl pt-16 pb-8">
        
        {/* Top Section with Newsletter */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12 pb-8 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-[#9810fa]" />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-[#9810fa] bg-clip-text text-transparent">
                HomeBase
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Discover your dream home with Ghana's premier real estate agency. 
              We connect you with the finest properties across the country, 
              ensuring a seamless and rewarding experience.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#9810fa]" />
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on new properties and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#9810fa] transition-colors text-white placeholder-gray-500"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#9810fa] hover:bg-[#7a0cc8] px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#9810fa]">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  123 Independence Avenue,<br />
                  Airport City, Accra, Ghana
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a href="tel:+233240000000" className="text-gray-400 hover:text-[#9810fa] transition-colors text-sm">
                  +233 24 152 9904
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a href="mailto:info@homebase.com" className="text-gray-400 hover:text-[#9810fa] transition-colors text-sm">
                  info@homebase.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  Mon - Fri: 9:00 AM - 6:00 PM<br />
                  Sat: 10:00 AM - 4:00 PM<br />
                  Sun: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#9810fa]">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-[#9810fa] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#9810fa]">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.path}
                    className="text-gray-400 hover:text-[#9810fa] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Properties Preview */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#9810fa]">Why Choose Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#9810fa] rounded-full mt-2"></div>
                <p className="text-gray-400 text-sm">500+ Properties Available</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#9810fa] rounded-full mt-2"></div>
                <p className="text-gray-400 text-sm">Expert Real Estate Agents</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#9810fa] rounded-full mt-2"></div>
                <p className="text-gray-400 text-sm">24/7 Customer Support</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#9810fa] rounded-full mt-2"></div>
                <p className="text-gray-400 text-sm">Verified Listings Only</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#9810fa] rounded-full mt-2"></div>
                <p className="text-gray-400 text-sm">Best Price Guarantee</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Home Base Real Estate. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-gray-400 hover:text-[#9810fa] text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-[#9810fa] text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-[#9810fa] text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>in Ghana</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#9810fa] hover:bg-[#7a0cc8] w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
        >
          <ChevronUp className="w-6 h-6 text-white" />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;