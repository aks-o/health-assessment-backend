# Google Cloud Vision API Setup Guide

## Prerequisites
- Google Cloud Account
- Billing enabled on your Google Cloud project

## Step 1: Create Google Cloud Project

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create a new project** or select existing project
3. **Enable billing** for the project

## Step 2: Enable Required APIs

Enable these APIs in your Google Cloud project:

### Core APIs
- **Cloud Vision API** - For image analysis and OCR
- **Cloud Storage API** - For storing medical images
- **Cloud Functions API** - For serverless processing (optional)

### Enable via Console:
1. Go to **APIs & Services** > **Library**
2. Search for each API and click **Enable**

### Enable via gcloud CLI:
```bash
gcloud services enable vision.googleapis.com
gcloud services enable storage.googleapis.com
gcloud services enable cloudfunctions.googleapis.com
```

## Step 3: Create Service Account

1. **Go to IAM & Admin** > **Service Accounts**
2. **Click "Create Service Account"**
3. **Name**: `health-assessment-vision`
4. **Description**: `Service account for health assessment image analysis`
5. **Click "Create and Continue"**

### Assign Roles:
- **Cloud Vision API User**
- **Cloud Storage Object Viewer**
- **Cloud Storage Object Creator**

## Step 4: Generate Service Account Key

1. **Click on the created service account**
2. **Go to "Keys" tab**
3. **Click "Add Key"** > **"Create new key"**
4. **Choose JSON format**
5. **Download the JSON file**

## Step 5: Configure Environment

1. **Place the JSON file** in your project (e.g., `config/google-vision-key.json`)
2. **Add to .env file**:
   ```env
   GOOGLE_APPLICATION_CREDENTIALS=config/google-vision-key.json
   GOOGLE_CLOUD_PROJECT_ID=your-project-id
   ```

## Step 6: Install Dependencies

```bash
npm install @google-cloud/vision @google-cloud/storage
```

## Security Notes

⚠️ **Important Security Considerations:**
- Never commit service account keys to version control
- Use environment variables for sensitive data
- Set up proper IAM permissions
- Enable audit logging
- Consider using Workload Identity for production

## Testing the Setup

Run the test script to verify your setup:
```bash
node test-google-vision.js
``` 