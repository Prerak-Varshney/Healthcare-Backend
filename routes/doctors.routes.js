import { Router } from "express";
import { addDoctor, getDoctors, getDoctor, updateDoctor, deleteDoctor } from "../controllers/doctors.controller.js";

const router = Router();

router.post('/doctors', addDoctor);
router.get('/doctors', getDoctors);
router.get('/doctors/:id', getDoctor);
router.put('/doctors/:id', updateDoctor);
router.delete('/doctors/:id', deleteDoctor);

export default router;