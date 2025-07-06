"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("./src/entities/User");
const HealthAssessment_1 = require("./src/entities/HealthAssessment"); // Import the new entity
// import { CreateUsersTable1678886400000 } from './src/migrations/1678886400000-CreateUsersTable'; // Example migration import
dotenv_1.default.config();
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'your_db_password', // Use your actual password or env variable
    database: process.env.DB_NAME || 'health_assessment_db',
    synchronize: false, // Keep synchronize false for migrations
    logging: process.env.NODE_ENV === 'development', // Log SQL in development
    entities: [
        User_1.User,
        HealthAssessment_1.HealthAssessment // Add HealthAssessment here
    ],
    migrations: [
    // Add your migration classes here, e.g.,
    // CreateUsersTable1678886400000
    // Add future migration classes here
    ],
    subscribers: [],
    migrationsTableName: "typeorm_migrations" // Optional: customize migration table name
});
exports.default = AppDataSource;
