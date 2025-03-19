import React, { useState } from "react";
import "./pages.css";

const ManageUsers = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", username: "jdoe", department: "HR", role: "Admin", initialDepartment: "HR", initialRole: "Admin" },
        { id: 2, name: "Jane Smith", username: "jsmith", department: "IT", role: "User", initialDepartment: "IT", initialRole: "User" },
        { id: 3, name: "Mike Brown", username: "mbrown", department: "Finance", role: "Manager", initialDepartment: "Finance", initialRole: "Manager" },
        { id: 4, name: "Alice Green", username: "agreen", department: "Marketing", role: "Guest", initialDepartment: "Marketing", initialRole: "Guest" },
    ]);

    const departments = ["All", "HR", "IT", "Finance", "Marketing", "Engineering"];
    const roles = ["All", "Admin", "User", "Manager", "Guest"];

    const [selectedDept, setSelectedDept] = useState("All");
    const [selectedRole, setSelectedRole] = useState("All");

    const handleChange = (id, field, value) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === id ? { ...user, [field]: value } : user))
        );
    };

    const filteredUsers = users.filter(
        (user) =>
            (selectedDept === "All" || user.department === selectedDept) &&
            (selectedRole === "All" || user.role === selectedRole)
    );

    return (
        <div className="profile-container">
            <div className="content">
                <h2>Manage Users</h2>

                {/* Filter Controls */}
                {/* Filter Controls */}
                <div className="filter-container">
                    <label>Filter by Department:</label>
                    <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                        {departments.map((dept) => (
                            <option key={dept} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>

                    <label>Filter by Role:</label>
                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>


                {/* Users Table */}
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Department</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>
                                    <select
                                        value={user.department}
                                        onChange={(e) => handleChange(user.id, "department", e.target.value)}
                                        style={{
                                            backgroundColor: user.department !== user.initialDepartment ? "#FFF9C4" : "transparent",
                                        }}
                                    >
                                        {departments.slice(1).map((dept) => (
                                            <option key={dept} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleChange(user.id, "role", e.target.value)}
                                        style={{
                                            backgroundColor: user.role !== user.initialRole ? "#FFF9C4" : "transparent",
                                        }}
                                    >
                                        {roles.slice(1).map((role) => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
