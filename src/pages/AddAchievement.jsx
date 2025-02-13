import { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Import the close (X) icon
import Navbar from "../components/Navbar";
import "./pages.css"; // Ensure styling is in place

export default function AddAchievement() {
  const [contributors, setContributors] = useState([""]); // Start with one input
  const [selectedImages, setSelectedImages] = useState([]); // State for images

  const handleContributorChange = (index, value) => {
    const updatedContributors = [...contributors];
    updatedContributors[index] = value;

    // If user starts typing in last input, add a new empty one
    if (value.trim() !== "" && index === contributors.length - 1) {
      updatedContributors.push("");
    }

    setContributors(updatedContributors);
  };

  const handleContributorBlur = (index) => {
    // Remove empty fields except the last one
    setContributors((prev) =>
      prev.filter((contributor, i) => contributor.trim() !== "" || i === prev.length - 1)
    );
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...newImages]); // Add new images to the state
    }
  };

  const removeImage = (imageUrl) => {
    setSelectedImages((prevImages) => prevImages.filter((image) => image !== imageUrl)); // Remove the selected image
  };

  return (
    <div>
      <Navbar />
      <div className="achievement-container">
        <h2>Add Achievement</h2>

        <div className="achievement-form">
          {/* Title */}
          <input type="text" placeholder="Title" className="input-field" />

          {/* Date */}
          <input type="date" className="input-field" />

          {/* Type */}
          <select className="input-field">
            <option>Type</option>
            <option>Award</option>
            <option>Certification</option>
            <option>Project</option>
          </select>

          {/* Visibility */}
          <select className="input-field">
            <option>Visibility</option>
            <option>Public</option>
            <option>Private</option>
          </select>

          {/* Contributors */}
          <div className="contributor-field" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {contributors.map((contributor, index) => (
              <input
                key={index}
                type="text"
                placeholder="Add contributors"
                className="input-field"
                value={contributor}
                onChange={(e) => handleContributorChange(index, e.target.value)}
                onBlur={() => handleContributorBlur(index)}
                style={{ margin: "10px" }}
              />
            ))}
          </div>

          {/* Image Upload */}
          <div className="image-upload">
            <input type="file" accept="image/*" id="imageUpload" multiple onChange={handleImageChange} style={{ display: "none" }} />
            <label htmlFor="imageUpload" className="upload-btn">📷 Upload Images</label>

            {/* Show Preview if Images are Selected */}
            <div className="image-preview-container">
              {selectedImages.map((image, index) => (
                <div key={index} className="image-preview">
                  <img src={image} alt={`Preview ${index}`} className="preview-image" />
                  <FaTimes className="remove-image" onClick={() => removeImage(image)} />
                </div>
              ))}
            </div>
          </div>

          {/* Description Box */}
          <textarea placeholder="Description" className="description-box"></textarea>

          {/* Save Changes Button */}
          <div className="profile-buttons"><button>Add</button></div>
        </div>
      </div>
    </div>
  );
}
