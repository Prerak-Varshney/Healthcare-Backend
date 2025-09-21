import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import { PORT } from './config/env.js';

import authRoutes from './routes/auth.routes.js';
import patientRoutes from './routes/patients.routes.js';
import doctorRoutes from './routes/doctors.routes.js';
import mappingsRoutes from './routes/mappings.routes.js';
import adminRoutes from './routes/admin.routes.js';

import { arcJetMiddleware } from './middleware/arcjet.middleware.js';

config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(arcJetMiddleware);

console.log(`Environment: ${process.env.NODE_ENV}`);

app.get('/', (_, res) => {
    res.send('<h1>Welcome to Healthcare Backend API</h1>');
})

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors`', doctorRoutes);
app.use('/api/mappings`', mappingsRoutes);
app.use('/api/admin', adminRoutes);

// app.use('/api/auth', authRoutes);
// app.use('/api', patientRoutes);
// app.use('/api', doctorRoutes);
// app.use('/api', mappingsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});