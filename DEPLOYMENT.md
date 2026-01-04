# AWS Amplify React Upload App - Deployment Guide

This React application uses AWS Amplify to provide a secure file upload system with:
- **Cognito Authentication**: User sign-up and sign-in
- **API Gateway**: REST API for generating presigned S3 URLs
- **Lambda**: Serverless function to generate presigned URLs
- **S3 Storage**: Secure file storage
- **Amplify Hosting**: Static web hosting

## Prerequisites

1. **AWS Account**: You need an AWS account with appropriate permissions
2. **Amplify CLI**: Install the Amplify CLI globally
   ```bash
   npm install -g @aws-amplify/cli
   ```
3. **Node.js**: Version 18.x or later
4. **Git**: For version control

## Initial Setup

### 1. Configure AWS Amplify CLI

If this is your first time using Amplify CLI, configure it with your AWS credentials:

```bash
amplify configure
```

Follow the prompts to:
- Sign in to your AWS Console
- Create an IAM user with appropriate permissions
- Set up your local AWS profile

### 2. Install Dependencies

```bash
npm install
```

## Deployment Steps

### 3. Initialize Amplify Project

If this is a fresh clone or the Amplify project needs initialization:

```bash
amplify init
```

When prompted:
- **Enter a name for the project**: FanAmplifyReact (or keep default)
- **Enter a name for the environment**: dev (or your preferred environment name)
- **Choose your default editor**: (select your preferred editor)
- **Choose the type of app**: javascript
- **What javascript framework**: react
- **Source Directory Path**: src
- **Distribution Directory Path**: build
- **Build Command**: npm run-script build
- **Start Command**: npm run-script start
- **Select the authentication method**: AWS profile (select your configured profile)

### 4. Push Backend Resources to AWS

Deploy all backend resources (Auth, API, Storage, Function) to AWS:

```bash
amplify push
```

This will:
- Create a Cognito User Pool and Identity Pool for authentication
- Create an S3 bucket for file storage
- Deploy a Lambda function for generating presigned URLs
- Create an API Gateway endpoint
- Set up all necessary IAM roles and permissions

The process may take 5-10 minutes. Review the changes and confirm when prompted.

### 5. Update aws-exports.js (Automatic)

After `amplify push` completes, Amplify automatically generates/updates the `src/aws-exports.js` file with your actual resource configurations. This file contains:
- Cognito User Pool IDs
- API Gateway endpoints
- S3 bucket names
- AWS region information

**Note**: This file is in `.gitignore` and should NOT be committed to version control as it contains environment-specific configuration.

### 6. Test Locally

Before deploying to hosting, test the application locally:

```bash
npm start
```

The app should open at `http://localhost:3000`. You should be able to:
1. Sign up for a new account
2. Verify your email
3. Sign in
4. Upload XML files

### 7. Deploy Frontend to Amplify Hosting

Deploy the frontend to AWS Amplify Hosting:

```bash
amplify add hosting
```

When prompted:
- **Select the plugin module**: Hosting with Amplify Console
- **Choose a type**: Manual deployment

Then publish:

```bash
amplify publish
```

This will:
- Build your React application
- Deploy it to Amplify Hosting
- Provide you with a live URL

## Backend Resources Created

After deployment, the following AWS resources will be created:

### Authentication (Cognito)
- **User Pool**: Manages user sign-up and sign-in
- **Identity Pool**: Provides AWS credentials for authenticated users
- **App Client**: Connects your React app to Cognito

### Storage (S3)
- **Bucket Name**: `fanamplifyreact-uploads-{env}`
- **Purpose**: Stores uploaded XML files
- **Access**: Authenticated users only

### API (API Gateway)
- **Endpoint**: `/generate-presigned-url`
- **Method**: GET
- **Purpose**: Returns a presigned URL for S3 uploads

### Function (Lambda)
- **Name**: `uploadFunction-{env}`
- **Runtime**: Node.js 18.x
- **Purpose**: Generates presigned S3 URLs
- **Environment Variables**: 
  - `STORAGE_BUCKET_NAME`: S3 bucket name
  - `AWS_REGION`: AWS region

## Environment Variables

The Lambda function uses the following environment variables (automatically configured):

- `STORAGE_BUCKET_NAME`: The S3 bucket name for uploads
- `AWS_REGION`: The AWS region where resources are deployed

## Managing Multiple Environments

You can create multiple environments (dev, staging, prod):

```bash
# Create a new environment
amplify env add

# Switch between environments
amplify env checkout <env-name>

# List all environments
amplify env list
```

## Updating the Backend

If you make changes to backend configurations:

1. Modify the resource configuration files in `amplify/backend/`
2. Run `amplify push` to deploy changes
3. Test thoroughly before deploying to production

## Monitoring and Logs

### View Lambda Logs
```bash
amplify console function
```
Select `uploadFunction` and choose "View CloudWatch Logs"

### View API Gateway Logs
```bash
amplify console api
```

### View Cognito Users
```bash
amplify console auth
```

## Troubleshooting

### Issue: "aws-exports.js not found"
**Solution**: Run `amplify push` to generate the configuration file

### Issue: "Unauthorized" when uploading
**Solution**: 
1. Ensure you're signed in
2. Check Lambda function has S3 permissions
3. Verify API Gateway is invoking Lambda correctly

### Issue: Build fails
**Solution**: 
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Ensure you're using Node.js 18.x or later

### Issue: CORS errors
**Solution**: 
1. Check S3 bucket CORS configuration
2. Verify API Gateway CORS settings
3. Ensure Lambda returns proper CORS headers

## Cost Considerations

This application uses AWS services that may incur costs:

- **Cognito**: Free tier includes 50,000 MAUs
- **S3**: Pay for storage and data transfer
- **Lambda**: Free tier includes 1M requests/month
- **API Gateway**: Free tier includes 1M API calls/month
- **Amplify Hosting**: Free tier includes 1000 build minutes/month

Monitor your usage in the AWS Billing Console.

## Security Best Practices

1. **Never commit** `aws-exports.js` or any AWS credentials
2. **Enable MFA** for your AWS account
3. **Use least-privilege** IAM policies
4. **Regularly rotate** access keys
5. **Monitor CloudWatch** logs for suspicious activity
6. **Enable AWS CloudTrail** for audit logging
7. **Use AWS WAF** to protect API Gateway (for production)

## Cleanup

To remove all AWS resources:

```bash
amplify delete
```

⚠️ **Warning**: This will permanently delete all resources and data!

## Support

For issues and questions:
- AWS Amplify Documentation: https://docs.amplify.aws/
- AWS Support: https://console.aws.amazon.com/support/
- GitHub Issues: [Your repository URL]

## License

[Your license information]
