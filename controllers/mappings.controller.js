const assignDoctorToPatient = async(req, res) => {
    res.send('Assign Doctor to Patient');
};

const getMappings = async(req, res) => {
    res.send('Get all Mappings');
};

const getMappingForPatient = async(req, res) => {
    res.send(`Get Mapping for Patient by ID`);
};

const deleteDoctorFromPatientMappings = async(req, res) => {
    res.send(`Delete Doctor from Patient Mappings with ID`);
};

export { assignDoctorToPatient, getMappings, getMappingForPatient, deleteDoctorFromPatientMappings }