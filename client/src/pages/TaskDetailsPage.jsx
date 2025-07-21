import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const priorities = ["low", "medium", "high"];

const TaskDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    tags: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch task details on mount
  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const t = res.data;
        setTask({
          title: t.title || "",
          description: t.description || "",
          priority: t.priority || "low",
          dueDate: t.dueDate ? t.dueDate.substring(0, 10) : "", // yyyy-mm-dd format
          tags: t.tags ? t.tags.join(", ") : "",
        });
      } catch (err) {
        setError("Failed to load task.");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!task.title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const payload = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate || null,
        tags: task.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      await axios.put(`/api/tasks/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save task.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">Loading task...</p>;
  if (error)
    return (
      <div className="p-6 text-red-600">
        <p>{error}</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 underline"
        >
          Back to Dashboard
        </button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Task</h1>

      <label className="block mb-4">
        <span className="font-semibold">Title *</span>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-3 py-2"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="font-semibold">Description</span>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-4">
        <span className="font-semibold">Priority</span>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-3 py-2"
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        <span className="font-semibold">Due Date</span>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-6">
        <span className="font-semibold">Tags (comma separated)</span>
        <input
          type="text"
          name="tags"
          value={task.tags}
          onChange={handleChange}
          placeholder="work, personal, urgent"
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </label>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          disabled={saving}
          className="px-6 py-2 rounded border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
