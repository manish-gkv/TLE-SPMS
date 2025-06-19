import { Router } from "express";

import {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent
} from "../controllers/student.js";

import { 
  getContestHistory, 
  syncData , 
  updateHandle,
  getSubmissions
} from "../controllers/profile.js";

const router = Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.get("/:id", getStudentById);
router.put("/", updateStudent);
router.delete("/", deleteStudent);

router.get("/:id/contest-history", getContestHistory);
router.put("/:id/update-handle", updateHandle);
router.post("/:id/sync-data", syncData);
router.get("/:id/submissions", getSubmissions);

export default router;