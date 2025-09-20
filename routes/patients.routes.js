import { Router } from "express";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware.js";
import { addPatient, getPatients, getPatient, updatePatient, deletePatient } from "../controllers/patients.controller.js";

const router = Router();

router.post('/patients', authMiddleware, addPatient);
router.get('/patients/:id', authMiddleware, getPatient);
router.put('/patients/:id', authMiddleware, updatePatient);
router.delete('/patients/:id', authMiddleware, deletePatient);
    
router.get('/admin/patients', authMiddleware, adminMiddleware, getPatients);
router.get('/admin/patients/:id', authMiddleware, adminMiddleware, getPatient);
router.put('/admin/patients/:id', authMiddleware, adminMiddleware, updatePatient);
router.delete('/admin/patients/:id', authMiddleware, adminMiddleware, deletePatient);

export default router;