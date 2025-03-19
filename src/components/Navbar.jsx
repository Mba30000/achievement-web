import { FaSearch, FaHome, FaUser, FaTrophy, FaBuilding, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import './Navbar.css'; // Import the CSS file
import { useState } from "react";

export default function Navbar() {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const location = useLocation(); // Hook to get current route location
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = async () => {
        // Remove the access token from localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_data"); // If you store other session details
        // Redirect the user to the login page or home page
        alert("logged out sucessfully");
        navigate("/login");
      };

      const handleSelectItem = (item) => {
        if (item.type === "User") {
            navigate(`/user/${item.id}`);
        } else if (item.type === "Department") {
            navigate(`/department/${item.id}`);
        } else if (item.type === "Achievement") {
            navigate(`/achievement/${item.id}`);
        }
    };
    
  const handleSearch = async (searchQuery) => {
    if (!searchQuery) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8000/search/?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      
      const mergedResults = [
        ...data.Users.map(user => ({ type: "User", name: user.username, id: user.id })),
        ...data.departments.map(dept => ({ type: "Department", name: dept.name, id: dept.id })),
        ...data.achievements.map(achieve => ({ type: "Achievement", name: achieve.title, id:achieve.id}))
      ];
      
      setResults(mergedResults.slice(0, 10)); // Get top 10 results
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

    return (
        <nav className="navbar">
            {/* Left Side - Logo & Search */}
            <div className="left-side">
                <img 
                    src="https://www.kau.edu.sa/Images/222/New_logo/%D9%82%D9%88%D8%A7%D8%B9%D8%AF%20%D8%A7%D8%B1%D8%B4%D8%A7%D8%AF%D9%8A%D8%A9/KAU_logo.png" 
                    alt="Achievement" 
                    width="45px" 
                    height="50px" 
                />
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input"
                        onChange={(e) => {
                            setQuery(e.target.value);
                            handleSearch(e.target.value);
                          }}
                    />
                    <div className="dropdown">
                    {showDropdown && results.length > 0 ? (
                        <ul >
                          {results.map((item, index) => (
                            <li key={index} onClick={() => handleSelectItem(item)} style={{ cursor: "pointer" }}>
                              <strong>{item.type}:</strong> {item.name}
                            </li>
                          ))}
                        </ul>
                      ) : query && (
                        <div className="text-red-500 mt-2">No results found</div>
                      )}
                    </div>
                </div>
            </div>

            {/* Right Side - Navigation Icons */}
            <div className="right-side" 
                        style={{ marginLeft: "20px" }}>
                <NavItem icon={<FaHome />} label="Home" to="/" currentPath={location.pathname} />
                <NavItem icon={<FaUser />} label="Account" to="/profile" currentPath={location.pathname} />
                <NavItem icon={<FaTrophy />} label="My Feats" to="/my-feats" currentPath={location.pathname} />
                <NavItem icon={<FaBuilding />} label="Department Feats" to="/department-feats" currentPath={location.pathname} />
                <NavItem icon={<FaPlus className="add-icon" />} label="Add an Achievement" to="/add-achievement" currentPath={location.pathname}  />
                <NavItem icon={<FaSignOutAlt />} label="Logout" to="/login" currentPath={location.pathname} onClick={handleLogout}/>
            </div>
        </nav>
    );
}

function NavItem({ icon, label, to, currentPath, className, onClick }) {
    // Check if the current path matches the nav item to apply active class
    const isActive = currentPath === to;
    return (
        <div>
          <Link
            to={to}
            className={`nav-item ${className} ${isActive ? "active" : ""}`} // Add "active" class if matched
            onClick={onClick}
          >
            <div className="icon">{icon}</div>
            <span className="label">{label}</span>
          </Link>
        </div>
    );
}