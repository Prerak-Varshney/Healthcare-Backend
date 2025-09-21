import { Router } from "express";
import { assignDoctorToPatient, getMappingForPatient, deleteDoctorFromPatientMappings } from "../controllers/mappings.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/', authMiddleware, assignDoctorToPatient);
router.get('/:id', authMiddleware, getMappingForPatient);
router.delete('/:id', authMiddleware, deleteDoctorFromPatientMappings);

export default router;