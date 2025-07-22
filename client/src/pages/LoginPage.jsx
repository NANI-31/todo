import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "../hooks/axiosConfig";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";
import { UserData } from "../hooks/useUser";

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
      const res = await axios.post("api/auth/login", {
        email,
        password,
      });
      console.log(res.data.user);
      setLoading(false);
      setUser(res.data.user);
      toast.success("Login successful!");
      setEmail("");
      setPassword("");
      navigate("/todo/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="dark:bg-gray-800 bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <motion.h2
          className="text-2xl font-semibold mb-6 text-center dark:text-white"
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
          <Input
            id="email"
            type="email"
            label="Email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Input
            id="password"
            type="password"
            label="Password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button type="submit" disabled={loading} loading={loading}>
            Log In
          </Button>
        </motion.div>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-800 dark:text-gray-400">
            Don't have an account?
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium ml-1"
            >
              Sign up here
            </Link>
          </p>
        </motion.div>
      </motion.form>
    </div>
  );
}
