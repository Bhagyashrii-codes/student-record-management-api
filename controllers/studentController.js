const db = require("../config/db");

// GET all students
const getAllStudents = (req, res) => {
    db.query("SELECT * FROM students")
        .then(([rows]) => {
            res.json(rows);
        })
        .catch((error) => {
            console.error("Error fetching students:", error);

            res.status(500).json({
                message: "Failed to fetch students"
            });
        });
};

// GET one student by ID
const getStudentById = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM students WHERE id = ?", [id])
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).json({
                    message: "Student not found"
                });
            }

            res.json(rows[0]);
        })
        .catch((error) => {
            console.error("Error fetching student:", error);

            res.status(500).json({
                message: "Failed to fetch student"
            });
        });
};

// CREATE a new student
const createStudent = (req, res) => {
    const { name, email, gender, dob } = req.body;

    // Check required fields
    if (!name || !email || !gender || !dob) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({
            message: "Please enter a valid email address"
        });
    }

    const sql = `
        INSERT INTO students (name, email, gender, dob)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, email, gender, dob])
        .then(([result]) => {
            res.status(201).json({
                message: "Student created successfully",
                studentId: result.insertId
            });
        })
        .catch((error) => {
            console.error("Error creating student:", error);

            if (error.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }

            res.status(500).json({
                message: "Failed to create student"
            });
        });
};

// UPDATE a student
const updateStudent = (req, res) => {
    const { id } = req.params;
    const { name, email, gender, dob } = req.body;

    // Check required fields
    if (!name || !email || !gender || !dob) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({
            message: "Please enter a valid email address"
        });
    }

    const sql = `
        UPDATE students
        SET name = ?, email = ?, gender = ?, dob = ?
        WHERE id = ?
    `;

    db.query(sql, [name, email, gender, dob, id])
        .then(([result]) => {
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Student not found"
                });
            }

            res.json({
                message: "Student updated successfully"
            });
        })
        .catch((error) => {
            console.error("Error updating student:", error);

            if (error.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }

            res.status(500).json({
                message: "Failed to update student"
            });
        });
};

// DELETE a student
const deleteStudent = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM students WHERE id = ?";

    db.query(sql, [id])
        .then(([result]) => {
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Student not found"
                });
            }

            res.json({
                message: "Student deleted successfully"
            });
        })
        .catch((error) => {
            console.error("Error deleting student:", error);

            res.status(500).json({
                message: "Failed to delete student"
            });
        });
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};