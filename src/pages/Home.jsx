import { FaListCheck } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import AchievementContainer from "./Utilities/containers";
import { useFetchPeople, useFetchAchievements, useFetchDepartments } from "./Utilities/containers";
import AdminNav from "../components/AdminNav";
const Home = () => {
    const { achievements: fetchedAchievements, loadingAchievements } = useFetchAchievements("recent"); // Fetch achievements with "recent" category
    const { departments, loadingDepartments } = useFetchDepartments(fetchedAchievements);
    const { people, loadingPeople } = useFetchPeople(fetchedAchievements);

    if (loadingAchievements || loadingDepartments || loadingPeople) {
        return <div>Loading...</div>;
    }

    return (
        <div>
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
};

export default Home;
