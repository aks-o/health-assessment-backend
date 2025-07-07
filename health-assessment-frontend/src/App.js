import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BloodDonation from './components/BloodDonation';
import DoctorRecommendation from './components/DoctorRecommendation';
import ImageUpload from './components/ImageUpload';
import MedicineCenters from './components/MedicineCenters';
import ProtectedRoute from './components/ProtectedRoute';
import HealthForm from './components/HealthForm';
import DoctorRegister from './components/DoctorRegister';
import MedicineCenterRegister from './components/MedicineCenterRegister';
import AboutPage from './components/AboutPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/blood-donation" element={<BloodDonation />} />
          <Route path="/doctors" element={<DoctorRecommendation />} />
          <Route path="/upload" element={<ImageUpload />} />
          <Route path="/medicine-centers" element={<MedicineCenters />} />
          <Route path="/doctor-register" element={<DoctorRegister />} />
          <Route path="/medicine-center-register" element={<MedicineCenterRegister />} />
          <Route path="/health-form" element={<HealthForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}



const ServicesPage = () => (
  <div style={{ padding: '100px 20px', textAlign: 'center' }}>
    <h1>Our Services</h1>
    <p>Health assessment, doctor recommendations, blood donation, and more.</p>
  </div>
);

const DemoPage = () => (
  <div style={{ padding: '100px 20px', textAlign: 'center' }}>
    <h1>Demo</h1>
    <p>Experience our health assessment features.</p>
  </div>
);

export default App;