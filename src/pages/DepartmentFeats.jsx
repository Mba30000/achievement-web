import Navbar from "../components/Navbar";
import { useFetchPeople, useFetchAchievements, useFetchDepartments } from "./Utilities/containers";
import AchievementContainer from "./Utilities/containers";
import { GetPerson } from "./Utilities/api";
import { useState } from "react";

export default function DepartmentFeats() {
    const userId = localStorage.getItem('userid');
    const [department_id, setDepartmentId] = useState("");
    GetPerson(userId).then(person => {
        setDepartmentId(person.department_id);
    })
        const { achievements: fetchedAchievements, loadingAchievements } = useFetchAchievements(`department/${department_id}`); // Fetch achievements with "recent" category
        const { departments, loadingDepartments } = useFetchDepartments(fetchedAchievements);
        const { people, loadingPeople } = useFetchPeople(fetchedAchievements);
    
        if (loadingAchievements || loadingDepartments || loadingPeople) {
            return <div>Loading...</div>;
        }

    return (
        <div>
             <div className="scroll-pane-container">
                    {<AchievementContainer 
                                department={departments[0]} 
                                showMenu={false} // Pass the boolean value here
                    />}
                    {fetchedAchievements.map((achievement, index) => {
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
