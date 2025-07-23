import React, { useState, useEffect } from "react";
import axios from "../hooks/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Select from "../components/Select";
import Button from "../components/Button";
import { UserData } from "../hooks/useUser";
import { toast } from "react-toastify";
import BouncingBlob from "../components/BouncingBlob2";
import { createTask } from "../services/taskService";

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

    try {
      const response = await axios.put(`/api/tasks/update/${taskId}`, {
        ...formData,
        dueDate: formattedDueDate,
        userId: user.id,
      });
      toast.success("Task updated successfully!");
      setSuccess("Task updated successfully!");
    } catch (err) {
      toast.error("Failed to update task. Please try again.");
      setError(err.response?.data?.message || "Error updating task.");
    }
  };

  if (loading) return <div>Loading task...</div>;

  return (
    <div className="relative h-[93dvh] lg:h-[100dvh] flex justify-center items-center px-4 bg-white dark:bg-gray-900 dark:text-white transition-colors">
      <BouncingBlob />
      <div className="w-full border dark:border-gray-700 max-w-2xl bg-white dark:bg-gray-800 pb-6 rounded shadow">
        <div class="custom-shape-divider-top-1753212085">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold p-6 z-10">
          ✏️ Edit <span className="text-pink-500">Task</span>
        </h2>
        <form onSubmit={handleSubmit} className="relative px-6 space-y-5">
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
          <Button
            type="submit"
            disabled={loading}
            className="sidebar-btn-active"
          >
            Edit Task
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
