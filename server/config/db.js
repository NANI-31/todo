const mongoose = require("mongoose");
require("dotenv").config();
const createSampleUsers = require("./createUsers");
const createSampleTasks = require("./createTasks");

const DB = process.env.MONGO_DB_URL;

const connectDB = async () => {
  try {
    mongoose.connect(DB);
    console.log("DATABASE connected");
    // const adminExists = await admin.findOne({ email: adminData.email });
    // if (!adminExists) {
    // } else {
    //   console.log("Admin already exists, skipping save.");
    // }
    // await createSampleUsers();
    // await createSampleTasks();
  } catch (err) {
    console.log("error : " + err.message);
  }
};

connectDB();
module.exports = connectDB;
