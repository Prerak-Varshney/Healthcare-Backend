const addPatient = (req, res) => {
    res.send('Add Patient');
}

const getPatients = (req, res) => {
    res.send('Get All Patients');
}

const getPatient = (req, res) => {
    res.send('Get Patient by ID');
}

const updatePatient = (req, res) => {
    res.send('Update Patient by ID');
}

const deletePatient = (req, res) => {
    res.send('Delete Patient by ID');
}

export { addPatient, getPatients, getPatient, updatePatient, deletePatient };