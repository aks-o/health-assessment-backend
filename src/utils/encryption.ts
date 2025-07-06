import * as crypto from 'crypto';

export class Encryption {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly KEY_LENGTH = 32; // 256 bits
  private static readonly IV_LENGTH = 16; // 128 bits
  private static readonly SALT_LENGTH = 64;
  private static readonly TAG_LENGTH = 16;

  private static getKey(password: string, salt: Buffer): Buffer {
    return crypto.pbkdf2Sync(password, salt, 100000, this.KEY_LENGTH, 'sha512');
  }

  static encrypt(data: string, password: string): string {
    // Generate a random salt
    const salt = crypto.randomBytes(this.SALT_LENGTH);
    
    // Generate encryption key from password and salt
    const key = this.getKey(password, salt);
    
    // Generate initialization vector
    const iv = crypto.randomBytes(this.IV_LENGTH);
    
    // Create cipher
    const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);
    
    // Encrypt the data
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Get the auth tag
    const tag = cipher.getAuthTag();
    
    // Combine all components: salt (hex) + iv (hex) + tag (hex) + encrypted (hex)
    return salt.toString('hex') +
           iv.toString('hex') +
           tag.toString('hex') +
           encrypted;
  }

  static decrypt(encryptedData: string, password: string): string {
    try {
      // Extract components
      const salt = Buffer.from(encryptedData.slice(0, this.SALT_LENGTH * 2), 'hex');
      const iv = Buffer.from(encryptedData.slice(this.SALT_LENGTH * 2, (this.SALT_LENGTH + this.IV_LENGTH) * 2), 'hex');
      const tag = Buffer.from(encryptedData.slice((this.SALT_LENGTH + this.IV_LENGTH) * 2, (this.SALT_LENGTH + this.IV_LENGTH + this.TAG_LENGTH) * 2), 'hex');
      const encrypted = encryptedData.slice((this.SALT_LENGTH + this.IV_LENGTH + this.TAG_LENGTH) * 2);
      
      // Generate key from password and salt
      const key = this.getKey(password, salt);
      
      // Create decipher
      const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
      decipher.setAuthTag(tag);
      
      // Decrypt the data
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      throw new Error('Decryption failed. The data may be corrupted or the password is incorrect.');
    }
  }

  static hashPassword(password: string): string {
    const salt = crypto.randomBytes(this.SALT_LENGTH);
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
    return salt.toString('hex') + hash.toString('hex');
  }

  static verifyPassword(password: string, hashedPassword: string): boolean {
    const salt = Buffer.from(hashedPassword.slice(0, this.SALT_LENGTH * 2), 'hex');
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
    const originalHash = hashedPassword.slice(this.SALT_LENGTH * 2);
    return hash.toString('hex') === originalHash;
  }
}