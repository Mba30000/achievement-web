import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUsers } from "react-icons/fa6";
import { BsBuildingsFill } from "react-icons/bs";
import { FaKey } from "react-icons/fa";
import { FaAward } from "react-icons/fa";
import { MdLabel } from "react-icons/md";
import './Navbar.css'; // Import the CSS file

const AdminNav = () => {
    const navigate = useNavigate();
    const location = useLocation();  // Get current route
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLeader, setIsLeader] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdminStatus = async () => {
            setIsAdmin(true);
            setIsLeader(true);
            setLoading(false);
        };
    
        checkAdminStatus(); // Call the function inside useEffect
    }, []);
    

    // Function to check if the current route matches the menu item
    const isActive = (path) => location.pathname === path ? "active-menu" : "";

    const menuItems = [
        { path: "/manageUsers", icon: <FaUsers />, text: 'Manage Users' },
        { path: "/manageDepts", icon: <BsBuildingsFill />, text: 'Manage Departments' },
        { path: "/manageRoles", icon: <FaKey />, text: 'Manage Role Permissions' },
        { path: "/manageAcheivType", icon: <MdLabel />, text: 'Manage Acheivment Types' },
        { path: "/ManageAttributes", icon: <FaAward />, text: 'Manage Attributes' },
    ];

    return (
        <div className="container">
            <div className="wrapper side">
                {loading ? (
                    <div>Loading...</div> // Replace with a spinner if needed
                ) : (
                    <>
                        {menuItems.map((item, index) => (
                            <div key={index} className={`menu-item ${isActive(item.path)}`}>
                                <Link to={item.path}>
                                    <div className="icon">{item.icon}</div>
                                </Link>
                                <div className="text">{item.text}</div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminNav;
