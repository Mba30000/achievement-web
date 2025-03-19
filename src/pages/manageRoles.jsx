import React, { useState } from "react";
import "./pages.css";

const ManageRoles = () => {
    const [roles, setRoles] = useState([
        {
            id: 1,
            name: "Admin",
            editAll: true,
            editDept: false,
            editLimited: false,
            readOnly: false,
            immutable: true, // Admin role cannot be modified or removed
        },
        {
            id: 2,
            name: "Manager",
            editAll: false,
            editDept: true,
            editLimited: false,
            readOnly: false,
            immutable: false,
        },
        {
            id: 3,
            name: "User",
            editAll: false,
            editDept: false,
            editLimited: false,
            readOnly: true,
            immutable: false,
        },
    ]);

    const handleChange = (id, field) => {
        setRoles((prev) =>
            prev.map((role) =>
                role.id === id && !role.immutable
                    ? {
                          ...role,
                          editAll: field === "editAll",
                          editDept: field === "editDept",
                          editLimited: field === "editLimited",
                          readOnly: field === "readOnly",
                      }
                    : role
            )
        );
    };

    const handleAddRole = () => {
        const newRole = {
            id: roles.length + 1,
            name: "New Role",
            editAll: false,
            editDept: false,
            editLimited: false,
            readOnly: true,
            immutable: false,
        };
        setRoles([...roles, newRole]);
    };

    const handleRemoveRole = (id) => {
        if (window.confirm("Are you sure you want to remove this role?")) {
            setRoles((prev) => prev.filter((role) => role.id !== id || role.immutable));
        }
    };

    return (
        <div className="profile-container">
            <div className="content">
                <h2>Manage Roles</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Edit All</th>
                            <th>Edit Department</th>
                            <th>Edit Limited</th>
                            <th>Read Only</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={role.name}
                                        disabled={role.immutable}
                                        onChange={(e) =>
                                            setRoles((prev) =>
                                                prev.map((r) =>
                                                    r.id === role.id && !r.immutable
                                                        ? { ...r, name: e.target.value }
                                                        : r
                                                )
                                            )
                                        }
                                        style={{
                                            backgroundColor: role.immutable ? "#E0E0E0" : "transparent",
                                            cursor: role.immutable ? "not-allowed" : "text",
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={role.editAll}
                                        disabled={role.immutable}
                                        onChange={() => handleChange(role.id, "editAll")}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={role.editDept}
                                        disabled={role.immutable}
                                        onChange={() => handleChange(role.id, "editDept")}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={role.editLimited}
                                        disabled={role.immutable}
                                        onChange={() => handleChange(role.id, "editLimited")}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={role.readOnly}
                                        disabled={role.immutable}
                                        onChange={() => handleChange(role.id, "readOnly")}
                                    />
                                </td>
                                <td>
                                    <button
                                        className="remove-btn"
                                        onClick={() => handleRemoveRole(role.id)}
                                        disabled={role.immutable}
                                        style={{
                                            backgroundColor: role.immutable ? "#E0E0E0" : "",
                                            cursor: role.immutable ? "not-allowed" : "pointer",
                                        }}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="add-btn" onClick={handleAddRole}>
                Add New Role
            </button>
        </div>
    );
};

export default ManageRoles;
