import React, { useState } from 'react';
import './VoiceAssistant.css';

function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="voice-assistant-container">
      {/* Floating button to open assistant */}
      <button 
        className={`voice-assistant-button ${isOpen ? 'active' : ''}`} 
        onClick={toggleAssistant}
      >
        {isOpen ? '✕' : '🎙️'}
        <span className="tooltip-text">{isOpen ? 'Close Assistant' : 'Voice Assistant'}</span>
      </button>
      
      {/* Assistant panel */}
      {isOpen && (
        <div className="voice-assistant-panel">
          <div className="voice-assistant-header">
            <h3>HealthConnect AI Assistant</h3>
          </div>
          <div className="voice-assistant-content">
            <iframe 
              src="https://healthconnect-ai-472017321000.us-central1.run.app/" 
              title="HealthConnect AI Voice Assistant"
              className="voice-assistant-iframe"
              allow="microphone; camera"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default VoiceAssistant;
