import { Router } from "express";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware.js";
import { addDoctor, getDoctors, getDoctor, updateDoctor, deleteDoctor } from "../controllers/doctors.controller.js";

const router = Router();

router.post('/doctors', authMiddleware, addDoctor);
// router.get('/doctors', authMiddleware, getDoctors);
router.get('/doctors/:id', authMiddleware, getDoctor);
router.put('/doctors/:id', authMiddleware, updateDoctor);
router.delete('/doctors/:id', authMiddleware, deleteDoctor);

//Admin
router.get('/admin/doctors', authMiddleware, adminMiddleware, getDoctors);
router.get('/admin/doctors/:id', authMiddleware, adminMiddleware, getDoctor);
router.put('/admin/doctors/:id', authMiddleware, adminMiddleware, updateDoctor);
router.delete('/admin/doctors/:id', authMiddleware, adminMiddleware, deleteDoctor);



export default router;