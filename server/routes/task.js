const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const verifyToken = require("../middleware/verifyToken");
// const authMiddleware = require("../middleware/authMiddleware");
router.get("/:userId", verifyToken, taskController.fetchTasks);
router.post("/create", verifyToken, taskController.createTask);
router.put("/update/:taskId", verifyToken, taskController.updateTask);
router.delete("/:taskId", verifyToken, taskController.deleteTask);

module.exports = router;
