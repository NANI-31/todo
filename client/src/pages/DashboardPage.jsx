// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../hooks/axiosConfig";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import sampleTasks from "../utils/sampleTasks";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/Button";
import Select from "../components/Select";
import { UserData } from "../hooks/useUser";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { setTasks, tasks, user, updateTask } = UserData();
  const [filterType, setFilterType] = useState("status");
  const userId = user._id;
  const [userTasks, setUserTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // all, completed, incomplete
  const [sortBy, setSortBy] = useState("dueDate"); // dueDate, priority
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // tasks to with filters and sorting
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      // Make the API request to fetch tasks by userId
      const response = await axios.get(`/api/tasks/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      setUserTasks(response.data);
      setTasks(response.data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  const filterTasks = () => {
    let filteredTasks = [...userTasks];

    // Filter by status (completed/incomplete)
    if (filter === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.isCompleted);
    } else if (filter === "incomplete") {
      filteredTasks = filteredTasks.filter((task) => !task.isCompleted);
    }

    // Filter by priority (low, medium, high)
    if (priorityFilter !== "all") {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority.toLowerCase() === priorityFilter
      );
    }

    // Sort tasks
    // Sorting Logic
    if (sortBy === "dueDate") {
      filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === "priority") {
      const priorityOrder = ["high", "medium", "low"]; // High comes first
      filteredTasks.sort((a, b) => {
        const priorityA = a.priority ? a.priority.toLowerCase() : "low"; // Default to "low" if no priority
        const priorityB = b.priority ? b.priority.toLowerCase() : "low"; // Default to "low" if no priority
        return (
          priorityOrder.indexOf(priorityA) - priorityOrder.indexOf(priorityB)
        ); // Sort by priority
      });
    }

    console.log("Filtered Tasks before sorting:", filteredTasks);
    return filteredTasks;
  };
  // Toggle task completion
  const toggleComplete = async (taskId, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `/api/tasks/update/${taskId}`,
        { isCompleted: !currentStatus }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      // Refresh tasks after update
      updateTask(res.data.task);
      // setUserTasks(tasks);
      setUserTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, isCompleted: !task.isCompleted };
          }
          return task;
        })
      );
      // fetchTasks();
    } catch (err) {
      alert("Error updating task status");
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `/api/tasks/${taskId}`
        // , {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        // }
      );
      fetchTasks();
    } catch (err) {
      alert("Error deleting task");
    }
  };

  return (
    <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-800">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 dark:text-white">
        Dashboard
      </h1>

      {/* Filters */}
      <div className="flex max-xs:flex-col xs:justify-between items-center gap-4 mb-8">
        {/* Filter By Dropdown */}
        <div className="flex gap-4 w-full max-xs:flex-col xs:items-baseline-last">
          <Select
            id="filterType"
            label="Filter By"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={[
              { value: "status", label: "Status" },
              { value: "priority", label: "Priority" },
            ]}
            className="border border-gray-300 rounded px-4 pl-1 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            labelClassName="text-sm !mb-0 font-medium text-gray-700 whitespace-nowrap dark:text-gray-300"
            containerClassName="flex max-sm:flex-col sm:items-center gap-2"
          />

          {/* Filter Options Dropdown */}
          {filterType === "status" ? (
            <Select
              id="filterStatus"
              value={filter}
              label=""
              onChange={(e) => setFilter(e.target.value)}
              options={[
                { value: "all", label: "All" },
                { value: "completed", label: "Completed" },
                { value: "incomplete", label: "Incomplete" },
              ]}
              labelClassName="text-sm !mb-0 font-medium text-gray-700 whitespace-nowrap dark:text-gray-300"
              containerClassName="flex max-sm:flex-col sm:items-center gap-2"
              className="border border-gray-300 rounded px-4 pl-1 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          ) : (
            <Select
              id="filterPriority"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              options={[
                { value: "all", label: "All" },
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
              className="border border-gray-300 rounded px-8 pl-1 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          )}
        </div>
        <div className="xs:flex w-full justify-end">
          {/* Sorting Dropdown */}
          <Select
            id="sortBy"
            label="Sort By"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: "dueDate", label: "Due Date" },
              { value: "priority", label: "Priority" },
            ]}
            className="border !w-full border-gray-300 rounded px-5 pl-1 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            labelClassName="text-sm !mb-0 font-medium text-gray-700 whitespace-nowrap dark:text-gray-300"
            containerClassName="flex max-sm:flex-col sm:items-center gap-2"
          />
        </div>
      </div>

      {/* Task List */}
      {loading && (
        <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
      )}
      {error && <p className="text-red-600 font-medium">{error}</p>}
      {!loading && userTasks.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400">No tasks found.</p>
      )}

      <ul className="space-y-6">
        {filterTasks().map((task) => (
          <li
            key={task._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 transition hover:shadow-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {/* Task Info */}
              <div className="flex-1">
                <h3
                  className={`text-xl font-semibold mb-1 ${
                    task.isCompleted
                      ? "line-through text-gray-400 dark:text-gray-500"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1 dark:text-gray-400">
                  {task.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Due:</span>{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-xs">
                  <span className="font-medium">Priority:</span>{" "}
                  <span
                    className={`font-semibold ${
                      task.priority === "High"
                        ? "text-red-600"
                        : task.priority === "Medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {task.priority || "None"}
                  </span>
                </p>
              </div>

              {/* Actions */}
              <div className="flex max-sm:flex-col flex-wrap gap-2 sm:items-center">
                <Button
                  onClick={() => toggleComplete(task._id, task.isCompleted)}
                  className={`px-4 sm:w-40 rounded font-medium transition ${
                    task.isCompleted
                      ? "!bg-yellow-400 text-black !hover:bg-yellow-500"
                      : "!bg-green-600 !hover:bg-green-700 !text-white"
                  }`}
                >
                  {task.isCompleted ? "Mark Incomplete" : "Mark Complete"}
                </Button>
                <div className="flex flex-col xs:flex-row gap-2">
                  <Button
                    onClick={() => navigate(`/todo/dashboard/edit/${task._id}`)}
                    className="!bg-sky-600 !flex-1 !hover:bg-red-700"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteTask(task._id)}
                    className="!bg-red-600 !flex-1 !hover:bg-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
