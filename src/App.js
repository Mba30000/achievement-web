import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MyFeats from "./pages/MyFeats";
import DepartmentFeats from "./pages/DepartmentFeats";
import AddAchievement from "./pages/AddAchievement";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-feats" element={<MyFeats />} />
        <Route path="/department-feats" element={<DepartmentFeats />} />
        <Route path="/add-achievement" element={<AddAchievement />} />
      </Routes>
    </Router>
  );
}

export default App;
