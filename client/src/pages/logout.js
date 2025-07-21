import React from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../hooks/useUser";
import { persistor } from "../redux/store";

export default function logout() {
  const navigate = useNavigate();
  //   UserData.clearUser();
  const { clearUser } = UserData();
  clearUser();
  persistor.purge();
  navigate("/login");
  return <div>logout</div>;
}
