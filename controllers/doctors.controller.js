const addDoctor = async(req, res) => {
    res.send('Add Doctor');
};

const getDoctors = async(req, res) => {
    res.send('Get All Doctors');
};

const getDoctor = async(req, res) => {
    res.send(`Get Doctor with ID`);
};

const updateDoctor = async(req, res) => {
    res.send(`Update Doctor with ID`);
};

const deleteDoctor = async(req, res) => {
    res.send(`Delete Doctor with ID`);
};

export { addDoctor, getDoctors, getDoctor, updateDoctor, deleteDoctor };