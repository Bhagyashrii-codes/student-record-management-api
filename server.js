const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const db = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
// Home route
app.get("/", (req, res) => {
    res.send("SERVER IS WORKING!");
});

// Student routes
app.use("/students", studentRoutes);

// Test database connection
db.query("SELECT 1")
    .then(() => {
        console.log("MySQL database connected successfully!");
    })
    .catch((error) => {
        console.error("MySQL connection failed:", error.message);
    });

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});