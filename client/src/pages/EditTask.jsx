import React, { useState, useEffect } from "react";
import axios from "../hooks/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Select from "../components/Select";
import Button from "../components/Button";
import { UserData } from "../hooks/useUser";

const EditTask = () => {
  const navigate = useNavigate();
  const { user, tasks } = UserData();
  const { taskId } = useParams(); // Get taskId from the URL
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = tasks.find((task) => task._id === taskId);
        setFormData({
          title: response.title,
          description: response.description,
          priority: response.priority,
          dueDate: response.dueDate,
        });
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching task data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTaskData();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formattedDueDate = new Date(formData.dueDate)
      .toISOString()
      .slice(0, 10);

    const taskData = {
      ...formData,
      dueDate: formattedDueDate,
      userId: user.id,
    };
    console.log(taskData);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `/api/tasks/update/${taskId}`,
        { ...formData, dueDate: formattedDueDate, userId: user.id }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      setSuccess("Task updated successfully!");

      // setTimeout(() => {
      //   navigate("/todo/dashboard");
      // }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating task.");
    }
  };

  if (loading) return <div>Loading task...</div>;

  return (
    <div className="h-[93dvh] lg:h-[100dvh] flex justify-center items-center px-4 bg-white dark:bg-gray-900 dark:text-white transition-colors">
      <div className="w-full border dark:border-gray-700 max-w-2xl bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">✏️ Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Field */}
          <Input
            id="title"
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* Description Field */}
          <Textarea
            id="description"
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          {/* Priority Field */}
          <Select
            id="priority"
            name="priority"
            label="Priority"
            value={formData.priority}
            onChange={handleChange}
            required
            options={[
              { value: "Low", label: "Low" },
              { value: "Medium", label: "Medium" },
              { value: "High", label: "High" },
            ]}
          />

          {/* Due Date Field */}
          <Input
            id="dueDate"
            name="dueDate"
            label="Due Date"
            type="date"
            value={
              formData.dueDate
                ? new Date(formData.dueDate).toISOString().slice(0, 10)
                : ""
            }
            onChange={handleChange}
            required
          />

          {/* Error Message */}
          {error && (
            <p className="text-red-600 dark:text-red-400 font-medium">
              {error}
            </p>
          )}

          {/* Success Message */}
          {success && (
            <p className="text-green-600 dark:text-green-400 font-medium">
              {success}
            </p>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={loading}>
            Update Task
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
