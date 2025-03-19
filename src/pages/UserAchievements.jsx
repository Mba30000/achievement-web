import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./pages.css"
import { useFetchPeople, useFetchAchievements, useFetchDepartments } from "./Utilities/containers";
import AchievementContainer from "./Utilities/containers";

export default function UserAchievements() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { achievements: fetchedAchievements, loadingAchievements } = useFetchAchievements(`user/${userId}`); // Fetch achievements with "recent" category
    const { departments, loadingDepartments } = useFetchDepartments(fetchedAchievements);
    const { people, loadingPeople } = useFetchPeople(fetchedAchievements);
    if (loadingAchievements || loadingDepartments || loadingPeople) {
        return <div>Loading...</div>;
    }
    return (
       <div>
        <button onClick={() => navigate("/")} className="back-button">&larr; Back</button>
            <div className="scroll-pane-container">
                            {fetchedAchievements.map((achievement, index) => {
                                const department = departments[index]; // Match achievement to its department
                                const person = people[index]; // Match achievement to its person
            
                                return (
                                    <AchievementContainer 
                                        key={index} 
                                        index={index} 
                                        department={department} 
                                        achievement={achievement} 
                                        person={person} 
                                        showMenu={false} // Pass the boolean value here
                                        />
            
                                );
                            })}
                        </div>
               </div>
    );
}
