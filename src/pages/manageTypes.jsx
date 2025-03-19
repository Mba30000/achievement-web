import React, { useState } from "react";
import "./pages.css";

const ManageTypes = () => {
    const [types, setTypes] = useState([
        { id: 1, name: "Type 1", description: "Description of Type 1", editedFields: {}, initialValues: { name: "Type 1", description: "Description of Type 1" } },
        { id: 2, name: "Type 2", description: "Description of Type 2", editedFields: {}, initialValues: { name: "Type 2", description: "Description of Type 2" } },
        { id: 3, name: "Type 3", description: "Description of Type 3", editedFields: {}, initialValues: { name: "Type 3", description: "Description of Type 3" } },
    ]);

    const handleChange = (id, field, value) => {
        setTypes((prev) =>
            prev.map((type) =>
                type.id === id
                    ? {
                          ...type,
                          [field]: value,
                          editedFields: { ...type.editedFields, [field]: true }, // Mark the field as edited
                      }
                    : type
            )
        );
    };

    const handleAddType = () => {
        const newType = {
            id: types.length + 1,
            name: "New Type",
            description: "Description",
            editedFields: {},
            initialValues: { name: "New Type", description: "Description" },
        };
        setTypes([...types, newType]);
    };

    const handleRemoveType = (id) => {
        if (window.confirm("Are you sure you want to remove this type?")) {
            setTypes((prev) => prev.filter((type) => type.id !== id));
        }
    };

    return (
        <div className="profile-container">
            <div className="content">
                <h2>Manage Types</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {types.map((type) => (
                            <tr key={type.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={type.name}
                                        onChange={(e) => handleChange(type.id, "name", e.target.value)}
                                        style={{
                                            backgroundColor: type.name !== type.initialValues.name ? "#FFF9C4" : "transparent", // Change color if edited
                                        }}
                                    />
                                </td>
                                <td>
                                    <textarea
                                        value={type.description}
                                        onChange={(e) => handleChange(type.id, "description", e.target.value)}
                                        style={{
                                            backgroundColor: type.description !== type.initialValues.description ? "#FFF9C4" : "transparent", // Change color if edited
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
                                    <button className="remove-btn" onClick={() => handleRemoveType(type.id)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="add-btn" onClick={handleAddType}>
                Add New Type
            </button>
        </div>
    );
};

export default ManageTypes;
