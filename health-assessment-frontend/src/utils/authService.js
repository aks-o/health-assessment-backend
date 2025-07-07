// Mock Authentication Service - Works immediately without backend
class AuthService {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('users')) || [
      {
        id: 1,
        email: 'demo@healthconnect.com',
        password: 'demo123',
        firstName: 'Demo',
        lastName: 'User',
        phone: '+1-555-0123',
        dateOfBirth: '1990-01-01',
        isPremium: true
      }
    ];
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
  }

  // Register new user
  async register(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Check if user already exists
          const existingUser = this.users.find(user => user.email === userData.email);
          if (existingUser) {
            reject({ message: 'User with this email already exists' });
            return;
          }

          // Create new user
          const newUser = {
            id: this.users.length + 1,
            ...userData,
            isPremium: false,
            createdAt: new Date().toISOString()
          };

          this.users.push(newUser);
          localStorage.setItem('users', JSON.stringify(this.users));

          resolve({
            message: 'Registration successful!',
            user: { ...newUser, password: undefined }
          });
        } catch (error) {
          reject({ message: 'Registration failed' });
        }
      }, 1000); // Simulate API delay
    });
  }

  // Login user
  async login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const user = this.users.find(u => u.email === email && u.password === password);
          
          if (!user) {
            reject({ message: 'Invalid email or password' });
            return;
          }

          // Create session token
          const token = this.generateToken();
          const userWithoutPassword = { ...user, password: undefined };

          this.currentUser = userWithoutPassword;
          localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
          localStorage.setItem('token', token);

          resolve({
            message: 'Login successful!',
            token,
            user: userWithoutPassword
          });
        } catch (error) {
          reject({ message: 'Login failed' });
        }
      }, 1000); // Simulate API delay
    });
  }

  // Logout user
  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.currentUser;
  }

  // Check if user is premium
  isPremium() {
    return this.currentUser?.isPremium || false;
  }

  // Upgrade to premium
  upgradeToPremium() {
    if (this.currentUser) {
      this.currentUser.isPremium = true;
      const users = this.users.map(user => 
        user.id === this.currentUser.id 
          ? { ...user, isPremium: true }
          : user
      );
      this.users = users;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
  }

  // Generate mock token
  generateToken() {
    return 'mock_token_' + Math.random().toString(36).substr(2, 9);
  }

  // Update user profile
  async updateProfile(updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!this.currentUser) {
            reject({ message: 'User not authenticated' });
            return;
          }

          // Update user data
          this.currentUser = { ...this.currentUser, ...updates };
          this.users = this.users.map(user => 
            user.id === this.currentUser.id 
              ? { ...user, ...updates }
              : user
          );

          localStorage.setItem('users', JSON.stringify(this.users));
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

          resolve({
            message: 'Profile updated successfully!',
            user: this.currentUser
          });
        } catch (error) {
          reject({ message: 'Profile update failed' });
        }
      }, 1000);
    });
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService; 