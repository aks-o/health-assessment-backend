import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  try {
    // Echo back the received data to verify encryption/decryption
    res.json({
      message: 'Encryption test successful',
      receivedData: req.body,
      sensitiveData: {
        medicalHistory: 'Patient has a history of hypertension',
        bloodTestResults: {
          glucose: 120,
          cholesterol: 180
        },
        personalInfo: {
          name: 'John Doe',
          age: 45
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Encryption test failed' });
  }
});

export default router;