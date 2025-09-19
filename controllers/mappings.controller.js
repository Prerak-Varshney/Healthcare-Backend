const assignDoctorToPatient = (req, res) => {
    res.send('Assign Doctor to Patient');
};

const getMappings = (req, res) => {
    res.send('Get all Mappings');
};

const getMappingForPatient = (req, res) => {
    res.send(`Get Mapping for Patient by ID`);
};

const deleteDoctorFromPatientMappings = (req, res) => {
    res.send(`Delete Doctor from Patient Mappings with ID`);
};

export { assignDoctorToPatient, getMappings, getMappingForPatient, deleteDoctorFromPatientMappings }