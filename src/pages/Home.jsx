import Navbar from "../components/Navbar";

const Home = () => {
  const getMockAchievements = () => {
    return [
        {
            title: "Achievement title",
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
    return (<div><Navbar/><div className="scroll-pane-container">
              {achievements.map((achievement, index) => (
                    <div key={index} className="tab" style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }} >
                          <img 
                              src="https://pbs.twimg.com/profile_images/1176128207369777154/ihDtbruw_200x200.jpg" 
                              alt="Achievement" 
                              width="50px" 
                              height="50px" 
                          />
                          <h2>Department of Electrical and Computer Engineering</h2>
                          </div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <img src={achievement.imageUrl} alt="Achievement" className="achievement-image" />
                        <div className="achievement-details">
                            <h2>{achievement.title}</h2>
                            <p>{achievement.description}</p>
                            <em>This achievement was attained on {achievement.date}</em>
                            <h3>Key Person</h3>
                            <h4>🏅 {achievement.keyPerson.name}: {achievement.keyPerson.role}</h4>
                            <h3>Contributers</h3>
                            <ul>
                                {achievement.contributors.map((contributor, i) => (
                                    <li key={i}>{contributor.name}: {contributor.role}</li>
                                ))}
                            </ul>
                            <p className="timestamp">2 hrs ago</p>
                        </div>
                        </div>
                    </div>
                ))}
          </div>
      </div>);
  }

export default Home;