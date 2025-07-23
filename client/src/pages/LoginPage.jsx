import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";
import { UserData } from "../hooks/useUser";
import { login } from "../services/authService";

export default function LoginPage() {
  const { setUser } = UserData();
  const navigate = useNavigate();
  const [email, setEmail] = useState("a@a.com");
  const [password, setPassword] = useState("a");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(email, password);
      console.log(res.data.user);
      setLoading(false);
      setUser(res.data.user);
      toast.success("Login successful!");
      setEmail("");
      setPassword("");
      navigate("/todo/dashboard");
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] flex items-center justify-center p-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <motion.h2
          className="text-[3rem] font-bold mb-10 text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Login
        </motion.h2>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="input-field">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              // className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            />
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-white mb-2 font-medium"
            >
              Email
            </label>
          </div>
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="input-field">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              // className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            />
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-white mb-2 font-medium"
            >
              Password
            </label>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            className="sidebar-btn-active2 px-8"
          >
            Log In
          </Button>
        </motion.div>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-black">
            Don't have an account?
            <Link
              to="/signup"
              className="text-white hover:underline font-medium ml-1"
            >
              Sign up here
            </Link>
          </p>
        </motion.div>
      </motion.form>
    </div>
  );
}
