import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { register } from "../services/authService";

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "Chundu Siva Nageswara rao",
    email: "chundu.siva2k03@gmail.com",
    password: "a",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register(formData);
      setFormData({ name: "", email: "", password: "" });
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed!");
      setTimeout(() => {
        setFormData({ name: "", email: "", password: "" });
      }, 200);
    }
    setLoading(false);
  };

  return (
    <div className="h-[100dvh] flex items-center justify-center p-4">
      <motion.form
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="p-8 glass rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-[3rem] font-bold text-center mb-10 text-white">
          Sign Up
        </h2>

        <div className="mb-4 input-field">
          <input
            id="name"
            name="name"
            type="text"
            label="Name"
            required
            value={formData.name || ""}
            onChange={handleChange}
            disabled={loading}
          />
          <label
            htmlFor="name"
            className="block text-gray-700 dark:text-white mb-2 font-medium"
          >
            Name
          </label>
        </div>

        <div className="mb-4 input-field">
          <input
            id="email"
            name="email"
            type="email"
            label="Email"
            required
            value={formData.email || ""}
            onChange={handleChange}
            disabled={loading}
          />
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-white mb-2 font-medium"
          >
            Email
          </label>
        </div>

        <div className="mb-6 input-field">
          <input
            id="password"
            name="password"
            type="password"
            label="Password"
            required
            value={formData.password || ""}
            onChange={handleChange}
            disabled={loading}
          />
          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-white mb-2 font-medium"
          >
            Password
          </label>
        </div>

        <Button
          type="submit"
          disabled={loading}
          loading={loading}
          className="sidebar-btn-active2 px-8"
        >
          Signup
        </Button>
        <div className="mt-6 text-center">
          <p className="text-black">
            Already have an account?
            <Link to="/" className="underline text-white ml-1">
              Log in here
            </Link>
          </p>
        </div>
      </motion.form>
    </div>
  );
}
