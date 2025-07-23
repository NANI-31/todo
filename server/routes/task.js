const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const verifyToken = require("../middleware/verifyToken");
// const authMiddleware = require("../middleware/authMiddleware");
router.get("/:userId", taskController.fetchTasks);
router.post("/create", taskController.createTask);
router.put("/update/:taskId", taskController.updateTask);
router.delete("/:taskId", taskController.deleteTask);

module.exports = router;
