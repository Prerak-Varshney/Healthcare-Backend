import { db } from "../db/drizzle.js";
import { patientDoctorMappings, patients, doctors, users } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';

const assignDoctorToPatient = async(req, res) => {
    try{
        const { patient_id, doctor_id } = req.body;

        if (!patient_id || !doctor_id) {
            return res.status(400).json({ 
                status: 'incomplete',
                message: 'Patient ID and Doctor ID are required'
             });
        }

        const [patient] = await db.select().from(patients).where(eq(patients.id, patient_id));
        const [doctor] = await db.select().from(doctors).where(eq(doctors.id, doctor_id));

        if (!patient || !doctor) {
            return res.status(400).json({ 
                status: 'invalid',
                message: 'Patient or Doctor not found'
             });
        }

        const newMapping = {
            id: uuidv4(),
            patient_id,
            doctor_id,
        };

        const [mapping] = await db
            .insert(patientDoctorMappings)
            .values(newMapping)
            .returning();

        return res.status(200).json({ 
            status: 'created',
            message: 'Mapping created successfully',
            data: mapping
         });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            status: 'failed', 
            message: 'Something went wrong'
         });
    }
};

const getMappings = async(req, res) => {
    try {
        const mappings = await db
            .select()
            .from(patientDoctorMappings)
            .leftJoin(patients, eq(patientDoctorMappings.patient_id, patients.id))
            .leftJoin(doctors, eq(patientDoctorMappings.doctor_id, doctors.id))
            .leftJoin(users, eq(patients.user_id, users.id))
            .all();

        return res.status(200).json({ 
            status: 'success',
            message: 'Mappings fetched successfully',
            data: mappings 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            status: 'failed', 
            message: 'Something went wrong'
         });
    }
};

const getMappingForPatient = async(req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ 
                status: 'incomplete',
                message: 'Patient ID is required'
             });
        }

        const [mappings] = await db
            .select()
            .from(patientDoctorMappings)
            .leftJoin(patients, eq(patientDoctorMappings.patient_id, patients.id))
            .leftJoin(doctors, eq(patientDoctorMappings.doctor_id, doctors.id))
            .leftJoin(users, eq(patients.user_id, users.id))
            .where(eq(patients.id, id))

        if (mappings.length === 0) {
            return res.status(404).json({ 
                status: 'not_found',
                message: 'No mappings found for the given patient ID'
             });
        }
            

        return res.status(200).json({ 
            status: 'success',
            message: 'Mappings for patient fetched successfully',
            data: mappings 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            status: 'failed', 
            message: 'Something went wrong'
         });
    }
};

const deleteDoctorFromPatientMappings = async(req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ 
                status: 'incomplete',
                message: 'Mapping ID is required'
             });
        }
        const deleted = await db
            .delete(patientDoctorMappings)
            .where(eq(patientDoctorMappings.id, id))
            .returning();
        
        if(!deleted){
            return res.status(404).json({ 
                status: 'invalid',
                message: 'delete failed'
             });
        }
        return res.status(200).json({ 
            status: 'success',
            message: 'Mapping deleted successfully',
            data: deleted
         });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            status: 'failed', 
            message: 'Something went wrong'
         });
    }
};

export { assignDoctorToPatient, getMappings, getMappingForPatient, deleteDoctorFromPatientMappings }