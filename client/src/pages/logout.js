import React, { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../hooks/useUser";
import { persistor } from "../redux/store";
import axios from "../hooks/axiosConfig";

export default function Logout() {
  const navigate = useNavigate();
  const { clearUser } = UserData();
  //   UserData.clearUser();
  useEffect(() => {
    const logout = async () => {
      await axios.post("api/auth/logout");
    };
    logout();
    clearUser();
    persistor.purge();
    navigate("/login");
  }, []);
}
