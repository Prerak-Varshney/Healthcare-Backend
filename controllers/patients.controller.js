const addPatient = async(req, res) => {
    res.send('Add Patient');
}

const getPatients = async(req, res) => {
    res.send('Get All Patients');
}

const getPatient = async(req, res) => {
    res.send('Get Patient by ID');
}

const updatePatient = async(req, res) => {
    res.send('Update Patient by ID');
}

const deletePatient = async(req, res) => {
    res.send('Delete Patient by ID');
}

export { addPatient, getPatients, getPatient, updatePatient, deletePatient };