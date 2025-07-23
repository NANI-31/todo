import axios from "../hooks/axiosConfig";

export const createTask = async (taskData) => {
  try {
    const response = await axios.post("api/tasks/create", taskData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error creating task.";
  }
};
