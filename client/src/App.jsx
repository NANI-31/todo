import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/todo" element={<Layout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="dashboard/edit/:taskId" element={<EditTask />} />
            <Route path="create" element={<CreateTask />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          {/* <Route path="tasks/:taskId" element={<TaskDetailsPage />} /> */}
          <Route path="*" element={<NotFoundPage />} />
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
