import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useFetchPeople, useFetchAchievements, useFetchDepartments } from "./Utilities/containers";
import AchievementContainer from "./Utilities/containers";

export default function AchievementDetails() {
    const { achievementId } = useParams();
    const navigate = useNavigate();

    // Fetch single achievement using achievementId
    const { achievements: fetchedAchievement, loadingAchievements } = useFetchAchievements(`achievement/${achievementId}`);
    
    // States to manage loading department and person data
    const { department, loadingDepartment } = useFetchDepartments(fetchedAchievement);
    const { person, loadingPerson } = useFetchPeople(fetchedAchievement);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Set loading status when all data is fetched
        if (!loadingAchievements && !loadingDepartment && !loadingPerson) {
            setIsLoaded(true);
        }
    }, [loadingAchievements, loadingDepartment, loadingPerson]);

    // If data is still loading, show loading state
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    // If achievement is not found or is invalid
    if (!fetchedAchievement) {
        return <div>Error: Achievement not found.</div>;
    }

    // Only update department and person if they are valid (non-null, non-empty)
    const validDepartment = department && department.length > 0 ? department : null;
    const validPerson = person && person.length > 0 ? person : null;

    return (
        <div>
            <button onClick={() => navigate("/")} className="back-button">&larr; Back</button>
            <div className="scroll-pane-container">
                {/* Render AchievementContainer with valid data */}
                <AchievementContainer 
                    key={fetchedAchievement.id} 
                    index={0} 
                    department={validDepartment}  // Pass valid department
                    achievement={fetchedAchievement} 
                    person={validPerson}  // Pass valid person
                    showMenu={false} 
                />
            </div>
            <Navbar />
        </div>
    );
}
