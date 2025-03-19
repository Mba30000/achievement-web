import React, { useState } from "react";
import "./pages.css";

const ManageDept = () => {
    const [departments, setDepartments] = useState([
        { id: 1, name: "HR", description: "Human Resources", code: "HR123", editedFields: {}, initialValues: { name: "HR", description: "Human Resources", code: "HR123" } },
        { id: 2, name: "IT", description: "Information Technology", code: "IT456", editedFields: {}, initialValues: { name: "IT", description: "Information Technology", code: "IT456" } },
        { id: 3, name: "Finance", description: "Financial Department", code: "FIN789", editedFields: {}, initialValues: { name: "Finance", description: "Financial Department", code: "FIN789" } },
    ]);

    const generateRandomCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    const handleChange = (id, field, value) => {
        setDepartments((prev) =>
            prev.map((dept) =>
                dept.id === id
                    ? {
                          ...dept,
                          [field]: value,
                          editedFields: { ...dept.editedFields, [field]: true }, // Mark field as edited
                      }
                    : dept
            )
        );
    };

    const handleGenerateCode = (id) => {
        setDepartments((prev) =>
            prev.map((dept) =>
                dept.id === id
                    ? {
                          ...dept,
                          code: generateRandomCode(),
                          editedFields: { ...dept.editedFields, code: true }, // Mark code as edited
                      }
                    : dept
            )
        );
    };

    const handleAddDepartment = () => {
        const newDept = {
            id: departments.length + 1,
            name: "New Department",
            description: "Description",
            code: generateRandomCode(),
            editedFields: {},
            initialValues: { name: "New Department", description: "Description", code: generateRandomCode() }, // Track initial values for new department
        };
        setDepartments([...departments, newDept]);
    };

    const handleRemoveDepartment = (id) => {
        if (window.confirm("Are you sure you want to remove this department?")) {
            setDepartments((prev) => prev.filter((dept) => dept.id !== id));
        }
    };

    return (
        <div className="profile-container">
            <div className="content">
                <h2>Manage Departments</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Code</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((dept) => (
                            <tr key={dept.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={dept.name}
                                        onChange={(e) => handleChange(dept.id, "name", e.target.value)}
                                        style={{
                                            backgroundColor: dept.name !== dept.initialValues.name ? "#FFF9C4" : "transparent", // Change color if edited
                                        }}
                                    />
                                </td>
                                <td>
                                    <textarea
                                        value={dept.description}
                                        onChange={(e) => handleChange(dept.id, "description", e.target.value)}
                                        style={{
                                            backgroundColor: dept.description !== dept.initialValues.description ? "#FFF9C4" : "transparent", // Change color if edited
                                            width: "100%",
                                            height: "60px",
                                            resize: "vertical",
                                            padding: "8px",
                                            border: "1px solid #ddd",
                                            boxSizing: "border-box",
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={dept.code}
                                        readOnly
                                        style={{
                                            backgroundColor: dept.code !== dept.initialValues.code ? "red" : "transparent", // Change color if edited
                                        }}
                                    />
                                    <button className="generate-btn" onClick={() => handleGenerateCode(dept.id)}>
                                        Re-generate
                                    </button>
                                </td>
                                <td>
                                    <button className="remove-btn" onClick={() => handleRemoveDepartment(dept.id)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="add-btn" onClick={handleAddDepartment}>
                Add New Department
            </button>
        </div>
    );
};

export default ManageDept;
