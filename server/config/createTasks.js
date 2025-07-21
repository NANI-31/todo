const Tasks = require("../models/TaskSchema");
const bcrypt = require("bcrypt");
async function createSampleTasks() {
  try {
    const sampleTasks = [
      {
        title: "Finish project report",
        description: "Complete the final sections and review formatting.",
        isCompleted: false,
        dueDate: new Date("2025-07-25"),
        priority: "High",
        category: "Work",
        tags: ["project", "report"],
        createdBy: "687e15f4214a6b51377d5b59",
        sharedWith: ["64f1234a12c34a0012f7a1a2"],
        recurrence: { frequency: "None", interval: 1 },
        reminder: { enabled: true, time: new Date("2025-07-24T09:00:00Z") },
        sortIndex: 1,
        deleted: false,
      },
      {
        title: "Grocery shopping",
        description: "Buy milk, eggs, and bread.",
        dueDate: new Date("2025-07-22"),
        priority: "Low",
        category: "Personal",
        tags: ["shopping", "groceries"],
        createdBy: "687e15f4214a6b51377d5b59",
        recurrence: { frequency: "Weekly", interval: 1 },
        reminder: { enabled: false },
        sortIndex: 2,
      },
      {
        title: "Team meeting",
        description: "Discuss Q3 OKRs with team.",
        dueDate: new Date("2025-07-23T14:00:00Z"),
        priority: "Medium",
        category: "Work",
        tags: ["meeting"],
        createdBy: "687e15f4214a6b51377d5b59",
        sharedWith: ["64f1234a12c34a0012f7a1a1", "64f1234a12c34a0012f7a1a5"],
        recurrence: { frequency: "Monthly", interval: 1 },
        reminder: { enabled: true, time: new Date("2025-07-23T13:00:00Z") },
        sortIndex: 3,
      },
      {
        title: "Doctor appointment",
        description: "Routine check-up at clinic.",
        dueDate: new Date("2025-07-28T10:00:00Z"),
        priority: "Medium",
        category: "Personal",
        tags: ["health"],
        createdBy: "687e15f4214a6b51377d5b59",
        recurrence: { frequency: "None", interval: 1 },
        reminder: { enabled: true, time: new Date("2025-07-28T09:00:00Z") },
        sortIndex: 4,
      },
      {
        title: "Read 20 pages of a book",
        description: "Continue reading 'Deep Work' by Cal Newport.",
        dueDate: new Date("2025-07-21"),
        priority: "Low",
        category: "Personal Development",
        tags: ["reading", "habits"],
        createdBy: "687e15f4214a6b51377d5b59",
        recurrence: { frequency: "Daily", interval: 1 },
        reminder: { enabled: false },
        sortIndex: 5,
      },
    ];
    await Tasks.insertMany(sampleTasks);
    console.log("Sample Tasks added successfully!");
  } catch (error) {
    console.error("Error adding sample Users:", error);
  }
}
module.exports = createSampleTasks;
