# Amplify Upload App

A React application with AWS Amplify that provides secure file upload functionality with user authentication.

## Features

- 🔐 **User Authentication**: Cognito-based sign-up and sign-in
- 📤 **Secure File Upload**: Upload XML files to S3 using presigned URLs
- ⚡ **Serverless Backend**: Lambda functions and API Gateway
- 🎨 **Modern UI**: React 18 with Amplify UI components
- ☁️ **AWS Hosted**: Deployed on AWS Amplify Hosting

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Deploy backend
See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

Quick deploy:
```bash
amplify init
amplify push
```

### 3. Configure aws-exports.js
After running `amplify push`, the `aws-exports.js` file will be automatically generated with your Cognito pool and API Gateway endpoint.

### 4. Run locally
```bash
npm start
```

### 5. Deploy frontend
```bash
amplify add hosting
amplify publish
```

## Project Structure

```
amplify-upload-app/
├── public/
│   └── index.html
├── src/
│   ├── aws-exports.js       ← Amplify config (auto-generated)
│   ├── Upload.js            ← File upload component
│   ├── App.js               ← Root with Amplify Auth
│   └── index.js
├── amplify/
│   ├── backend/
│   │   ├── auth/            ← Cognito configuration
│   │   ├── api/             ← API Gateway configuration
│   │   ├── function/        ← Lambda function
│   │   ├── storage/         ← S3 bucket configuration
│   │   └── hosting/         ← Amplify Hosting configuration
│   └── team-provider-info.json
├── package.json
├── DEPLOYMENT.md            ← Detailed deployment guide
└── README.md                ← This file
```

## Architecture

```
User → Cognito Auth → React App → API Gateway → Lambda → S3 Presigned URL → S3 Upload
```

## Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)**: Complete deployment guide
- **[Amplify Docs](https://docs.amplify.aws/)**: Official AWS Amplify documentation

## Requirements

- Node.js 18.x or later
- AWS Account
- AWS Amplify CLI (`npm install -g @aws-amplify/cli`)

## Available Scripts

- `npm start`: Run development server
- `npm run build`: Build for production
- `npm test`: Run tests

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## License

See LICENSE file for details.


