import { Request, Response, NextFunction } from 'express';
import { Encryption } from '../utils/encryption';

interface EncryptedRequest extends Request {
  decryptedBody?: any;
}

const SENSITIVE_FIELDS = [
  'medicalHistory',
  'bloodTestResults',
  'diagnosis',
  'prescription',
  'symptoms',
  'painDescription',
  'personalInfo'
];

export const encryptionMiddleware = {
  decrypt: (req: EncryptedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.body) {
        return next();
      }

      const encryptionKey = process.env.ENCRYPTION_KEY;
      if (!encryptionKey) {
        throw new Error('Encryption key not configured');
      }

      // Store original body for reference
      req.decryptedBody = { ...req.body };

      // Decrypt sensitive fields
      SENSITIVE_FIELDS.forEach(field => {
        if (req.body[field]) {
          try {
            req.body[field] = Encryption.decrypt(req.body[field], encryptionKey);
            // Parse JSON if the decrypted data is a JSON string
            if (typeof req.body[field] === 'string') {
              try {
                req.body[field] = JSON.parse(req.body[field]);
              } catch (e) {
                // If parsing fails, keep the decrypted string as is
              }
            }
          } catch (error) {
            // If decryption fails, keep the original value
            console.warn(`Failed to decrypt ${field}`);
          }
        }
      });

      next();
    } catch (error) {
      next(error);
    }
  },

  encrypt: (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.json;
    const encryptionKey = process.env.ENCRYPTION_KEY;

    if (!encryptionKey) {
      return next(new Error('Encryption key not configured'));
    }

    res.json = function (body: any) {
      if (body && typeof body === 'object') {
        // Encrypt sensitive fields
        SENSITIVE_FIELDS.forEach(field => {
          if (body[field]) {
            try {
              const dataToEncrypt = typeof body[field] === 'object' 
                ? JSON.stringify(body[field]) 
                : body[field].toString();
              body[field] = Encryption.encrypt(dataToEncrypt, encryptionKey);
            } catch (error) {
              console.error(`Failed to encrypt ${field}:`, error);
            }
          }
        });
      }

      return originalSend.call(res, body);
    };

    next();
  }
};