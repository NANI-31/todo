// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../hooks/axiosConfig";
import { api } from "../hooks/axiosConfig";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import sampleTasks from "../utils/sampleTasks";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import Select from "../components/Select";
import { UserData } from "../hooks/useUser";
import { MdDelete, MdModeEdit } from "react-icons/md";
import AnimatedCheckbox from "../components/AnimatedCheckbox";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { setTasks, user, updateTask, taskAdded, isTaskAdded } = UserData();
  const tasks = useSelector((state) => state.user.tasks);
  // console.log("Tasks from Redux:", tasks);
  // const task = useSelector((state) => state.user.tasks);
  const [filterType, setFilterType] = useState("status");
  const userId = user._id;
  const [filter, setFilter] = useState("all"); // all, completed, incomplete
  const [sortBy, setSortBy] = useState("dueDate"); // dueDate, priority
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setIsModalOpen(true);
  };
  // tasks to with filters and sorting
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/api/tasks/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      setTasks(response.data);
      isTaskAdded();
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tasks.length === 0 || taskAdded) {
      fetchTasks();
    }
  }, []);
  const filterTasks = () => {
    console.log("task length", tasks.length);
    if (!Array.isArray(tasks)) {
      console.error("Tasks is not an array:", tasks);
      return [];
    }
    let filteredTasks = [...tasks];

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
    // Filter by search query in title or description
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }

    // console.log("Filtered Tasks before sorting:", filteredTasks);
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
      // fetchTasks();
    } catch (err) {
      alert("Error updating task status");
    }
  };

  // Delete task
  const handleConfirmDelete = async () => {
    try {
      setIsModalOpen(false);
      setTaskToDelete(null);
      const token = localStorage.getItem("token");
      await api.delete(
        `/api/tasks/${taskToDelete}`
        // , {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        // }
      );
      fetchTasks();
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task. Please try again.");
      // alert("Error deleting task");
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToDelete(null);
  };
  return (
    <div className="px-4 py-8 mx-auto bg-white max-w-screen sm:px-6 lg:px-8 bg ">
      <div className="flex justify-between gap-5 border-0 max-md:flex-col md:items-center cs">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-blue-700">
            Tick Lists
          </span>
        </h1>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-4 px-2 py-2 my-4 bg-blue-800 rounded max-xs:flex-col sm:justify-between sm:px-10 sm:items-center sm:py-4">
        {/* Filter By Dropdown */}
        <div className="flex w-full gap-4 max-sm:flex-col sm:items-baseline-last">
          <Select
            id="filterType"
            label="Filter By"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={[
              { value: "status", label: "Status" },
              { value: "priority", label: "Priority" },
            ]}
            className="border border-gray-300 rounded px-4 pl-1 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:!bg-gray-200 dark:!text-black dark:border-gray-600 "
            labelClassName="text-sm !mb-0 font-medium text-gray-700 whitespace-nowrap dark:text-gray-300 text-white"
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
              className="border border-gray-300 rounded px-4 pl-1 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:!bg-gray-200 dark:!text-black dark:border-gray-600"
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
              className="border border-gray-300 rounded px-8 pl-1 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:!bg-gray-200 dark:!text-black dark:border-gray-600"
            />
          )}
        </div>
        <div className="justify-end w-full sm:flex">
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
            className="border !w-full border-gray-300 rounded px-5 pl-1 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:!bg-gray-200 dark:!text-black dark:border-gray-600 "
            labelClassName="text-sm !mb-0 font-medium text-gray-700 whitespace-nowrap dark:text-gray-300 text-white"
            containerClassName="flex max-sm:flex-col sm:items-center gap-2"
          />
        </div>
      </div>

      {/* Task List */}
      {loading && (
        <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
      )}
      {error && <p className="font-medium text-red-600">{error}</p>}
      {!loading && (tasks?.length === 0 || tasks.length === undefined) && (
        <p className="text-gray-600 dark:text-gray-400">No tasks found.</p>
      )}

      <ul className="space-y-6">
        {filterTasks()?.map((task) => (
          <li
            key={task._id}
            className="p-6 transition bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
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
                <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
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
              <div className="flex items-center gap-2 max-xs:flex-co">
                <Button
                  onClick={() => toggleComplete(task._id, task.isCompleted)}
                  className={`px-4 md:block hidden sm:w-40 rounded font-medium transition ${
                    task.isCompleted
                      ? "!bg-yellow-400 text-black !hover:bg-yellow-500"
                      : "!bg-green-600 !hover:bg-green-700 !text-white"
                  }`}
                >
                  {task.isCompleted ? "Mark Incomplete" : "Mark Complete"}
                </Button>
                <div className="hidden max-md:block">
                  <AnimatedCheckbox
                    taskId={task._id}
                    atask={task.isCompleted}
                    onClick={() => toggleComplete(task._id, task.isCompleted)}
                    className={` ${
                      task.isCompleted
                        ? "bg-yellow-400 text-black hover:bg-yellow-500"
                        : "bg-green-600 hover:bg-green-700 !text-white"
                    }`}
                  />
                </div>
                <div className="flex flex-row gap-2">
                  <Button
                    onClick={() => navigate(`/todo/dashboard/edit/${task._id}`)}
                    className="!bg-sky-600 !flex-1 !p-2 !hover:bg-red-700"
                  >
                    <MdModeEdit style={{ fontSize: "1.2rem" }} />
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(task._id)}
                    className="!bg-red-600 !p-2 !flex-1 hover:bg-red-700"
                  >
                    <MdDelete style={{ fontSize: "1.2rem" }} />
                  </Button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default DashboardPage;
