import { 
  Droplet,        
  Dumbbell,       
  Shield,         
  Truck,          
  ArrowUp,        
  Activity,      
  Sun,            
  Zap,             
  ArrowRight,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const Amenities = () => {

  const buildingAmenities = [
    { name: "Swimming Pool", icon: Droplet, description: "Relax and unwind in our pristine pool" },
    { name: "Gym / Fitness Center", icon: Dumbbell, description: "State-of-the-art equipment for your workout" },
    { name: "24/7 Security", icon: Shield, description: "Round-the-clock surveillance and protection" },
    { name: "Parking Space", icon: Truck, description: "Secure and ample parking for residents" },
    { name: "Elevator", icon: ArrowUp, description: "Modern elevators for easy access" },
    { name: "Playground", icon: Activity, description: "Safe and fun area for children" },
    { name: "Roof Terrace", icon: Sun, description: "Breathtaking views and relaxation space" },
    { name: "Laundry Room", icon: Zap, description: "Convenient on-site laundry facilities" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#9810fa]/10 text-[#9810fa] rounded-full text-sm font-semibold tracking-wide mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>Our Amenities</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Building{' '}
            <span className="text-[#9810fa] relative inline-block">
              Amenities
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-0 left-0 h-1 bg-[#9810fa]/30 rounded-full"
              />
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Experience luxury living with our premium amenities designed for your comfort and convenience
          </motion.p>
        </motion.div>

        {/* Amenities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {buildingAmenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 text-center">
                  {/* Icon Container */}
                  <div className="relative mb-5">
                    <div className="w-20 h-20 mx-auto bg-linear-to-br from-[#9810fa]/10 to-[#9810fa]/5 rounded-2xl flex items-center justify-center group-hover:from-[#9810fa] group-hover:to-[#7a0cc8] transition-all duration-300">
                      <Icon className="w-10 h-10 text-[#9810fa] group-hover:text-white transition-colors duration-300" />
                    </div>
                    {/* Decorative circle */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#9810fa]/5 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#9810fa] transition-colors duration-300">
                    {amenity.name}
                  </h3>
                  {/* Learn More Button */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-[#9810fa] text-sm font-semibold group-hover:gap-3 transition-all duration-300"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Amenities;