// src/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // or an object with default fields like { id: '', name: '', email: '' }
  tasks: [],
  loading: false,
  error: null,
  taskAdded: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    isTaskAdded(state) {
      state.taskAdded = !state.taskAdded;
    },
    updateTask(state, action) {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.tasks = [];
    },
  },
});

export const {
  setUser,
  setTasks,
  addTask,
  taskAdded,
  isTaskAdded,
  updateTask,
  deleteTask,
  setLoading,
  setError,
  setFilter,
  setSortBy,
  clearUser,
} = userSlice.actions;
export default userSlice.reducer;
