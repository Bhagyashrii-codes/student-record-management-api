const express = require("express");

const {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

const router = express.Router();

// GET all students
router.get("/", getAllStudents);

// GET one student by ID
router.get("/:id", getStudentById);

// POST - Create student
router.post("/", createStudent);

// PUT - Update student
router.put("/:id", updateStudent);

// DELETE - Delete student
router.delete("/:id", deleteStudent);

module.exports = router;