import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from './entities/User';
import { HealthAssessment } from './entities/HealthAssessment'; // Import the new entity
import { Area } from './entities/Area';
import { Doctor } from './entities/Doctor';
import { SuggestedDoctor } from './entities/SuggestedDoctor';
// import { CreateUsersTable1678886400000 } from './src/migrations/1678886400000-CreateUsersTable'; // Example migration import

dotenv.config();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'your_db_password', // Use your actual password or env variable
    database: process.env.DB_NAME || 'health_assessment_db',
    synchronize: true, // Keep synchronize false for migrations
    logging: process.env.NODE_ENV === 'development', // Log SQL in development
    entities: [
        User,
        HealthAssessment,
        Area,
        Doctor,
        SuggestedDoctor
    ],
    migrations: [
        // Add your migration classes here, e.g.,
        // CreateUsersTable1678886400000
        // Add future migration classes here
    ],
    subscribers: [],
    migrationsTableName: "typeorm_migrations" // Optional: customize migration table name
});

export default AppDataSource;