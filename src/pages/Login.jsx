import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import './pages.css'; // Import the CSS file
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Hook to navigate programmatically
  const switchForm = () => {
    setIsLogin(!isLogin);
  };
  const handleLogin = () =>{
    navigate("/");
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/kau_logo.png" alt="KAU Logo" className="mx-auto w-24" />
        <h2 className="text-2xl font-bold my-4">KAU ACHIEVEMENTS</h2>

        {isLogin ? (
          <motion.div
            key="login"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative my-2">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input type="text" placeholder="Username" className="input-field" />
            </div>
            <div className="relative my-2">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input type="password" placeholder="Password" className="input-field" />
            </div>
            <button className="btn-green" onClick={handleLogin}>Login</button>
            <button className="btn-google"><FcGoogle className="mr-2" /> Sign in with Google</button>
            <p className="text-sm mt-4">Don’t Have an Account? <span className="text-blue-600 cursor-pointer" onClick={switchForm}>Signup</span></p>
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative my-2">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input type="text" placeholder="First Name" className="input-field" />
            </div>
            <div className="relative my-2">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input type="text" placeholder="Surname" className="input-field" />
            </div>
            <div className="relative my-2">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input type="text" placeholder="Username" className="input-field" />
            </div>
            <div className="relative my-2">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input type="email" placeholder="Email" className="input-field" />
            </div>
            <div className="relative my-2">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input type="password" placeholder="Password" className="input-field" />
            </div>
            <button className="btn-green">Signup</button>
            <p className="text-sm mt-4">Have an Account? <span className="text-blue-600 cursor-pointer" onClick={switchForm}>Login</span></p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
  }