import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/drizzle.js';
import { patients } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const addPatient = async(req, res) => {
    const { name, age, gender, contact, user_id } = req.body;
    if(!name || !age || !user_id || !contact) {
        return res.status(400).json({ 
            status: "incomplete",
            message: 'Name, age, contact and user_id are required'
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

        res.status(201).json({
            status: "created",
            message: "Patient added successfully",
            patient: newPatient
        });

    } catch (error){
        res.status(500).json({
            status: "failed",
            message: `Something went wrong. Details here: ${error}`
        })
    }
}

const getPatients = async(req, res) => {
    try {
        const userRoles = req.user.roles;
        
        if(!userRoles.includes('admin')){
            return res.status(401).json({
                status: "forbidden",
                message: "Access denied"
            });
        }
        
        const allPatients = await db
            .select()
            .from(patients);

        return res.status(200).json({
            status: "success",
            patient: allPatients
        });

    } catch(error) {
        res.status(500).json({
            status: "failed",
            message: `Something went wrong. Details here: ${error}`
        })
    }
}

const getPatient = async(req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ 
            patientStatus: "incomplete",
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
                status: "invalid",
                message: "Patient not found"
            });
        }

        const userRoles = req.user.roles || [];
        const userId = req.user.id;

        if (!userRoles.includes("admin") && patient.user_id !== userId) {
            return res.status(403).json({
                status: "failed",
                message: "Access denied"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Patient found successfully",
            patient
        });
    } catch (error){
        res.status(500).json({
            patientStatus: "failed",
            message: `Something went wrong. Details here: ${error}`
        })
    }
}

const updatePatient = async(req, res) => {
    const { id, name, age, gender, contact } = req.body;
    if(!id) {
        return res.status(400).json({ 
            status: "incomplete",
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
                status: "invalid",
                message: "Patient not found"
            });
        }

        const userRoles = req.user.roles || [];
        const userId = req.user.id;

        if (!userRoles.includes("admin") && patient.user_id !== userId) {
            return res.status(403).json({
                status: "failed",
                message: "Access denied"
            });
        }

        const [updatedPatient] = await db
        .update(patients)
        .set(req.body)
        .where(eq(patients.id, id))
        .returning();

        res.status(200).json({
            status: "updated",
            message: "Patient updated successfully",
            patient: updatedPatient
        });
    } catch (error){
        res.status(500).json({
            status: "failed",
            message: `Something went wrong. Details here: ${error}`
        })
    }
}

const deletePatient = async(req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ 
            status: "incomplete",
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
                status: "invalid",
                message: "Patient not found"
            });
        }

        const userRoles = req.user.roles || [];
        const userId = req.user.id;

        if (!userRoles.includes("admin") && patient.user_id !== userId) {
            return res.status(403).json({
                status: "failed",
                message: "Access denied"
            });
        }

        await db
        .delete(patients)
        .where(eq(patients.id, id));

        res.status(200).json({
            status: "deleted",
            message: "Patient deleted successfully"
        });
    } catch (error){
        res.status(500).json({
            status: "failed",
            message: `Something went wrong. Details here: ${error}`
        })
    }
}

export { addPatient, getPatients, getPatient, updatePatient, deletePatient };