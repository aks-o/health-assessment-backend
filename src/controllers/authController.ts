import { Request, Response } from 'express';
import AppDataSource from '../ormconfig';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import dotenv from 'dotenv'; // Import dotenv to access environment variables

dotenv.config(); // Load environment variables from .env file

const userRepository = AppDataSource.getRepository(User);

// Ensure JWT_SECRET is loaded
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in .env file.");
    process.exit(1); // Exit if the secret is missing
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // 1. Find user by email
        const user = await userRepository.findOne({
            where: { email },
            select: ["id", "email", "passwordHash", "firstName", "lastName"] // Ensure passwordHash is selected
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 2. Compare provided password with stored hash
        const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 3. Passwords match! Generate JWT
        const payload = {
            userId: user.id,
            email: user.email
            // Add other relevant non-sensitive info if needed (e.g., roles)
        };

        // Sign the token
        const token = jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: '1h' } // Token expiration time (e.g., 1 hour)
        );

        // Return the token to the client
        res.status(200).json({ message: 'Login successful', token: token });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Internal server error during login' });
    }
};