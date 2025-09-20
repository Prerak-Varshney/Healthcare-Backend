import { Router } from "express";
import { assignDoctorToPatient, getMappings, getMappingForPatient, deleteDoctorFromPatientMappings } from "../controllers/mappings.controller.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/mappings', authMiddleware, assignDoctorToPatient);
router.get('/mappings/:id', authMiddleware, getMappingForPatient);
router.delete('/mappings/:id', authMiddleware, deleteDoctorFromPatientMappings);

//Admin
router.get('/admin/mappings', authMiddleware, adminMiddleware, getMappings);
router.get('/admin/mappings/:id', authMiddleware, adminMiddleware, getMappingForPatient);
router.delete('/admin/mappings/:id', authMiddleware, adminMiddleware, deleteDoctorFromPatientMappings);

export default router;