import 'reflect-metadata'; // Must be imported first for TypeORM
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import assessmentRoutes from './routes/assessmentRoutes';
import imageRoutes from './routes/imageRoutes';
import AppDataSource from './ormconfig';
import { encryptionMiddleware } from './middleware/encryptionMiddleware';
import testEncryptionRouter from './routes/testEncryptionRoute';
import doctorRoutes from './routes/doctorRoutes';
import areaRoutes from './routes/areaRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Apply encryption middleware globally
app.use(encryptionMiddleware.decrypt);
app.use(encryptionMiddleware.encrypt);

// Basic route for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Health Assessment API is running!');
});

// Mount all routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/test-encryption', testEncryptionRouter);
app.use('/api/doctors', doctorRoutes);
app.use('/api/areas', areaRoutes);
app.use('/api/suggest-doctor', doctorRoutes);

// Initialize Database and Start Server
AppDataSource.initialize()
    .then(() => {
        console.log("[database]: Data Source has been initialized!");

        // Start the server only after DB connection is successful
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("[database]: Error during Data Source initialization:", err);
    });

// No need to export app if we start listen here
// export default app; // Export app for potential testing