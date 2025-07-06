const axios = require('axios');
const Encryption = require('./src/utils/encryption');
require('dotenv').config();

const testData = {
  name: "John Doe",
  sensitive: {
    ssn: "123-45-6789",
    dob: "1990-01-01"
  }
};

const encryption = new Encryption();
const encryptedData = encryption.encryptData(testData);

axios.post('http://localhost:3000/api/test-encryption', {
  data: encryptedData
})
.then(response => {
  console.log('Success:', response.data);
})
.catch(error => {
  console.error('Error:', error.message);
});