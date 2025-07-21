const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
// const authMiddleware = require("../middleware/authMiddleware");
router.post("/create", taskController.createTask);
router.get("/:userId", taskController.fetchTasks);
router.delete("/:taskId", taskController.deleteTask);
router.put("/update/:taskId", taskController.updateTask);

module.exports = router;
