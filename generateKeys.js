const crypto = require('crypto');

function generateSecureKey(length) {
    return crypto.randomBytes(length).toString('hex');
}

console.log('Generated Secure Keys:\n');
console.log(`ENCRYPTION_KEY=${generateSecureKey(32)}`);
console.log(`ENCRYPTION_SALT=${generateSecureKey(64)}`);
console.log(`FILE_ENCRYPTION_KEY=${generateSecureKey(32)}`);