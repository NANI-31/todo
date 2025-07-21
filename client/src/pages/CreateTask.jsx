import React, { useState } from "react";
import axios from "../hooks/axiosConfig";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Select from "../components/Select";
import Button from "../components/Button";
import { UserData } from "../hooks/useUser";

const CreateTask = () => {
  const navigate = useNavigate();
  const { user } = UserData();
  const [formData, setFormData] = useState({
    title: "a",
    description: "a",
    priority: "Medium",
    dueDate: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    console.log(formData);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "api/tasks/create",
        { ...formData, userId: user.id }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      setSuccess("Task created successfully!");
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Error creating task.");
    }
  };

  return (
    <div className="h-[93dvh] lg:h-[100dvh] flex justify-center items-center px-4 bg-white dark:bg-gray-900 dark:text-white transition-colors">
      <div className="w-full border dark:border-gray-700 max-w-2xl bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">➕ Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="title"
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <Textarea
            id="description"
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <Select
            id="priority"
            name="priority"
            label="Priority"
            value={formData.priority}
            onChange={handleChange}
            required
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
          />

          <Input
            id="dueDate"
            name="dueDate"
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />

          <Button type="submit">Create Task</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
