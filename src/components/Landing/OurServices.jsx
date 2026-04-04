import { CircleDollarSign, HandCoins, Handshake, ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";

const OurServices = () => {
  const services = [
    {
      title: "Buy a Home",
      description: "Find the perfect property to call your own. Browse verified listings, compare prices, and make confident decisions with ease.",
      buttonText: "FIND A HOME",
      icon: CircleDollarSign,
      gradient: "from-[#9810fa]/20 to-transparent",
      color: "#9810fa"
    },
    {
      title: "Rent a Home",
      description: "Explore a wide range of rental options that fit your lifestyle and budget. From apartments to family homes, discover your next place quickly.",
      buttonText: "FIND A HOME",
      icon: HandCoins,
      gradient: "from-[#9810fa]/20 to-transparent",
      color: "#9810fa"
    },
    {
      title: "Sell a Home",
      description: "List your property and connect with serious buyers faster. Get maximum visibility and the right value for your home with ease.",
      buttonText: "FIND A HOME",
      icon: Handshake,
      gradient: "from-[#9810fa]/20 to-transparent",
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-[#9810fa]/10 text-[#9810fa] rounded-full text-sm font-semibold tracking-wide mb-4"
          >
            Our Services
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Our Main{' '}
            <span className="text-[#9810fa] relative inline-block">
              Focus
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute bottom-0 left-0 h-1 bg-[#9810fa]/30 rounded-full"
              />
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Comprehensive real estate solutions tailored to your needs
          </motion.p>
        </motion.div>

        {/* Services Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative p-6 md:p-8">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-[#9810fa]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#9810fa] transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-[#9810fa] group-hover:text-white transition-colors duration-300" />
                  </motion.div>

                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#9810fa] transition-colors duration-300">
                    {service.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Button */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group/btn inline-flex items-center gap-2 text-[#9810fa] font-semibold hover:text-[#7a0cc8] transition-colors duration-300"
                  >
                    <span>{service.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>

                {/* Decorative Border */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#9810fa] group-hover:w-full transition-all duration-300" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#9810fa]/5 to-transparent rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
              Need Help Finding Your Dream Home?
            </h3>
            <p className="text-gray-600 mb-6">
              Our expert agents are ready to assist you with personalized guidance
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#9810fa] hover:bg-[#7a0cc8] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              <span>Contact an Agent</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices;