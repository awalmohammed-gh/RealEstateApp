import { X, Mail, Lock, User, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoginForm = ({ onClose }) => {
  const [signUp, setSignUp] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    termsAgree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your authentication logic here
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-linear-to-r from-[#9810fa] to-[#7a0cc8] px-6 py-4">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-white">
              {signUp === "signup" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-white/80 text-sm mt-1">
              {signUp === "signup"
                ? "Join us to find your dream home"
                : "Login to access your account"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name Fields (Sign Up only) */}
            {signUp === "signup" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-2 gap-3"
              >
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#9810fa] focus:ring-2 focus:ring-[#9810fa]/20 transition-all text-sm"
                    required={signUp === "signup"}
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#9810fa] focus:ring-2 focus:ring-[#9810fa]/20 transition-all text-sm"
                    required={signUp === "signup"}
                  />
                </div>
              </motion.div>
            )}

            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#9810fa] focus:ring-2 focus:ring-[#9810fa]/20 transition-all text-sm"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#9810fa] focus:ring-2 focus:ring-[#9810fa]/20 transition-all text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Terms & Conditions (Sign Up only) */}
            {signUp === "signup" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  name="termsAgree"
                  id="terms"
                  checked={formData.termsAgree}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-[#9810fa] focus:ring-[#9810fa] cursor-pointer"
                  required
                />
                <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer">
                  I agree to the{" "}
                  <a href="#" className="text-[#9810fa] hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#9810fa] hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </motion.div>
            )}

            {/* Forgot Password (Login only) */}
            {signUp === "login" && (
              <div className="text-right">
                <a href="#" className="text-xs text-[#9810fa] hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#9810fa] hover:bg-[#7a0cc8] text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {signUp === "signup" ? "Create Account" : "Login"}
            </motion.button>

            {/* Toggle between Login and Sign Up */}
            <div className="text-center pt-2">
              {signUp === "signup" ? (
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setSignUp("login")}
                    className="text-[#9810fa] font-semibold hover:underline"
                  >
                    Login
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setSignUp("signup")}
                    className="text-[#9810fa] font-semibold hover:underline"
                  >
                    Create an account
                  </button>
                </p>
              )}
            </div>
          </form>

          {/* Demo Credentials Note */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Demo: use any email and password to test
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginForm;