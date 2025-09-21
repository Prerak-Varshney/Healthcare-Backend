import { Router } from "express";
import { setAdminRole } from "../controllers/auth.controller.js";
import { getDoctors, getDoctor, updateDoctor, deleteDoctor } from "../controllers/doctors.controller.js";
import { getPatients, getPatient, updatePatient, deletePatient } from "../controllers/patients.controller.js";
import { getMappings, getMappingForPatient, deleteDoctorFromPatientMappings } from "../controllers/mappings.controller.js";

const router = Router();

// Authenticated route to set admin role
router.post('/auth/roles/:id', setAdminRole);

// Admin routes for managing patients
router.get('/patients', getPatients);
router.get('/patients/:id', getPatient);
router.put('/patients/:id', updatePatient);
router.delete('/patients/:id', deletePatient);

// Admin routes for managing doctors
router.get('/doctors', getDoctors);
router.get('/doctors/:id', getDoctor);
router.put('/doctors/:id', updateDoctor);
router.delete('/doctors/:id', deleteDoctor);

// Admin routes for managing mappings
router.get('/mappings', getMappings);
router.get('/mappings/:id', getMappingForPatient);
router.delete('/mappings/:id', deleteDoctorFromPatientMappings);

export default router;