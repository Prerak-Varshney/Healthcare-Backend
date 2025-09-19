import { Router } from "express";
import { assignDoctorToPatient, getMappings, getMappingForPatient, deleteDoctorFromPatientMappings } from "../controllers/mappings.controller.js";

const router = Router();

router.post('/mappings', assignDoctorToPatient);
router.get('/mappings', getMappings);
router.get('/mappings/:id', getMappingForPatient);
router.delete('/mappings/:id', deleteDoctorFromPatientMappings);

export default router;