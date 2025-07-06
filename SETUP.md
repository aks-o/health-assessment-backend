# Health Assessment App - Setup Guide

## Prerequisites

1. **Node.js** (v16 or higher)
2. **PostgreSQL** (v12 or higher)
3. **npm** or **yarn**

## Step 1: Environment Configuration

Create a `.env` file in the `health-assessment-backend` directory with the following content:

```env
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
JWT_SECRET=your_super_secure_jwt_secret_key_here_make_it_long_and_random
JWT_EXPIRES_IN=1h

# ========================================
# ENCRYPTION KEYS (Generated using generateKeys.js)
# ========================================
ENCRYPTION_KEY=5e659be73f6cd6ef01e8399941a01d24504dd7882dd6e51aabf2c1d0630253c0
ENCRYPTION_SALT=90dc596741bd94d70e274165e37807a4a4f319315138f4a39902b8785c5d17eac915e3e95284fc7dcc035278d2d3116d3989b827a4aa4438599b6bcf20423ec5
FILE_ENCRYPTION_KEY=0e89c5145e78a8ada166929216f382488d04ad637073250b573cbfe49cf414c7

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
SESSION_SECRET=your_session_secret_here
```

## Step 2: Database Setup

1. **Install PostgreSQL** if not already installed
2. **Create the database:**
   ```sql
   CREATE DATABASE health_assessment_db;
   ```
3. **Update the `.env` file** with your PostgreSQL credentials

## Step 3: Install Dependencies

```bash
# Install backend dependencies
cd health-assessment-backend
npm install

# Install frontend dependencies
cd ../health-assessment-frontend
npm install
```

## Step 4: Build and Start the Application

### Backend (Development)
```bash
cd health-assessment-backend
npm run dev
```

### Frontend (Development)
```bash
cd health-assessment-frontend
npm start
```

## Step 5: Verify Installation

1. **Backend API**: http://localhost:3000
2. **Frontend App**: http://localhost:3001
3. **Database**: Check if tables are created automatically

## Environment Variables Explained

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Backend server port | `3000` |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USERNAME` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | `your_password` |
| `DB_NAME` | Database name | `health_assessment_db` |
| `JWT_SECRET` | Secret for JWT tokens | `your_secret_key` |
| `ENCRYPTION_KEY` | Key for data encryption | `32_char_hex_string` |
| `ENCRYPTION_SALT` | Salt for encryption | `64_char_hex_string` |
| `FILE_ENCRYPTION_KEY` | Key for file encryption | `32_char_hex_string` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_EXPIRES_IN` | JWT token expiration | `1h` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3001` |
| `UPLOAD_DIR` | File upload directory | `uploads` |
| `MAX_FILE_SIZE` | Maximum file size (bytes) | `10485760` (10MB) |
| `LOG_LEVEL` | Logging level | `debug` |
| `BCRYPT_ROUNDS` | Password hashing rounds | `12` |

## Security Notes

1. **Never commit `.env` files** to version control
2. **Use strong, unique passwords** for database and JWT secrets
3. **Generate new encryption keys** for production
4. **Keep dependencies updated** regularly
5. **Use HTTPS** in production

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check database credentials in `.env`
   - Ensure database exists

2. **JWT Secret Error**
   - Make sure `JWT_SECRET` is set in `.env`
   - Use a strong, random secret

3. **Port Already in Use**
   - Change `PORT` in `.env`
   - Kill existing processes on the port

4. **CORS Errors**
   - Verify `CORS_ORIGIN` matches frontend URL
   - Check if frontend is running on correct port

### Getting Help

If you encounter issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check if PostgreSQL is running and accessible 