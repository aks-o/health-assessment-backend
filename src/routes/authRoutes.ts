import { Router } from 'express';
import { loginUser } from '../controllers/authController'; // Import the login controller function

const router = Router();

// Define the POST route for login
// It will expect 'email' and 'password' in the request body
router.post('/login', loginUser);

// Add other auth routes here later (e.g., register, refresh token)

export default router;