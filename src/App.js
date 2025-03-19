import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MyFeats from "./pages/MyFeats";
import DepartmentFeats from "./pages/DepartmentFeats";
import AddAchievement from "./pages/AddAchievement";
import PrivateRoute from "./PrivateRoute";
import UserAchievements from "./pages/UserAchievements";
import DepartmentAchievements from "./pages/DepartmentAchievements";
import AchievementDetails from "./pages/AchievementDetails";
import ManageUsers from "./pages/manageUsers";
import "./index.css";
import AdminNav from "./components/AdminNav";
import Navbar from "./components/Navbar";
import ManageDept from "./pages/manageDepts";
import ManageTypes from "./pages/manageTypes";
import ManageAttributes from "./pages/manageAttributes";
import ManageRoles from "./pages/manageRoles";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (Wrapped in PrivateRoute) */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-feats"
          element={
            <PrivateRoute>
              <MyFeats />
            </PrivateRoute>
          }
        />
        <Route
          path="/department-feats"
          element={
            <PrivateRoute>
              <DepartmentFeats />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-achievement"
          element={
            <PrivateRoute>
              <AddAchievement />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-achievement/:achievementId"
          element={
            <PrivateRoute>
              <AddAchievement />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/:userId"
          element={
            <PrivateRoute>
              <UserAchievements />
            </PrivateRoute>
          }
        />
        <Route
          path="/department/:departmentId"
          element={
            <PrivateRoute>
              <DepartmentAchievements />
            </PrivateRoute>
          }
        />
        <Route
          path="/achievement/:achievementId"
          element={
            <PrivateRoute>
              <AchievementDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/manageUsers"
          element={
            <PrivateRoute>
              <ManageUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="/manageDepts"
          element={
            <PrivateRoute>
              <ManageDept />
            </PrivateRoute>
          }
        />
        <Route
          path="/manageAcheivType"
          element={
            <PrivateRoute>
              <ManageTypes />
            </PrivateRoute>
          }
        />
        <Route
          path="/ManageAttributes"
          element={
            <PrivateRoute>
              <ManageAttributes />
            </PrivateRoute>
          }
        />
        <Route
          path="/ManageRoles"
          element={
            <PrivateRoute>
              <ManageRoles />
            </PrivateRoute>
          }
        />
      </Routes>
      
      <PrivateRoute>
              <AdminNav />
              <Navbar/>
      </PrivateRoute>
    </Router>
  );
}

export default App;
