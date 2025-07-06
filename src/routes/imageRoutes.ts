import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { ImageAnalysisController, HealthAnalysisResult } from '../controllers/ImageAnalysisController';
import { Request, Response } from 'express';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Initialize the image analysis controller
const imageAnalysisController = new ImageAnalysisController();

/**
 * Upload and analyze medical image
 * POST /api/images/analyze
 */
router.post('/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageType = req.body.imageType || 'general';
    const imageBuffer = fs.readFileSync(req.file.path);

    console.log(`Processing image: ${req.file.originalname}, Type: ${imageType}`);

    // Analyze the image
    const analysisResult = await imageAnalysisController.analyzeMedicalImage(imageBuffer, imageType);

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      message: 'Image analyzed successfully',
      data: {
        originalName: req.file.originalname,
        imageType: imageType,
        analysis: analysisResult
      }
    });

  } catch (error) {
    console.error('Error processing image:', error);
    
    // Clean up uploaded file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      error: 'Failed to analyze image',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});

/**
 * Upload and analyze body image (legacy endpoint)
 * POST /api/images/body
 */
router.post('/body', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageBuffer = fs.readFileSync(req.file.path);
    const analysisResult = await imageAnalysisController.analyzeBodyImage(imageBuffer);

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      message: 'Body image analyzed successfully',
      data: analysisResult
    });

  } catch (error) {
    console.error('Error processing body image:', error);
    
    // Clean up uploaded file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      error: 'Failed to analyze body image',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});

/**
 * Upload and analyze medical document
 * POST /api/images/document
 */
router.post('/document', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No document file provided' });
    }

    const documentBuffer = fs.readFileSync(req.file.path);
    const analysisResult = await imageAnalysisController.analyzeMedicalDocument(documentBuffer);

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      message: 'Medical document analyzed successfully',
      data: analysisResult
    });

  } catch (error) {
    console.error('Error processing medical document:', error);
    
    // Clean up uploaded file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      error: 'Failed to analyze medical document',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});

/**
 * Get supported image types
 * GET /api/images/types
 */
router.get('/types', (req, res) => {
  res.json({
    success: true,
    data: {
      supportedTypes: [
        {
          type: 'xray',
          description: 'X-Ray images for bone and lung analysis',
          examples: ['Chest X-Ray', 'Bone X-Ray', 'Dental X-Ray']
        },
        {
          type: 'bloodtest',
          description: 'Blood test result images',
          examples: ['Lab reports', 'Blood work results', 'Test strips']
        },
        {
          type: 'ecg',
          description: 'ECG/EKG heart rhythm images',
          examples: ['Electrocardiogram', 'Heart rhythm strips']
        },
        {
          type: 'skin',
          description: 'Skin condition images',
          examples: ['Rashes', 'Moles', 'Lesions', 'Dermatological conditions']
        },
        {
          type: 'medicaldocument',
          description: 'Medical documents and reports',
          examples: ['Medical reports', 'Prescriptions', 'Lab reports']
        },
        {
          type: 'general',
          description: 'General medical images',
          examples: ['Any medical image not fitting other categories']
        }
      ]
    }
  });
});

/**
 * Health check for image analysis service
 * GET /api/images/health
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Image analysis service is running',
    timestamp: new Date().toISOString(),
    features: {
      imageUpload: true,
      imageAnalysis: true,
      multipleFormats: true,
      fileSizeLimit: '10MB'
    }
  });
});

export default router; 