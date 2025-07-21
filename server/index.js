const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
require("dotenv").config();
require("./config/db");

app.use(cookieParser());
const allowedOrigins = ["http://localhost:5173", "http://192.168.29.27:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/task"));

app.listen(5000, () => {
  console.log("server listening on port 5000!");
});
