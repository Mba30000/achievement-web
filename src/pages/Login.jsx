import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./pages.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GetPerson } from "./Utilities/api";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setName] = useState("");
  const [surName, setSurname] = useState("");
  const navigate = useNavigate();

  const switchForm = () => {
    setPassword("");
    setUsername("");
    setEmail("");
    setName("");
    setSurname("");
    setIsLogin(!isLogin);
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validatePassword(password)) return;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/token/",
        new URLSearchParams({
          username: username,
          password: password,
          grant_type: "password",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token, user_id } = response.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("userid", user_id);

      GetPerson(user_id).then((person) => {
        localStorage.setItem("departmentid", person.department_id);
      });

      navigate("/");
    } catch (error) {
      console.error("Invalid credentials or server error");
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleSignup = async () => {
    if (!username) {
      alert("Username is required.");
      return;
    }
    if (!validatePassword(password)) return;

    const details = {
      username: username,
      password: password,
      first_name: firstName,
      last_name: surName,
      email: email,
    };

    try {
      await axios.post("http://127.0.0.1:8000/signup", details, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("You have successfully signed up! Proceed to sign in.");
      switchForm();
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Signup failed. Please check your details.");
    }
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
              <input
                type="text"
                placeholder="Username"
                className="input-field pl-10"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative my-2">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                className="input-field pl-10"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn-green" onClick={handleLogin}>
              Login
            </button>
            <button className="btn-google">
              <FcGoogle className="mr-2" /> Sign in with Google
            </button>
            <p className="text-sm mt-4">
              Don’t Have an Account?{" "}
              <span className="text-blue-600 cursor-pointer" onClick={switchForm}>
                Signup
              </span>
            </p>
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
              <input
                type="text"
                placeholder="First Name"
                className="input-field pl-10"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative my-2">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Surname"
                className="input-field pl-10"
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
            <div className="relative my-2">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Username"
                className="input-field pl-10"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative my-2">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                placeholder="Email"
                className="input-field pl-10"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative my-2">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                className="input-field pl-10"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn-green" onClick={handleSignup}>
              Signup
            </button>
            <p className="text-sm mt-4">
              Have an Account?{" "}
              <span className="text-blue-600 cursor-pointer" onClick={switchForm}>
                Login
              </span>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
