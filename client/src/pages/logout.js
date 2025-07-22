import React, { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../hooks/useUser";
import { persistor } from "../redux/store";

export default function Logout() {
  const navigate = useNavigate();
  const { clearUser } = UserData();
  //   UserData.clearUser();
  useEffect(() => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("theme");
    clearUser();
    persistor.purge();
    navigate("/login");
  }, []);
}
