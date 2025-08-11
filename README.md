amplify-upload-app/
├── public/
│   └── index.html
├── src/
│   ├── aws-exports.js       ← Cognito config
│   ├── Upload.js            ← File upload component
│   ├── App.js               ← Root with Amplify Auth
│   └── index.js
├── package.json
└── README.md                ← Setup & deploy instructions

# Amplify Upload App

## 1. Install dependencies
npm install

## 2. Deploy backend (Lambda + API + S3 presigned URL endpoint) # See corresponding AWS SAM or Amplify backend steps

## 3. Configure aws-exports.js
Replace placeholders with your Cognito pool and API Gateway endpoint.

## 4. Deploy frontend
amplify init
amplify add hosting
amplify publish

