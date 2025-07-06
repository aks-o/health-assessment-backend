const { Client } = require('pg');
require('dotenv').config();

async function createDatabase() {
    // Connect to default postgres database first
    const client = new Client({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD,
        database: 'postgres' // Connect to default database first
    });

    try {
        console.log('🔍 Connecting to PostgreSQL...');
        await client.connect();
        console.log('✅ Connected to PostgreSQL successfully!');
        
        // Check if database already exists
        const checkResult = await client.query(
            "SELECT 1 FROM pg_database WHERE datname = $1",
            [process.env.DB_NAME || 'health_assessment_db']
        );
        
        if (checkResult.rows.length > 0) {
            console.log('✅ Database already exists!');
        } else {
            // Create the database
            console.log('📝 Creating database...');
            await client.query(`CREATE DATABASE ${process.env.DB_NAME || 'health_assessment_db'}`);
            console.log('✅ Database created successfully!');
        }
        
        await client.end();
        console.log('✅ Database setup completed!');
        
    } catch (error) {
        console.error('❌ Database creation failed:', error.message);
        console.log('\n📋 Troubleshooting tips:');
        console.log('1. Make sure PostgreSQL is running');
        console.log('2. Check your .env file for correct database credentials');
        console.log('3. Verify the user has CREATE DATABASE permissions');
    }
}

createDatabase(); 