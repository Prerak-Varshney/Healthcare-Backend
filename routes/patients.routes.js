import { Router } from "express";
import { addPatient, getPatients, getPatient, updatePatient, deletePatient } from "../controllers/patients.controller.js";

const router = Router();

router.post('/patients', addPatient);
router.get('/patients', getPatients);
router.get('/patients/:id', getPatient);
router.put('/patients/:id', updatePatient);
router.delete('/patients/:id', deletePatient);

export default router;