const { Client } = require('pg');
require('dotenv').config();

async function testDatabaseConnection() {
    const client = new Client({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'health_assessment_db'
    });

    try {
        console.log('🔍 Testing database connection...');
        console.log(`Host: ${process.env.DB_HOST || 'localhost'}`);
        console.log(`Port: ${process.env.DB_PORT || 5432}`);
        console.log(`User: ${process.env.DB_USERNAME || 'postgres'}`);
        console.log(`Database: ${process.env.DB_NAME || 'health_assessment_db'}`);
        
        await client.connect();
        console.log('✅ Database connection successful!');
        
        // Test a simple query
        const result = await client.query('SELECT NOW()');
        console.log('✅ Database query test successful:', result.rows[0]);
        
        await client.end();
        console.log('✅ Database connection closed.');
        
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.log('\n📋 Troubleshooting tips:');
        console.log('1. Make sure PostgreSQL is running');
        console.log('2. Check your .env file for correct database credentials');
        console.log('3. Ensure the database exists');
        console.log('4. Verify the user has proper permissions');
    }
}

testDatabaseConnection(); 