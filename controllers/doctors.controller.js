const addDoctor = (req, res) => {
    res.send('Add Doctor');
};

const getDoctors = (req, res) => {
    res.send('Get All Doctors');
};

const getDoctor = (req, res) => {
    res.send(`Get Doctor with ID`);
};

const updateDoctor = (req, res) => {
    res.send(`Update Doctor with ID`);
};

const deleteDoctor = (req, res) => {
    res.send(`Delete Doctor with ID`);
};

export { addDoctor, getDoctors, getDoctor, updateDoctor, deleteDoctor };