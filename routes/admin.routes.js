import { Router } from "express";
import { setAdminRole } from "../controllers/auth.controller.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware.js";
import { getDoctors, getDoctor, updateDoctor, deleteDoctor } from "../controllers/doctors.controller.js";
import { getPatients, getPatient, updatePatient, deletePatient } from "../controllers/patients.controller.js";
import { getMappings, getMappingForPatient, deleteDoctorFromPatientMappings } from "../controllers/mappings.controller.js";

const router = Router();

// Authenticated route to set admin role
router.post('/auth/roles/:id', authMiddleware, setAdminRole);

// Admin routes for managing patients
router.get('/patients', authMiddleware, adminMiddleware, getPatients);
router.get('/patients/:id', authMiddleware, adminMiddleware, getPatient);
router.put('/patients/:id', authMiddleware, adminMiddleware, updatePatient);
router.delete('/patients/:id', authMiddleware, adminMiddleware, deletePatient);

// Admin routes for managing doctors
router.get('/doctors', authMiddleware, adminMiddleware, getDoctors);
router.get('/doctors/:id', authMiddleware, adminMiddleware, getDoctor);
router.put('/doctors/:id', authMiddleware, adminMiddleware, updateDoctor);
router.delete('/doctors/:id', authMiddleware, adminMiddleware, deleteDoctor);

// Admin routes for managing mappings
router.get('/mappings', authMiddleware, adminMiddleware, getMappings);
router.get('/mappings/:id', authMiddleware, adminMiddleware, getMappingForPatient);
router.delete('/mappings/:id', authMiddleware, adminMiddleware, deleteDoctorFromPatientMappings);

export default router;