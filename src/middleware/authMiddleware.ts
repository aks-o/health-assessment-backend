import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Define a custom interface extending Express's Request to include the user payload
export interface AuthenticatedRequest extends Request {
    user?: { // Make user optional or define a specific type/interface for your payload
        userId: string;
        email: string;
        // Add other properties from your JWT payload if needed
    };
}

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in .env file for middleware.");
    process.exit(1);
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Get token from the Authorization header (e.g., "Bearer TOKEN_STRING")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token part

    if (token == null) {
        // No token provided
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the token
    jwt.verify(token, jwtSecret, (err: any, userPayload: any) => {
        if (err) {
            // Token is invalid (e.g., expired, wrong signature)
            console.error("JWT Verification Error:", err.message);
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }

        // Token is valid, attach payload to request object
        req.user = userPayload as { userId: string; email: string; }; // Cast payload to expected type
        next(); // Proceed to the next middleware or route handler
    });
};