import { Request, Response } from 'express';
import AppDataSource from '../ormconfig'; // Correct path if ormconfig.ts is in src
import { User } from '../entities/User'; // Import the User entity
import { validate as isValidUUID } from 'uuid'; // Import UUID validation
import bcrypt from 'bcrypt'; // Import bcrypt

// Get the repository for the User entity
const userRepository = AppDataSource.getRepository(User);

// Controller function to get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find({
        // Optionally select specific fields to avoid sending sensitive data like passwordHash
        select: ["id", "email", "firstName", "lastName", "createdAt", "updatedAt"]
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Controller function to get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate if the provided ID is a valid UUID
  if (!isValidUUID(id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
    const user = await userRepository.findOne({
        where: { id },
        // Optionally select specific fields
        select: ["id", "email", "firstName", "lastName", "createdAt", "updatedAt"]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Controller function to create a new user
export const createUser = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body; // Get data from request body

    // Basic validation (add more robust validation later)
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    // Add more validation here (e.g., password complexity, email format)

    try {
        // Check if user already exists
        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Hash the password
        const saltRounds = 10; // Cost factor for hashing (recommended: 10-12)
        const passwordHash = await bcrypt.hash(password, saltRounds); // Hash the plain password

        const newUser = userRepository.create({
            email,
            passwordHash, // Store the hashed password
            firstName,
            lastName
        });

        await userRepository.save(newUser);

        // Return the created user (excluding password hash)
        const { passwordHash: _, ...userWithoutPassword } = newUser;
        res.status(201).json(userWithoutPassword);

    } catch (error) {
        console.error("Error creating user:", error);
        // Check for specific database errors if needed (e.g., unique constraint violation)
        res.status(500).json({ message: 'Error creating user' });
    }
};

// Add the missing getUsers function (alias for getAllUsers)
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find({
        // Optionally select specific fields to avoid sending sensitive data like passwordHash
        select: ["id", "email", "firstName", "lastName", "createdAt", "updatedAt"]
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Add more controller functions here later (e.g., updateUser, deleteUser)