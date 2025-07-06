const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function generateSecureKey(length) {
    return crypto.randomBytes(length).toString('hex');
}

function generateJWTSecret() {
    return crypto.randomBytes(64).toString('hex');
}

function createEnvFile() {
    const envContent = `# ========================================
# Health Assessment App - Environment Configuration
# Generated on ${new Date().toISOString()}
# ========================================

# ========================================
# SERVER CONFIGURATION
# ========================================
NODE_ENV=development
PORT=3000

# ========================================
# DATABASE CONFIGURATION (PostgreSQL)
# ========================================
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_secure_password_here
DB_NAME=health_assessment_db

# ========================================
# JWT CONFIGURATION
# ========================================
JWT_SECRET=${generateJWTSecret()}
JWT_EXPIRES_IN=1h

# ========================================
# ENCRYPTION KEYS
# ========================================
ENCRYPTION_KEY=${generateSecureKey(32)}
ENCRYPTION_SALT=${generateSecureKey(64)}
FILE_ENCRYPTION_KEY=${generateSecureKey(32)}

# ========================================
# CORS CONFIGURATION
# ========================================
CORS_ORIGIN=http://localhost:3001
CORS_CREDENTIALS=true

# ========================================
# FILE UPLOAD CONFIGURATION
# ========================================
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf

# ========================================
# LOGGING CONFIGURATION
# ========================================
LOG_LEVEL=debug
LOG_FILE=logs/app.log

# ========================================
# SECURITY CONFIGURATION
# ========================================
BCRYPT_ROUNDS=12
SESSION_SECRET=${generateSecureKey(32)}

# ========================================
# OPTIONAL CONFIGURATIONS (Uncomment as needed)
# ========================================

# Google Cloud Vision API
# GOOGLE_APPLICATION_CREDENTIALS=path/to/your/service-account-key.json
# GOOGLE_CLOUD_PROJECT_ID=your-project-id

# Email Configuration
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
# EMAIL_FROM=noreply@healthassessment.com

# Redis Configuration
# REDIS_HOST=localhost
# REDIS_PORT=6379
# REDIS_PASSWORD=

# Monitoring
# SENTRY_DSN=your-sentry-dsn-here
# NEW_RELIC_LICENSE_KEY=your-new-relic-key-here
`;

    const envPath = path.join(__dirname, '.env');
    
    if (fs.existsSync(envPath)) {
        console.log('⚠️  .env file already exists. Skipping creation.');
        console.log('   If you want to regenerate, delete the existing .env file first.');
        return;
    }

    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('📝 Please update the following values in your .env file:');
    console.log('   - DB_PASSWORD: Set your PostgreSQL password');
    console.log('   - Any other values specific to your environment');
}

function createUploadsDirectory() {
    const uploadsPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath, { recursive: true });
        console.log('✅ Uploads directory created');
    } else {
        console.log('📁 Uploads directory already exists');
    }
}

function createLogsDirectory() {
    const logsPath = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsPath)) {
        fs.mkdirSync(logsPath, { recursive: true });
        console.log('✅ Logs directory created');
    } else {
        console.log('📁 Logs directory already exists');
    }
}

function main() {
    console.log('🚀 Health Assessment App - Setup Script');
    console.log('=====================================\n');

    try {
        createEnvFile();
        createUploadsDirectory();
        createLogsDirectory();

        console.log('\n🎉 Setup completed successfully!');
        console.log('\n📋 Next steps:');
        console.log('1. Update your .env file with your database credentials');
        console.log('2. Install dependencies: npm install');
        console.log('3. Start the development server: npm run dev');
        console.log('\n📖 For more information, see SETUP.md');

    } catch (error) {
        console.error('❌ Setup failed:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { createEnvFile, createUploadsDirectory, createLogsDirectory }; 