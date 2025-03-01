import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

// Custom hook to fetch user
export const GetUser = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/`);
        return response.data;
    } catch (err) {
        console.error('Error fetching user:', err);
        return null;
    }
};

// Custom hook to fetch person
export const GetPerson = async (personId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/persons/${personId}/`);
        return response.data;
    } catch (err) {
        console.error('Error fetching person:', err);
        return null;
    }
};

// Custom hook to fetch achievement
export const GetAchievement = async (achievementId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/achievements/achievement/${achievementId}/`);
        return response.data;
    } catch (err) {
        console.error('Error fetching achievement:', err);
        return null;
    }
};

// Custom hook to fetch department
export const GetDepartment = async (departmentId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/department/${departmentId}/`);
        return response.data;
    } catch (err) {
        console.error('Error fetching department:', err);
        return null;
    }
};

// Custom hook to fetch department name
export const GetDepartmentName = async (departmentId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/department/${departmentId}/`);
        return response.data.name;  // Assuming the department name is returned in the `name` field
    } catch (err) {
        console.error('Error fetching department name:', err);
        return null;
    }
};

export const GetRoleName = async (roleId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/role/${roleId}/`);
        return response.data;
    } catch (err) {
        console.error('Error fetching role name:', err);
        return "";
    }
};


// Custom hook for signup
export const Signup = async (userData) => {
    try {
        const result = await axios.post(`${API_BASE_URL}/signup/`, userData);
        return result.data;
    } catch (err) {
        console.error('Error during signup:', err);
        return null;
    }
};

// Custom hook for login
export const Login = async (formData) => {
    try {
        const result = await axios.post(`${API_BASE_URL}/token/`, formData);
        return result.data;
    } catch (err) {
        console.error('Error during login:', err);
        return null;
    }
};

// Custom hook for logout
export const Logout = async () => {
    try {
        const result = await axios.post(`${API_BASE_URL}/logout/`);
        return result.data;
    } catch (err) {
        console.error('Error during logout:', err);
        return null;
    }
};


// Custom hook to update person
export const UpdatePerson = async (personId, updatedPerson) => {
    try {
        const result = await axios.put(`${API_BASE_URL}/person/${personId}/`, updatedPerson);
        return result.data;
    } catch (err) {
        console.error('Error updating person:', err);
        return null;
    }
};

// Custom hook to create achievement
// Custom hook to create achievement
export const CreateAchievement = async (achievementData) => {
    try {
        const result = await axios.post(
            `${API_BASE_URL}/achievements/`, 
            achievementData, 
            {
                headers: {
                    'Content-Type': 'application/json', // Ensure Content-Type is set to JSON
                }
            }
        );
        console.log("API Response:", result.data); // Log the response
        return result.data;
    } catch (err) {
        console.error("Error creating achievement:", err);
        if (err.response) {
            // Log additional response data for debugging
            console.error("API error response:", err.response.data);
            console.error("API error status:", err.response.status);
        }
        return null;
    }
};


// Custom hook to edit user profile
export const EditUserProfile = async (userId, updatedUser) => {
    try {
        console.log(userId)
        const result = await axios.put(`${API_BASE_URL}/users/${userId}/`, updatedUser);
        return result.data;
    } catch (err) {
        console.error('Error editing user profile:', err);
        return null;
    }
};



export const EditAchievement = async (achievementId, updatedAchievement) => {
    console.log("Data at EditAchievement:", updatedAchievement.achievement); // Log data before sending

    try {
        const response = await axios.put(
            `${API_BASE_URL}/achievements/${achievementId}/`, // Ensure trailing slash if required by FastAPI
            updatedAchievement.achievement,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("API Response:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error updating achievement:", error);

        if (error.response) {
            console.error("API error response:", error.response.data);
            console.error("API error status:", error.response.status);
        } else if (error.request) {
            console.error("No response received from API:", error.request);
        } else {
            console.error("Error setting up request:", error.message);
        }

        return null;
    }
};



// Custom hook to delete achievement
export const DeleteAchievement = async (achievementId) => {
    try {
        const result = await axios.delete(`${API_BASE_URL}/achievements/${achievementId}/`);
        return result.data;
    } catch (err) {
        console.error('Error deleting achievement:', err);
        return null;
    }
};

// Custom hook to fetch user achievements
export const GetUserAchievements = async (userId) => {
    try {
        const result = await axios.get(`${API_BASE_URL}/achievements/user/${userId}/`);
        return result.data;
    } catch (err) {
        console.error('Error fetching user achievements:', err);
        return null;
    }
};

// Custom hook to fetch department achievements
export const GetDepartmentAchievements = async (departmentId) => {
    try {
        const result = await axios.get(`${API_BASE_URL}/achievements/department/${departmentId}/`);
        return result.data;
    } catch (err) {
        console.error('Error fetching department achievements:', err);
        return null;
    }
};

// Custom hook to fetch recent achievements
export const GetRecentAchievements = async () => {
    try {
        const result = await axios.get(`${API_BASE_URL}/achievements/recent/`);
        return result.data;
    } catch (err) {
        console.error('Error fetching recent achievements:', err);
        return null;
    }
};

// Custom hook to perform a search
export const SearchEntities = async (query) => {
    try {
        const result = await axios.get(`${API_BASE_URL}/search/`, { params: { query } });
        return result.data;
    } catch (err) {
        console.error('Error performing search:', err);
        return null;
    }
};

// Function to get all roles
export const getRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/roles/`);
      return response.data; // Assuming the response is an array of roles
    } catch (error) {
      console.error("Error fetching roles:", error);
      return [];
    }
  };

  export const getTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/types/`);
      return response.data; // Assuming the response is an array of roles
    } catch (error) {
      console.error("Error fetching roles:", error);
      return [];
    }
  };
  