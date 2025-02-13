import { FaSearch, FaHome, FaUser, FaTrophy, FaBuilding, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import './Navbar.css'; // Import the CSS file

export default function Navbar() {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const location = useLocation(); // Hook to get current route location

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
                    />
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
                <NavItem icon={<FaSignOutAlt />} label="Logout" to="/login" currentPath={location.pathname} />
            </div>
        </nav>
    );
}

function NavItem({ icon, label, to, currentPath, className, onClick }) {
    // Check if the current path matches the nav item to apply active class
    const isActive = currentPath === to;
    return (
        <Link
            to={to}
            className={`nav-item ${className} ${isActive ? "active" : ""}`} // Add "active" class if matched
            onClick={onClick}
        >
            <div className="icon">{icon}</div>
            <span className="label">{label}</span>
        </Link>
    );
}