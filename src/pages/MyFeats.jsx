import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Navbar from "../components/Navbar";
import { useFetchPeople, useFetchAchievements, useFetchDepartments } from "./Utilities/containers";
import AchievementContainer from "./Utilities/containers";
import { DeleteAchievement } from './Utilities/api'; // Import DeleteAchievement method

export default function MyFeats() {
    const navigate = useNavigate(); // Initialize navigate hook
    const userId = localStorage.getItem('userid');
    
    // Initialize achievements state locally if setAchievements is not provided by hook
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch achievements and related data
    const { achievements: fetchedAchievements, loadingAchievements } = useFetchAchievements(`user/${userId}`);
    const { departments, loadingDepartments } = useFetchDepartments(fetchedAchievements);
    const { people, loadingPeople } = useFetchPeople(fetchedAchievements);

    useEffect(() => {
        // Set achievements when fetchedAchievements changes
        setAchievements(fetchedAchievements);
    }, [fetchedAchievements]);

    const handleDelete = async (achievementId, index) => {
        // Show confirmation alert
        const confirmed = window.confirm('Are you sure you want to delete this achievement?');
        if (confirmed) {
            const result = await DeleteAchievement(achievementId);

            if (result) {
                alert('Achievement deleted successfully!');
                window.location.reload();
            } else {
                alert('Failed to delete achievement.');
            }
            setLoading(false);
        }
    };

    const handleEdit = (achievementId) => {
        navigate(`/edit-achievement/${achievementId}`); // Navigate to edit page with achievementId
    };
    

    // Check if there are no achievements
    if (achievements.length === 0) {
        return (
            <div>
                <div className="scroll-pane-container">
                    <div>
                       You have not added any achievements
                    </div>
                    <div onClick={() => navigate('/add-achievement')} style={{ color: 'blue', cursor: 'pointer' }} className='link'>
                       Click HERE to add an achievement
                    </div>
                </div>
                <Navbar />
            </div>
        );
    } else if (loadingAchievements || loadingDepartments || loadingPeople || loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="scroll-pane-container">
                {achievements.map((achievement, index) => {
                    const department = departments[index]; // Match achievement to its department
                    const person = people[index]; // Match achievement to its person

                    return (
                        <AchievementContainer
                            key={index}
                            index={index}
                            department={department}
                            achievement={achievement}
                            person={person}
                            showMenu={true}
                            onDelete={() => handleDelete(achievement.id, index)} // Pass the delete function
                            onEdit={() => handleEdit(achievement.id)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
