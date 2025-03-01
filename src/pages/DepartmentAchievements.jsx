import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchPeople, useFetchAchievements, useFetchDepartments } from "./Utilities/containers";
import AchievementContainer from "./Utilities/containers";
import Navbar from "../components/Navbar";
export default function DepartmentAchievements() {
    const { departmentId } = useParams();
    const navigate = useNavigate();
    const { achievements: fetchedAchievements, loadingAchievements } = useFetchAchievements(`user/${departmentId}`); // Fetch achievements with "recent" category
    const { departments, loadingDepartments } = useFetchDepartments(fetchedAchievements);
    const { people, loadingPeople } = useFetchPeople(fetchedAchievements);
    if (loadingAchievements || loadingDepartments || loadingPeople) {
        return <div>Loading...</div>;
    }

    return (
        <div>
                <button onClick={() => navigate("/")} className="back-button">&larr; Back</button>
                    <div className="scroll-pane-container">
                    <AchievementContainer 
                                                department={departments[0]} 
                                                />
                                    {fetchedAchievements.map((achievement, index) => {
                                        const department = departments[index]; // Match achievement to its department
                                        const person = people[index]; // Match achievement to its person
                    
                                        return (
                                            <AchievementContainer 
                                                key={index} 
                                                index={index} 
                                                department={null} 
                                                achievement={achievement} 
                                                person={person} 
                                                showMenu={false} // Pass the boolean value here
                                                />
                    
                                        );
                                    })}
                                </div>
                           <Navbar />
                       </div>
    );
}
