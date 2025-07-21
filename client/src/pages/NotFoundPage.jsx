import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1, { replace: true });
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] bg-gray-100 p-4">
      <motion.h1
        className="text-9xl font-extrabold text-blue-600"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 15,
          duration: 0.5,
        }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-xl text-gray-700 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Oops! Page not found.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 15,
          delay: 0.7,
        }}
      >
        <button
          onClick={handleGoBack}
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      </motion.div>
    </div>
  );
}
