import React from "react";
import PropTypes from "prop-types";
import timeAgo from "./math"; // ✅ No need to add `.jsx` unless necessary
import { useState, useEffect } from "react";
import { GetPerson, GetDepartment } from "./api"; // Adjust path if necessary
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";

export const useFetchAchievements = (category = "recent") => {
    const [achievements, setAchievements] = useState([]);
    const [loadingAchievements, setLoadingAchievements] = useState(true);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
    const response = await fetch(`http://localhost:8000/achievements/${category}/`);
    const data = await response.json();

    // Check if data is an array before sorting
    const sortedData = Array.isArray(data) 
        ? data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) 
        : data;

    setAchievements(sortedData);
    console.log("Achievements data:", sortedData);
} catch (error) {
    console.error("Error fetching achievements:", error);
} finally {
    setLoadingAchievements(false);
}

        };

        fetchAchievements();
    }, [category]);

    return { achievements, loadingAchievements };
};

export const useFetchDepartments = (achievements) => {
    const [departments, setDepartments] = useState([]);
    const [loadingDepartments, setLoadingDepartments] = useState(true);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const departmentPromises = achievements.map((achievement) =>
                    GetDepartment(achievement.department_id) // Fetch department by ID
                );

                const departmentData = await Promise.all(departmentPromises);
                setDepartments(departmentData);
                console.log("Departments data:", departmentData);
            } catch (err) {
                console.error("Error fetching departments", err);
            } finally {
                setLoadingDepartments(false);
            }
        };

        if (achievements.length > 0) {
            fetchDepartments();
        }
    }, [achievements]);

    return { departments, loadingDepartments };
};

export const useFetchPeople = (achievements) => {
    const [people, setPeople] = useState([]);
    const [loadingPeople, setLoadingPeople] = useState(true);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const personPromises = achievements.map((achievement) =>
                    GetPerson(achievement.primary_person_id) // Fetch person by ID
                );

                const personData = await Promise.all(personPromises);
                setPeople(personData);
                console.log("People data:", personData); // Log people data
            } catch (err) {
                console.error("Error fetching people", err);
            } finally {
                setLoadingPeople(false);
            }
        };

        if (achievements.length > 0) {
            fetchPeople();
        }
    }, [achievements]);

    return { people, loadingPeople };
};

const AchievementContainer = ({ index, department, achievement, person, showMenu, onDelete, onEdit }) => {
  const [openMenu, setOpenMenu] = useState(false); // Local state for menu visibility

  return (
    <div key={index} className="tab" style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        {/* Display department name only if it exists */}
        {department?.name && <h2>{department.name}</h2>}

        {showMenu && (
          <div className="menu-container" style={{ marginLeft: "auto" }}>
              <FaEllipsisV
                className="menu-icon"
                onClick={() => setOpenMenu(prevState => !prevState)} // Toggle menu visibility
              />
              {openMenu && (
                <div className="menu-dropdown">
                  <button onClick={() => onEdit(achievement.id, index)}><FaEdit /></button>
                  <button onClick={() => onDelete(achievement.id, index)}><FaTrash /></button> {/* Trigger delete on click */}
                </div>
              )}
          </div>
        )}
      </div>
      
      {achievement && (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <img src="https://via.placeholder.com/150" alt="Achievement" className="achievement-image" />
          <div className="achievement-details">
            <h2>{achievement.title}</h2>
            <p>{achievement.description}</p>
            <em>
              This achievement was attained on {new Date(achievement.date).toLocaleDateString()}
            </em>
            <h3 className="timestamp">
              {achievement.updated_at && new Date(achievement.updated_at) > new Date(achievement.created_at) ? "Updated: " : "Created: " }
              {achievement.updated_at && new Date(achievement.updated_at) > new Date(achievement.created_at) ? 
                `${timeAgo(achievement.updated_at)}` : 
                `${timeAgo(achievement.created_at)}`}
            </h3>
          </div>
        </div>
      )}

      {person && (
        <div>
          <h3>Key Person</h3>
          <h4>🏅 {`${person.first_name} ${person.last_name}`}</h4>
        </div>
      )}
    </div>
  );
};
export default AchievementContainer;
