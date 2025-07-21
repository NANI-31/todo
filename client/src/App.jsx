import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        transition={Slide}
        autoClose={2500}
      />
    </>
    // <div className="h-screen bg-[011c40]">
    //   <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-20 p-20">
    //     {Array.from({ length: 10 }, (_, index) => (
    //       <div
    //         key={index}
    //         className="card border-2 rounded-xl text-center px-20 py-20"
    //       >
    //         hai hello
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}
