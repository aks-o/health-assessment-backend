import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../utils/authService';
import './ImageUpload.css';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setMessage('Please select a valid file (JPEG, PNG, or PDF)');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setMessage('');

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setMessage('Please select a file to upload');
      return;
    }

    if (!reportType) {
      setMessage('Please select a report type');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setMessage('');

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Save report to localStorage
      const reports = JSON.parse(localStorage.getItem('medicalReports') || '[]');
      const newReport = {
        id: Date.now(),
        userId: authService.getCurrentUser()?.id,
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileSize: selectedFile.size,
        reportType,
        description,
        uploadDate: new Date().toISOString(),
        status: 'uploaded',
        analysis: {
          status: 'pending',
          results: null
        }
      };
      reports.push(newReport);
      localStorage.setItem('medicalReports', JSON.stringify(reports));

      setUploadProgress(100);
      setMessage('Report uploaded successfully! Analysis will begin shortly.');
      
      // Reset form
      setSelectedFile(null);
      setPreview(null);
      setReportType('');
      setDescription('');
      
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      setMessage('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setMessage('');
  };

  return (
    
      <div className="upload-container">
        <div className="upload-header">
          <h1>Upload Medical Report</h1>
          <p>Upload your medical reports for AI-powered analysis and expert insights</p>
        </div>

        <div className="upload-card">
          <form onSubmit={handleUpload} className="upload-form">
            {/* File Upload Area */}
            <div className="file-upload-area">
              {!selectedFile ? (
                <div className="upload-zone">
                  <div className="upload-icon">📤</div>
                  <h3>Choose a file or drag it here</h3>
                  <p>Supports JPEG, PNG, and PDF files (max 5MB)</p>
                  <input
                    type="file"
                    id="file-input"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileSelect}
                    className="file-input"
                  />
                  <label htmlFor="file-input" className="upload-btn">
                    Select File
                  </label>
                </div>
              ) : (
                <div className="file-preview">
                  <div className="file-info">
                    <div className="file-icon">
                      {selectedFile.type.startsWith('image/') ? '🖼️' : '📄'}
                    </div>
                    <div className="file-details">
                      <h4>{selectedFile.name}</h4>
                      <p>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button type="button" onClick={removeFile} className="remove-btn">
                      ✕
                    </button>
                  </div>
                  {preview && (
                    <div className="image-preview">
                      <img src={preview} alt="Preview" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Report Details */}
            <div className="report-details">
              <div className="form-group">
                <label htmlFor="reportType">Report Type *</label>
                <select
                  id="reportType"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  required
                >
                  <option value="">Select Report Type</option>
                  <option value="blood-test">Blood Test</option>
                  <option value="x-ray">X-Ray</option>
                  <option value="mri">MRI Scan</option>
                  <option value="ct-scan">CT Scan</option>
                  <option value="ultrasound">Ultrasound</option>
                  <option value="ecg">ECG</option>
                  <option value="biopsy">Biopsy Report</option>
                  <option value="pathology">Pathology Report</option>
                  <option value="prescription">Prescription</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add any additional notes about this report..."
                  rows="3"
                />
              </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="upload-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p>Uploading... {uploadProgress}%</p>
              </div>
            )}

            {/* Message */}
            {message && (
              <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`submit-btn ${isUploading ? 'loading' : ''}`}
              disabled={isUploading || !selectedFile}
            >
              {isUploading ? 'Uploading...' : 'Upload Report'}
            </button>
          </form>
        </div>

        {/* Features */}
        <div className="upload-features">
          <h2>Why Upload Your Reports?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Analysis</h3>
              <p>Advanced AI technology analyzes your reports for potential issues</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍⚕️</div>
              <h3>Expert Review</h3>
              <p>Get insights from qualified healthcare professionals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Storage</h3>
              <p>Your medical data is encrypted and securely stored</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Trend Analysis</h3>
              <p>Track your health progress over time</p>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default ImageUpload;
