import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      setFormData({ name: "", email: "", password: "" });
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed!");
      setTimeout(() => {
        setFormData({ email: "", password: "" });
      }, 200);
    }
    setLoading(false);
  };

  return (
    <div className="h-[100dvh] flex items-center justify-center bg-gray-100 p-4">
      <motion.form
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h2>

        <div className="mb-4">
          <Input
            id="name"
            name="name"
            type="text"
            label="Name"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            required
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <Button type="submit" disabled={loading} loading={loading}>
          Log In
        </Button>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?
            <Link
              to="/"
              className="text-blue-600 hover:underline font-medium ml-1"
            >
              Log in here
            </Link>
          </p>
        </div>
      </motion.form>
    </div>
  );
}
