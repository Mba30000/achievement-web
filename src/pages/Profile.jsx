import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { GetUser, GetPerson, GetDepartmentName, GetRoleName, EditUserProfile, UpdatePerson } from "./Utilities/api"; // Update this import with your API
import "./pages.css";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png" // Default Profile Icon
  );
  const [tempPic, setTempPic] = useState(profilePic); // Temporary profile picture for edit mode
  const [userData, setUserData] = useState(null); // State for holding user data
  const [personData, setPersonData] = useState(null); // State for holding person data
  const [department, setDepartment] = useState(null); // State for holding department data
  const [role, setRole] = useState(null); // State for holding role data

  // Fetch user and person data based on user ID
  useEffect(() => {
    const userId = localStorage.getItem("userid"); // Get userId from localStorage
    const departmentId = localStorage.getItem("departmentid");
    if (userId) {
      const fetchData = async () => {
        try {
          const userResponse = await GetUser(userId); // Fetch user data
          setUserData(userResponse);
          const personResponse = await GetPerson(userResponse.person_id); // Fetch person data using person_id from user
          setPersonData(personResponse);
          const department = await GetDepartmentName(departmentId); // Fetch department data
          setDepartment(department);
          const role = await GetRoleName(userResponse.role_id);
          setRole(role);
        } catch (err) {
          console.error("Error fetching user or person data", err);
        }
      };
      fetchData();
    }
  }, []);

  // Handle profile picture selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempPic(imageUrl);
    }
  };

  // Handle save changes
  const handleSave = async () => {
    if(!window.confirm("Are you sure you want to save changes")) return;
    const userId = localStorage.getItem("userid");
    if (userId && userData) {
      const personId = userData.person_id; // Get person_id from userData
      
      // Prepare updated user data
      const updatedUser = {
        username: document.getElementById("username").value,
      };
  
      // Prepare updated person data
      const updatedPerson = {
        first_name: document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
      };
  
      try {
        console.log("Updating User:", updatedUser);
        await EditUserProfile(userId, updatedUser); // Update user data
  
        console.log("Updating Person:", updatedPerson);
        await UpdatePerson(personId, updatedPerson); // Update person data
  
        // Update state to reflect changes
        setUserData((prev) => ({ ...prev, ...updatedUser }));
        setPersonData((prev) => ({ ...prev, ...updatedPerson }));
  
        setIsEditing(false); // Exit edit mode
      } catch (err) {
        console.error("Error saving user data", err);
      }
    }
  };
  


  // Handle cancel edit and reset changes
  const handleCancel = () => {
    setTempPic(profilePic); // Reset to original profile picture
    setIsEditing(false); // Exit editing mode
  };

  if (!userData || !personData || !department) {
    return <div>Loading...</div>; // Show loading state if user or person or department data isn't available
  }

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        {!isEditing ? (
          // PROFILE CARD VIEW
          <div className="profile-info">
            <img src={profilePic} alt="Profile" className="profile-pic" />
            <h2>{personData.first_name} {personData.last_name}</h2>
            <p>Username: {userData.username}</p>
            <p>Email: {personData.email}</p>
            <p>Department: {department}</p>
            <p>Role: {role}</p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true); // Enable edit mode
              }}
              className="link"
            >
              Edit Profile
            </a>
          </div>
        ) : (
          // EDIT MODE
          <div>
            <label htmlFor="profilePic">
              <img src={tempPic} alt="Profile" className="profile-pic editable-pic" />
            </label>
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <div className="profile-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  defaultValue={personData.first_name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Surname</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Surname"
                  defaultValue={personData.last_name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  defaultValue={userData.username} disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  defaultValue={personData.email}
                  className="full-width"
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select id="department" defaultValue={department.name} disabled>
                  <option>{department}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select id="role" defaultValue={role} disabled>
                  <option>{role}</option>
                </select>
              </div>
            </div>

            <div className="profile-buttons">
              <button>Change Password</button>
              <button onClick={handleSave}>Save Changes</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
