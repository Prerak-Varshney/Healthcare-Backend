import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addPatient, getPatient, updatePatient, deletePatient } from "../controllers/patients.controller.js";

const router = Router();

router.post('/', authMiddleware, addPatient);
// router.get('/', authMiddleware, getPatients);
router.get('/:id', authMiddleware, getPatient);
router.put('/:id', authMiddleware, updatePatient);
router.delete('/:id', authMiddleware, deletePatient);

export default router;