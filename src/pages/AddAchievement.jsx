import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CreateAchievement, EditAchievement, GetAchievement, getTypes } from "./Utilities/api";
import "./pages.css";

export default function AddAchievement() {
  const navigate = useNavigate();
  const { achievementId } = useParams();

  // State for form fields
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState(""); // store the selected type ID
  const [visibility, setVisibility] = useState("");
  const [description, setDescription] = useState("");
  const [types, setTypes] = useState([]); // state to hold the types data
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const fetchedTypes = await getTypes(); // Assuming getTypes is the function that fetches the types
        setTypes(fetchedTypes); // Save fetched types into the state
      } catch (err) {
        console.error("Error fetching types:", err);
      }
    };

    const fetchAchievementData = async () => {
      if (!achievementId) {
        setIsLoaded(true);
        return;
      }
      try {
        const achievement = await GetAchievement(achievementId);
        if (achievement) {
          setTitle(achievement.title || "");
          setDate(achievement.date ? achievement.date.split("T")[0] : ""); // Ensure date is correctly formatted for the input field
          setType(achievement.achievement_type_id || ""); // Set the type ID when editing
          setVisibility(achievement.visibility || "");
          setDescription(achievement.description || "");
        }
      } catch (err) {
        console.error("Error fetching achievement data:", err);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchTypes(); // Fetch types when the component mounts
    fetchAchievementData(); // Fetch achievement data if editing
  }, [achievementId]);

  const handleSave = async () => {
    const currentTitle = title.trim();
    const currentDate = date.trim();
    const currentType = type; // This is the ID of the selected type
    const currentVisibility = visibility;
    const currentDescription = description.trim();

    if (!currentTitle || !currentDate || !currentType || !currentVisibility || !currentDescription) {
      alert("All fields are required.");
      return;
    }

    if (isNaN(new Date(currentDate).getTime())) {
      alert("Invalid date. Please enter a valid date.");
      return;
    }

    const formattedDate = currentDate.length === 10 ? `${currentDate}T00:00:00.000` : currentDate;

    const dataToSend = {
      achievement: {
        title: currentTitle,
        date: formattedDate,
        achievement_type_id: currentType, 
        visibility: currentVisibility,
        primary_person_id: localStorage.getItem("userid"),
        department_id: localStorage.getItem("departmentid"),
        description: currentDescription,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      contributors: [], // Assuming contributors are empty for now
    };

    try {
      let result;
      if (achievementId) {
        result = await EditAchievement(achievementId, dataToSend);
      } else {
        result = await CreateAchievement(dataToSend);
      }

      if (result) {
        alert("Achievement saved successfully!");
        navigate("/my-feats");
      } else {
        alert("Failed to save achievement.");
      }
    } catch (error) {
      console.error("Error saving achievement:", error);
      alert("Error saving achievement. Please try again.");
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <div>
      <div className="achievement-container">
        <h2>{achievementId ? "Edit Achievement" : "Add Achievement"}</h2>

        <div className="achievement-form">
          {/* Title */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "10px" }}>
            <div>Achievement Title:</div>
            <input
              type="text"
              className="input-field"
              style={{ marginTop: "10px" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Date */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "10px" }}>
            <div>Date Attained:</div>
            <input
              type="date"
              className="input-field"
              style={{ marginTop: "10px" }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Type */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "10px" }}>
            <div>Achievement Type:</div>
            <select
              className="input-field"
              style={{ marginTop: "10px" }}
              value={type}
              onChange={(e) => setType(e.target.value)} // Update state when user selects a type
            >
              <option value="">Select Type</option>
              {types.map((typeItem) => (
                <option key={typeItem.id} value={typeItem.id}>
                  {typeItem.name}
                </option>
              ))}
            </select>
          </div>

          {/* Visibility */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "10px" }}>
            <div>Visibility:</div>
            <select
              className="input-field"
              style={{ marginTop: "10px" }}
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="">Visibility</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Description */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "10px" }}>
            <div>Description:</div>
            <textarea
              placeholder="Description"
              className="description-box"
              style={{ marginTop: "10px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="profile-buttons">
          <button onClick={handleSave}>{achievementId ? "Save Changes" : "Add Achievement"}</button>
        </div>
      </div>
    </div>
  );
}
