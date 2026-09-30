# Student Record Management API

A RESTful API for managing student records using Node.js, Express.js, and MySQL.

## Features

- Create a new student
- View all students
- View a student by ID
- Update student information
- Delete student
- Email validation
- Duplicate email handling
- MySQL database integration
- Environment variable configuration
- Helmet security middleware
- CORS support

## Technologies Used

- Node.js
- Express.js
- MySQL
- MySQL2
- REST API
- Postman
- Git & GitHub
- Helmet
- CORS
- dotenv

## Project Structure

```text
Student Record API
│
├── config/
│   └── db.js
│
├── controllers/
│   └── studentController.js
│
├── routes/
│   └── studentRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get one student |
| POST | `/students` | Create a student |
| PUT | `/students/:id` | Update student |
| DELETE | `/students/:id` | Delete student |

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Bhagyashrii-codes/student-record-management-api.git