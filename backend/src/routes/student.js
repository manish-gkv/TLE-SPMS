import { Router } from "express";

import {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent
} from "../controllers/student.js";

const router = Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.get("/:id", getStudentById);
router.put("/", updateStudent);
router.delete("/", deleteStudent);

export default router;