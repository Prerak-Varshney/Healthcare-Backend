import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/drizzle.js';
import { patients } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { isRoleAllowed } from '../utils/isRoleAllowed.js';

const addPatient = async(req, res) => {
    const { name, age, gender, contact, user_id } = req.body;
    if(!name || !age || !user_id || !contact || !gender) {
        return res.status(400).json({ 
            status: "missing",
            message: 'Name, age, gender, contact and user_id are required'
        });
    }
    try {
        const [newPatient] = await db
        .insert(patients)
        .values({
            id: uuidv4(),
            name,
            age,
            gender,
            contact,
            user_id
        })
        .returning();

        return res.status(201).json({
            status: "created",
            message: "Patient added successfully",
            data: newPatient
        });

    } catch (error){
        return res.status(500).json({
            status: "unknown",
            message: `Something went wrong. Details here: ${error}`
        })
    }
}

const getPatients = async(req, res) => {
    try {
        const allPatients = await db
            .select()
            .from(patients);

        return res.status(200).json({
            status: "success",
            data: allPatients
        });

    } catch(error) {
        return res.status(500).json({
            status: "unknown",
            message: `Something went wrong. Details here: ${error}`
        })
    }
}

const getPatient = async(req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ 
            patientStatus: "missing",
            message: 'Patient ID is required'
        });
    }

    try {
        const [patient] = await db
        .select()
        .from(patients)
        .where(eq(patients.id, id));

        if(!patient) {
            return res.status(404).json({
                status: "not_found",
                message: "Patient not found"
            });
        }

        if (!isRoleAllowed(req, patient)) {
            return res.status(403).json({
                status: "forbidden",
                message: "Access denied"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Patient found successfully",
            data: patient
        });
    } catch (error){
        return res.status(500).json({
            patientStatus: "unknown",
            message: `Something went wrong. Details here: ${error}`
        })
    }
}

const updatePatient = async(req, res) => {
    const { id, name, age, gender, contact } = req.body;
    if(!id) {
        return res.status(400).json({ 
            status: "missing",
            message: 'Patient ID is required'
        });
    }
    try {
        const [patient] = await db
        .select()
        .from(patients)
        .where(eq(patients.id, id));

        if(!patient) {
            return res.status(404).json({
                status: "not_found",
                message: "Patient not found"
            });
        }

        if (!isRoleAllowed(req, res, patient)) {
            return res.status(403).json({
                status: "forbidden",
                message: "Access denied"
            });
        }

        const [updatedPatient] = await db
        .update(patients)
        .set(req.body)
        .where(eq(patients.id, id))
        .returning();

        if(!updatedPatient) {
            return res.status(404).json({
                status: "failed",
                message: "Update failed"
            });
        }

        return res.status(200).json({
            status: "updated",
            message: "Patient updated successfully",
            data: updatedPatient
        });
    } catch (error){
        return res.status(500).json({
            status: "unknown",
            message: `Something went wrong. Details here: ${error}`
        })
    }
}

const deletePatient = async(req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ 
            status: "missing",
            message: 'Patient ID is required'
        });
    }
    try {
        const [patient] = await db
        .select()
        .from(patients)
        .where(eq(patients.id, id));

        if(!patient) {
            return res.status(404).json({
                status: "not_found",
                message: "Patient not found"
            });
        }

        if (!isRoleAllowed(req, res, patient)) {
            return res.status(403).json({
                status: "forbidden",
                message: "Access denied"
            });
        }

        const [deleted] = await db
            .delete(patients)
            .where(eq(patients.id, id))
            .returning();

        if(!deleted) {
            return res.status(404).json({
                status: "failed",
                message: "Delete failed"
            });
        }

        return res.status(200).json({
            status: "deleted",
            message: "Patient deleted successfully"
        });
    } catch (error){
        return res.status(500).json({
            status: "unknown",
            message: `Something went wrong. Details here: ${error}`
        })
    }
}

export { addPatient, getPatients, getPatient, updatePatient, deletePatient };