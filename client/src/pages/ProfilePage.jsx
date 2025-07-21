import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";
import { UserData } from "../hooks/useUser";
const ProfilePage = () => {
  const { user } = UserData();
  console.log(user.name);
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    password: "",
    image: user?.image || "",
  });

  // const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user?.name && user?.email) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        image: user.image || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Optional: handle image file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For preview only (optional)
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);

      // TODO: Upload image to server on submit or immediately
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: formData.name,
        email: formData.email,
      };
      if (formData.password.trim()) {
        payload.password = formData.password;
      }

      // TODO: handle sending image if you implement upload

      await axios.put("/api/auth/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("Profile updated successfully.");
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 rounded shadow-lg max-w-5xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
        {/* Left: Profile Image Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {formData.image ? (
              <img
                src={formData.image}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-500 dark:text-gray-400">No Image</span>
            )}
          </div>

          <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Right: Profile Form */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Your Profile
          </h1>

          {error && (
            <p className="mb-4 text-red-600 dark:text-red-400 font-medium">
              {error}
            </p>
          )}
          {success && (
            <p className="mb-4 text-green-600 dark:text-green-400 font-medium">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              name="password"
              type="password"
              label="New Password (leave blank to keep current)"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />

            <Button type="submit" disabled={saving} loading={saving}>
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
