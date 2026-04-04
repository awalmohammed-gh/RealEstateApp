import { CloudSun, HandMetal, House, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import aboutImg from "../../assets/aboutImg.jpg";
import { motion } from "framer-motion";

const About = () => {
  const features = [
    {
      icon: House,
      title: "Smart Home Design",
      description: "Modern architecture with intelligent layouts for optimal living spaces",
      color: "#9810fa"
    },
    {
      icon: CloudSun,
      title: "Beautiful Scene Around",
      description: "Prime locations with stunning views and serene environments",
      color: "#9810fa"
    },
    {
      icon: HandMetal,
      title: "Exceptional Lifestyle",
      description: "Premium amenities and curated experiences for refined living",
      color: "#9810fa"
    },
    {
      icon: Shield,
      title: "Complete 24/7 Security",
      description: "Round-the-clock protection with advanced surveillance systems",
      color: "#9810fa"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={aboutImg} 
                alt="Luxury real estate property" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#9810fa]/20 to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-4 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#9810fa]/10 rounded-full p-2">
                  <CheckCircle className="w-6 h-6 text-[#9810fa]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">10+ Years</p>
                  <p className="text-xs text-gray-500">Of Excellence</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-[#9810fa]/10 text-[#9810fa] rounded-full text-sm font-semibold tracking-wide">
                About Us
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              Find Your Perfect Rental,{' '}
              <span className="text-[#9810fa]">Faster</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-600 text-base md:text-lg leading-relaxed"
            >
              Find verified rental properties in top locations with ease. We make it simple to search, compare, and secure your next home without stress.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="bg-[#9810fa]/10 rounded-lg p-2.5 group-hover:bg-[#9810fa] transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#9810fa] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 group-hover:text-[#9810fa] transition-colors duration-300">
                        {feature.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-[#9810fa] hover:bg-[#7a0cc8] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span>OUR SERVICES</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200"
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-[#9810fa]">500+</p>
                <p className="text-xs text-gray-500">Properties</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#9810fa]">98%</p>
                <p className="text-xs text-gray-500">Satisfied Clients</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#9810fa]">24/7</p>
                <p className="text-xs text-gray-500">Support</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;