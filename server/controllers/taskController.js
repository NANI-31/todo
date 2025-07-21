const User = require("../models/UserSchema");
const Task = require("../models/TaskSchema");
const mongoose = require("mongoose");
exports.fetchTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    // Make sure the userId is valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }
    const tasks = await Task.find({ createdBy: userId }).populate(
      "createdBy",
      "name email"
    );
    // const tasks = await Task.find({
    //   $or: [
    //     { createdBy: userId }, // Tasks created by the user
    //     { sharedWith: userId }, // Tasks shared with the user
    //   ],
    // })
    //   .populate("createdBy", "name email") // Optionally populate the creator data
    //   .populate("sharedWith", "name email"); // Optionally populate the shared with user data
    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }
    return res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res
      .status(200)
      .json({ message: "Task deleted successfully", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;
    console.log("update", updates);
    console.log("taskid:", taskId);
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    Object.keys(updates).forEach((key) => {
      // console.log(task[key]);
      // console.log(updates[key]);
      if (updates[key] !== undefined) {
        task[key] = updates[key];
      }
    });
    await task.save();
    // console.log(task);
    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, userId } = req.body;
    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      createdBy: userId,
    });
    await task.save();
    return res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.shareTask = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { userId } = req.body;
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     task.sharedWith.push(userId);
//     await task.save();
//     return res.status(200).json({ message: "Task shared successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.unshareTask = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { userId } = req.body;
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     task.sharedWith.pull(userId);
//     await task.save();
//     return res.status(200).json({ message: "Task unshared successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.getSharedTasks = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const tasks = await Task.find({ sharedWith: userId }).populate(
//       "createdBy",
//       "name email"
//     );
//     if (!tasks.length) {
//       return res.status(404).json({ message: "No tasks found for this user" });
//     }
//     return res.status(200).json(tasks);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.getTaskById = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const task = await Task.findById(taskId).populate(
//       "createdBy",
//       "name email"
//     );
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     return res.status(200).json(task);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.updateTaskStatus = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { status } = req.body;
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     task.status = status;
//     await task.save();
//     return res.status(200).json({ message: "Task status updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.updateTaskPriority = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { priority } = req.body;
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     task.priority = priority;
//     await task.save();
//     return res.status(200).json({ message: "Task priority updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.updateTaskDueDate = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { dueDate } = req.body;
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     task.dueDate = dueDate;
//     await task.save();
//     return res.status(200).json({ message: "Task due date updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.updateTaskDescription = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { description } = req.body;
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     task.description = description;
//     await task.save();
//     return res.status(200).json({ message: "Task description updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.updateTaskTitle = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { title } = req.body;
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     task.title = title;
//     await task.save();
//     return res.status(200).json({ message: "Task title updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.deleteTask = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     await task.remove();
//     return res.status(200).json({ message: "Task deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.createTask = async (req, res) => {
//   try {
//     const { title, description, dueDate, priority, status } = req.body;
//     const task = new Task({
//       title,
//       description,
//       dueDate,
//       priority,
//       status,
//       createdBy: req.user._id,
//     });
//     await task.save();
//     return res.status(201).json({ message: "Task created successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.getTask = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     return res.status(200).json(task);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({ createdBy: req.user._id });
//     return res.status(200).json(tasks);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.updateTaskStatus = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { status } = req.body;
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     task.status = status;
//     await task.save();
//     return res.status(200).json({ message: "Task status updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.updateTaskPriority = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { priority } = req.body;
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     task.priority = priority;
//     await task.save();
//     return res.status(200).json({ message: "Task priority updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
