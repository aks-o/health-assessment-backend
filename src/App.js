import React, { useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom';
import AssessmentForm from './AssessmentForm'; // <-- Import your new form here

function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users', form);
      setMessage('User registered: ' + res.data.email);
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required /><br />
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required /><br />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required /><br />
        <button type="submit">Register</button>
      </form>
      <div>{message}</div>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required /><br />
        <button type="submit">Login</button>
      </form>
      <div>{message}</div>
      <Link to="/">Don't have an account? Register</Link>
    </div>
  );
}

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
      setMessage('');
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={fetchUsers}>Load Users (Protected)</button>
      <div>{message}</div>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.email} ({u.firstName} {u.lastName})</li>
        ))}
      </ul>
      <Link to="/assessment">Health Assessment Form</Link><br />
      <button onClick={() => { localStorage.removeItem('token'); window.location = '/login'; }}>Logout</button>
    </div>
  );
}

// Remove the old AssessmentForm definition here!

function App() {
  return (
    <Router>
      <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assessment" element={<AssessmentForm />} /> {/* Use the new form here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;