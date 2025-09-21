import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addDoctor, getDoctor, updateDoctor, deleteDoctor } from "../controllers/doctors.controller.js";

const router = Router();

router.post('/', authMiddleware, addDoctor);
// router.get('/', authMiddleware, getDoctors);
router.get('/:id', authMiddleware, getDoctor);
router.put('/:id', authMiddleware, updateDoctor);
router.delete('/:id', authMiddleware, deleteDoctor);

export default router;