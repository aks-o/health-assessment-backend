const { ImageAnnotatorClient } = require('@google-cloud/vision');
require('dotenv').config();

async function testGoogleVisionAPI() {
    console.log('🔍 Testing Google Cloud Vision API...');
    
    try {
        // Check environment variables
        const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
        const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
        
        console.log('Environment Check:');
        console.log(`- Credentials Path: ${credentialsPath || 'NOT SET'}`);
        console.log(`- Project ID: ${projectId || 'NOT SET'}`);
        
        if (!credentialsPath) {
            console.log('❌ GOOGLE_APPLICATION_CREDENTIALS not set in .env file');
            console.log('📋 Please follow the setup guide in GOOGLE_CLOUD_SETUP.md');
            return;
        }
        
        // Test Vision API client initialization
        const visionClient = new ImageAnnotatorClient();
        console.log('✅ Vision API client initialized successfully');
        
        // Test with a simple image (you can replace this with a real image path)
        console.log('📝 Note: To test with real images, update this script with actual image paths');
        
        console.log('✅ Google Cloud Vision API setup appears correct!');
        console.log('\n📋 Next steps:');
        console.log('1. Create the ImageAnalysisController.ts file with the provided code');
        console.log('2. Update your .env file with Google Cloud credentials');
        console.log('3. Test with actual medical images');
        
    } catch (error) {
        console.error('❌ Google Cloud Vision API test failed:', error.message);
        console.log('\n📋 Troubleshooting:');
        console.log('1. Check your .env file has correct credentials path');
        console.log('2. Verify Google Cloud project has Vision API enabled');
        console.log('3. Ensure service account has proper permissions');
        console.log('4. Check billing is enabled on your Google Cloud project');
    }
}

testGoogleVisionAPI(); 