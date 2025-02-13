import { useState } from "react";
import Navbar from "../components/Navbar";
import "./pages.css";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png" // Default Profile Icon
  );
  const [tempPic, setTempPic] = useState(profilePic); // Temporary profile picture for edit mode

  // Handle profile picture selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempPic(imageUrl);
    }
  };

  // Save changes
  const handleSave = () => {
    setProfilePic(tempPic); // Save new profile picture
    setIsEditing(false);
  };

  // Cancel edit and reset temp changes
  const handleCancel = () => {
    setTempPic(profilePic); // Reset to original profile picture
    setIsEditing(false);
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        {!isEditing ? (
          // PROFILE CARD VIEW
          <div className="profile-info">
            <img src={profilePic} alt="Profile" className="profile-pic" />
            <h2>Mahdi Bathallath</h2>
            <p>Username: mba3</p>
            <p>Email: mbathallath@gmail.com</p>
            <p>Department: Electrical and Computer Engineering</p>
            <p>Role: Student</p>
            <a 
                href="#" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  setIsEditing(true);
                }} 
                className="edit-profile-link"
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
              <input type="text" placeholder="First Name" defaultValue="Mahdi" />
              <input type="text" placeholder="Surname" defaultValue="Bathallath" />
              <input type="text" placeholder="Username" defaultValue="mba3"  />
              <input type="email" placeholder="Email" defaultValue="mbathallath@gmail.com"  className="full-width" />
              <select disabled>
                <option>Electrical and Computer Engineering</option>
              </select>
              <select disabled>
                <option>Student</option>
              </select>
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
