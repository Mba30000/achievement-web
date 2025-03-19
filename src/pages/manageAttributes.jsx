import React, { useState } from "react";
import "./pages.css";

const ManageAttributes = () => {
    const [attributes, setAttributes] = useState([
        { id: 1, name: "Attribute 1", value: "Value of Attribute 1", editedFields: {}, initialValues: { name: "Attribute 1", value: "Value of Attribute 1" } },
        { id: 2, name: "Attribute 2", value: "Value of Attribute 2", editedFields: {}, initialValues: { name: "Attribute 2", value: "Value of Attribute 2" } },
        { id: 3, name: "Attribute 3", value: "Value of Attribute 3", editedFields: {}, initialValues: { name: "Attribute 3", value: "Value of Attribute 3" } },
    ]);

    const handleChange = (id, field, value) => {
        setAttributes((prev) =>
            prev.map((attribute) =>
                attribute.id === id
                    ? {
                          ...attribute,
                          [field]: value,
                          editedFields: { ...attribute.editedFields, [field]: value !== attribute.initialValues[field] }, // Mark as edited only if changed
                      }
                    : attribute
            )
        );
    };

    const handleAddAttribute = () => {
        const newAttribute = {
            id: attributes.length + 1,
            name: "New Attribute",
            value: "Value",
            editedFields: {},
            initialValues: { name: "New Attribute", value: "Value" },
        };
        setAttributes([...attributes, newAttribute]);
    };

    const handleRemoveAttribute = (id) => {
        if (window.confirm("Are you sure you want to remove this attribute?")) {
            setAttributes((prev) => prev.filter((attribute) => attribute.id !== id));
        }
    };

    return (
        <div className="profile-container">
            <div className="content">
                <h2>Manage Attributes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attributes.map((attribute) => (
                            <tr key={attribute.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={attribute.name}
                                        onChange={(e) => handleChange(attribute.id, "name", e.target.value)}
                                        style={{
                                            backgroundColor: attribute.editedFields.name ? "#FFF9C4" : "transparent",
                                        }}
                                    />
                                </td>
                                <td>
                                    <textarea
                                        value={attribute.value}
                                        onChange={(e) => handleChange(attribute.id, "value", e.target.value)}
                                        style={{
                                            backgroundColor: attribute.editedFields.value ? "#FFF9C4" : "transparent",
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
                                    <button className="remove-btn" onClick={() => handleRemoveAttribute(attribute.id)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="add-btn" onClick={handleAddAttribute}>
                Add New Attribute
            </button>
        </div>
    );
};

export default ManageAttributes;
