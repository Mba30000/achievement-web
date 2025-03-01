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
import "./index.css";

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
      </Routes>
    </Router>
  );
}

export default App;
