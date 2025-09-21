import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/drizzle.js';
import { doctors } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { isRoleAllowed } from '../utils/isRoleAllowed.js';

const addDoctor = async(req, res) => {
    const { name, specialization, contact, user_id } = req.body;
    if(!name || !specialization || !contact || !user_id) {
        return res.status(400).json({ 
            status: "missing",
            message: 'Name, specialization, contact and user_id are required'
        });
    }
    try {
        const [existingDoctor] = await db
            .select()
            .from(doctors)
            .where(eq(doctors.user_id, user_id));

        if(existingDoctor) {
            return res.status(409).json({
                status: "conflict",
                message: "Doctor with this user_id already exists"
            });
        }

        const [newDoctor] = await db
        .insert(doctors)
        .values({
            id: uuidv4(),
            name,
            specialization,
            contact,
            user_id
        })
        .returning();

        return res.status(201).json({
            status: "created",
            message: "Doctor added successfully",
            data: newDoctor
        });

    } catch (error){
        return res.status(500).json({
            status: "unknown",
            message: `Something went wrong. Details here: ${error}`
        })
    }
};

const getDoctors = async(req, res) => {
    try {        
        const allDoctors = await db
            .select()
            .from(doctors);

        return res.status(200).json({
            status: "success",
            data: allDoctors
        });

    } catch(error) {
        return res.status(500).json({
            status: "unknown",
            message: `Something went wrong. Details here: ${error}`
        })
    }
};

const getDoctor = async(req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ 
            status: "missing",
            message: 'Doctor ID is required'
        });
    }
    try {
        const [doctor] = await db
            .select()
            .from(doctors)
            .where(eq(doctors.id, id))
            .limit(1);

        if (!doctor) {
            return res.status(404).json({
                status: "not_found",
                message: "Doctor not found"
            });
        }

        if (!isRoleAllowed(req, res, doctor)) {
            return res.status(403).json({
                status: "forbidden",
                message: "Access denied"
            });
        }

        return res.status(200).json({
            status: "success",
            data: doctor
        });

    } catch (error) {
        return res.status(500).json({
            status: "unknown",
            message: `Something went wrong. Details here: ${error}`
        });
    }
};

const updateDoctor = async(req, res) => {
    const { id, name, specialization, contact } = req.body;
    if(!id) {
        return res.status(400).json({ 
            status: "missing",
            message: 'Doctor ID is required'
        });
    }
    try {
        const [doctor] = await db
        .select()
        .from(doctors)
        .where(eq(doctors.id, id));

        if(!doctor) {
            return res.status(404).json({
                status: "not_found",
                message: "Doctor not found"
            });
        }

        if (!isRoleAllowed(req, res, doctor)) {
            return res.status(403).json({
                status: "forbidden",
                message: "Access denied"
            });
        }

        const [updatedDoctor] = await db
            .update(doctors)
            .set({
                name: name || doctor.name,
                specialization: specialization || doctor.specialization,
                contact: contact || doctor.contact,
                updated_at: new Date()
            })
            .where(eq(doctors.id, id))
            .returning();

        if(!updatedDoctor) {
            return res.status(404).json({
                status: "failed",
                message: "Update failed"
            });
        }

        return res.status(200).json({
            status: "updated",
            message: "Doctor updated successfully",
            data: updatedDoctor
        });
    } catch (error){
        return res.status(500).json({
            status: "unknown",
            message: `Something went wrong. Details here: ${error}`
        })
    }
};

const deleteDoctor = async(req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ 
            status: "missing",
            message: 'Doctor ID is required'
        });
    }
    try {
        const [doctor] = await db
            .select()
            .from(doctors)
            .where(eq(doctors.id, id));

        if(!doctor) {
            return res.status(404).json({
                status: "not_found",
                message: "Doctor not found"
            });
        }

        if (!isRoleAllowed(req, res, doctor)) {
            return res.status(403).json({
                status: "forbidden",
                message: "Access denied"
            });
        }

        const [deleted] = await db
            .delete(doctors)
            .where(eq(doctors.id, id))
            .returning();

        if(!deleted) {
            return res.status(404).json({
                status: "failed",
                message: "Delete failed"
            });
        }

        return res.status(200).json({
            status: "deleted",
            message: "Doctor deleted successfully"
        });
    } catch (error){
        return res.status(500).json({
            status: "unknown",
            message: `Something went wrong. Details here: ${error}`
        })
    }
};

export { addDoctor, getDoctors, getDoctor, updateDoctor, deleteDoctor };