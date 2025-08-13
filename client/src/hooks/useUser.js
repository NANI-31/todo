// src/hooks/useUser.js
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  clearUser,
  isTaskAdded,
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setFilter,
  setSortBy,
} from "../redux/userSlice";

export const UserData = () => {
  const { user, tasks, filter, sortBy, taskAdded } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  return {
    user,
    tasks,
    filter,
    taskAdded,
    sortBy,
    setUser: (u) => dispatch(setUser(u)),
    clearUser: () => dispatch(clearUser()),
    isTaskAdded: (val) => dispatch(isTaskAdded(val)),
    setTasks: (data) => dispatch(setTasks(data)),
    addTask: (task) => dispatch(addTask(task)),
    updateTask: (task) => dispatch(updateTask(task)),
    deleteTask: (id) => dispatch(deleteTask(id)),
    setFilter: (val) => dispatch(setFilter(val)),
    setSortBy: (val) => dispatch(setSortBy(val)),
  };
};
