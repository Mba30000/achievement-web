import { useState } from "react";
import Navbar from "../components/Navbar";
import { FaEllipsisV, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

export default function MyFeats() {
    // State to track which dropdown is open
    const [openMenu, setOpenMenu] = useState(null);

    // Function to generate mock achievements
    const getMockAchievements = () => {
        return [
            {
                title: "Achievement type",
                description: "A short description of the achievement",
                date: "{Date}",
                keyPerson: { name: "Key person", role: "role" },
                contributors: [
                    { name: "Contributor 1", role: "role" },
                    { name: "Contributor 2", role: "role" },
                    { name: "Contributor 3", role: "role" }
                ],
                imageUrl: "https://pbs.twimg.com/media/GjQ6F1ZWwAA_hR1?format=jpg&name=4096x4096"
            }
        ];
    };

    const achievements = getMockAchievements();

    return (
        <div>
            <Navbar />
            <div className="scroll-pane-container">
                {achievements.map((achievement, index) => (
                    <div key={index} className="tab">
                        {/* Three-Dot Menu (Right-Aligned) */}
                        <div className="menu-container">
                            <FaEllipsisV className="menu-icon" onClick={() => setOpenMenu(openMenu === index ? null : index)} />
                            {openMenu === index && (
                                <div className="menu-dropdown">
                                    <button><FaEdit /></button>
                                    <button><FaTrash /></button>
                                </div>
                            )}
                        </div>
                        {/* Achievement Content */}
                        <img src={achievement.imageUrl} alt="Achievement" className="achievement-image" />
                        <div className="achievement-details">
                            <h2>{achievement.title}</h2>
                            <p>{achievement.description}</p>
                            <em>This achievement was attained on {achievement.date}</em>
                            <h3>Key Person</h3>
                            <h4>🏅 {achievement.keyPerson.name}: {achievement.keyPerson.role}</h4>
                            <h3>Contributors</h3>
                            <ul>
                                {achievement.contributors.map((contributor, i) => (
                                    <li key={i}>{contributor.name}: {contributor.role}</li>
                                ))}
                            </ul>
                            <p className="timestamp">2 hrs ago</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
