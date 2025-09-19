import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { PORT } from './config/env.js';

import authRoutes from './routes/auth.routes.js';
import patientRoutes from './routes/patients.routes.js';
import doctorRoutes from './routes/doctors.routes.js';
import mappingsRoutes from './routes/mappings.routes.js';

config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

console.log(`Environment: ${process.env.NODE_ENV}`);

app.get('/', (req, res) => {
    res.send('Welcome to Healthcare Backend API');
})

app.use('/api/auth', authRoutes);
app.use('/api', patientRoutes);
app.use('/api', doctorRoutes);
app.use('/api', mappingsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});