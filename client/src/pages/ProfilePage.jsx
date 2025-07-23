import React, { use, useEffect, useState } from "react";
import axios from "../hooks/axiosConfig";
import Input from "../components/Input";
import Button from "../components/Button";
import { UserData } from "../hooks/useUser";
import { toast } from "react-toastify";
import { verifyPassword } from "../services/authService";
const ProfilePage = () => {
  const { user, setUser } = UserData();
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    newpassword: "",
    oldpassword: "",
    image: user?.image || "",
  });

  // const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [oldPasswordVerified, setOldPasswordVerified] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user?.name && user?.email) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        image: user.avatarUrl || "",
        imageFile: null,
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
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
      }));
      // For preview only (optional)
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const verifyOldPassword = async () => {
    setSaving(true);

    try {
      const response = await verifyPassword(user._id, formData.oldpassword);
      if (response.data.success) {
        setOldPasswordVerified(true);
        toast.success("Old password verified successfully.");
      } else {
        setOldPasswordVerified(false);
        toast.error("Old password is incorrect.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to verify old password."
      );
      setSaving(fasle);
    }
  };
  const handleSubmit = async (e) => {
    // console.log(formData);
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required.");
      return;
    }
    if (formData.newpassword.trim() && !oldPasswordVerified) {
      toast.warning("Please verify the old password first.");
      return;
    }

    try {
      setSaving(true);
      const form = new FormData();
      if (formData.name !== user.name) form.append("name", formData.name);
      if (formData.email !== user.email) form.append("email", formData.email);
      if (formData.newpassword.trim())
        form.append("password", formData.newpassword);
      if (formData.imageFile) {
        form.append("image", formData.imageFile);
      }
      if (
        formData.name === user.name &&
        formData.email === user.email &&
        !formData.newpassword.trim() &&
        !formData.imageFile &&
        formData.image === user.image
      ) {
        setError("No changes detected.");
        return;
      }
      form.append("userId", user._id);

      // TODO: handle sending image if you implement upload

      const res = await axios.post("/api/auth/profile/update", form, {
        // headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(res.data.user);
      setFormData((prev) => ({ ...prev, password: "" }));
      setUser(res.data.user);
      toast.success("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="min-h-screen form-btn dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-white text-black sidebar-btn--active dark:bg-gray-900 rounded shadow-lg max-w-5xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
        {/* Left: Profile Image Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="xs:w-48 xs:h-48 w-[58vw] h-[58vw] rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
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
              name="image"
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
            <div className="flex max-sm:flex-col border-0 gap-0 justify-between sm:items-baseline-last">
              <Input
                name="oldpassword"
                type="password"
                label="Old Password (leave blank to keep current)"
                value={formData.oldpassword}
                onChange={handleChange}
                placeholder="••••••••"
                className=""
              />
              <Button
                type="button"
                disabled={saving}
                loading={saving}
                onClick={verifyOldPassword}
                className="basis-1/4 btn-outline"
              >
                verify
              </Button>
            </div>
            <Input
              name="newpassword"
              type="password"
              label="New Password (leave blank to keep current)"
              value={formData.newpassword}
              onChange={handleChange}
              placeholder="••••••••"
            />

            <Button
              type="submit"
              className="sidebar-btn-active"
              // className="form-btn"
              disabled={saving}
              loading={saving}
            >
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
