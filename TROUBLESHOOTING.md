# Troubleshooting Guide

Common issues and their solutions when deploying and running the AWS Amplify React Upload App.

## Table of Contents
- [Setup Issues](#setup-issues)
- [Authentication Issues](#authentication-issues)
- [Upload Issues](#upload-issues)
- [Deployment Issues](#deployment-issues)
- [Build Issues](#build-issues)
- [Runtime Errors](#runtime-errors)

---

## Setup Issues

### Issue: `amplify command not found`

**Cause**: Amplify CLI not installed or not in PATH

**Solution**:
```bash
npm install -g @aws-amplify/cli
# Verify installation
amplify --version
```

### Issue: `amplify push` fails with permission errors

**Cause**: AWS credentials not configured or insufficient permissions

**Solution**:
1. Configure AWS credentials:
   ```bash
   amplify configure
   ```
2. Ensure IAM user has these policies:
   - AdministratorAccess-Amplify (or equivalent permissions)
   - CloudFormation, S3, Lambda, API Gateway, Cognito access

### Issue: `aws-exports.js` contains placeholder values

**Cause**: Backend not deployed yet

**Solution**:
```bash
amplify push
```
This will deploy backend resources and generate actual values.

---

## Authentication Issues

### Issue: "User does not exist" when signing in

**Cause**: User hasn't been created or email not verified

**Solution**:
1. Sign up for a new account
2. Check email for verification code
3. Complete email verification
4. Try signing in again

### Issue: Email verification not received

**Cause**: 
- Email in spam folder
- Incorrect email address
- Cognito email limit reached

**Solution**:
1. Check spam/junk folder
2. Verify email address is correct
3. Wait a few minutes and try again
4. Check CloudWatch logs for Cognito errors
5. In dev environment, you can verify users manually:
   ```bash
   amplify console auth
   ```

### Issue: "Invalid password" error

**Cause**: Password doesn't meet policy requirements

**Solution**:
Password must be at least 8 characters. Update in:
`amplify/backend/auth/fanamplifyreactauth/cli-inputs.json`

### Issue: Token expired errors

**Cause**: JWT token expired (default 1 hour)

**Solution**:
- Sign out and sign in again
- Tokens are refreshed automatically; check browser console for refresh errors

---

## Upload Issues

### Issue: "Failed to get presigned URL"

**Causes and Solutions**:

1. **Not authenticated**:
   - Sign in first
   - Check token is valid

2. **API Gateway not deployed**:
   ```bash
   amplify status
   amplify push
   ```

3. **Lambda not deployed**:
   ```bash
   amplify console function
   # Check if uploadFunction exists
   ```

4. **CORS issues**:
   - Check browser console for CORS errors
   - Verify API Gateway CORS settings

### Issue: "Upload failed" error

**Causes and Solutions**:

1. **Presigned URL expired** (5-minute limit):
   - Get a new presigned URL
   - Upload immediately after receiving URL

2. **S3 CORS not configured**:
   - Check S3 bucket CORS configuration
   - Should allow PUT from all origins

3. **Wrong Content-Type**:
   - Ensure file is .xml
   - Check Content-Type header matches expected type

4. **File too large**:
   - Check S3 bucket limits
   - Check Lambda timeout (25 seconds)

### Issue: Files not appearing in S3

**Cause**: Wrong bucket or path

**Solution**:
1. Check S3 bucket name in CloudFormation outputs:
   ```bash
   amplify console storage
   ```
2. Verify bucket exists and has correct permissions
3. Check Lambda environment variable `STORAGE_BUCKET_NAME`

---

## Deployment Issues

### Issue: `amplify push` hangs or takes too long

**Cause**: CloudFormation stack creation/update in progress

**Solution**:
- Wait for completion (can take 10-15 minutes)
- Check CloudFormation console for progress
- If stuck for >30 minutes, check for errors:
  ```bash
  amplify console
  ```

### Issue: CloudFormation stack creation failed

**Causes and Solutions**:

1. **Resource limits exceeded**:
   - Check AWS service quotas
   - Request limit increases if needed

2. **Invalid configuration**:
   - Review error in CloudFormation console
   - Check resource definitions in `amplify/backend/`

3. **Dependency errors**:
   - Ensure resources are deployed in correct order
   - Check `dependsOn` in backend-config.json

### Issue: `amplify publish` fails

**Cause**: Build errors or hosting not configured

**Solution**:
```bash
# Test build locally first
npm run build

# Check hosting status
amplify status

# If hosting not added:
amplify add hosting

# Then publish
amplify publish
```

---

## Build Issues

### Issue: Build fails with "Cannot find module 'aws-exports'"

**Cause**: Backend not deployed

**Solution**:
```bash
amplify push
```

### Issue: npm install fails

**Causes and Solutions**:

1. **Incorrect Node.js version**:
   ```bash
   node -v  # Should be 18.x or later
   # Install correct version if needed
   ```

2. **Corrupted package-lock.json**:
   ```bash
   rm package-lock.json
   rm -rf node_modules
   npm install
   ```

3. **Network issues**:
   ```bash
   npm cache clean --force
   npm install
   ```

### Issue: Build warnings about deprecated packages

**Cause**: Dependencies using older packages

**Solution**:
- These are usually non-critical
- To update:
  ```bash
  npm update
  ```

---

## Runtime Errors

### Issue: "Amplify is not configured" error

**Cause**: aws-exports.js not imported or configured

**Solution**:
Verify in `src/App.js`:
```javascript
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
```

### Issue: CORS errors in browser console

**Causes and Solutions**:

1. **API Gateway CORS**:
   - OPTIONS method should return CORS headers
   - Check API Gateway console

2. **S3 CORS**:
   - Verify bucket CORS configuration
   - Should allow PUT, GET from all origins

3. **Lambda response headers**:
   - Check Lambda returns CORS headers in response

### Issue: "Network Error" or "Failed to fetch"

**Causes and Solutions**:

1. **API endpoint incorrect**:
   - Check aws-exports.js has correct endpoint
   - Verify with: `amplify console api`

2. **Internet connectivity**:
   - Check network connection
   - Verify not behind restrictive firewall

3. **API Gateway down** (rare):
   - Check AWS Service Health Dashboard

### Issue: Console errors about missing polyfills

**Cause**: React Scripts 5.x doesn't include some Node.js polyfills

**Solution**:
This is usually not critical. If it causes issues:
```bash
npm install --save-dev react-app-rewired
# Configure webpack to include polyfills
```

---

## Debugging Tips

### Enable Debug Logging

Add to your app:
```javascript
import { Amplify } from 'aws-amplify';
Amplify.configure({
  ...awsconfig,
  // Add this for debugging
  API: {
    ...awsconfig.API,
    debug: true
  }
});
```

### Check Lambda Logs

```bash
amplify console function
# Select uploadFunction
# View CloudWatch Logs
```

### Check API Gateway Logs

```bash
amplify console api
# Enable CloudWatch logging
# View execution logs
```

### Check S3 Access Logs

Enable S3 access logging to track uploads:
```bash
amplify console storage
# Enable access logging
```

### Useful Commands

```bash
# Check Amplify status
amplify status

# View all resources
amplify console

# Check auth status
amplify console auth

# Check API
amplify console api

# Check function
amplify console function

# Check storage
amplify console storage

# Pull latest backend
amplify pull

# Reset local backend
amplify delete  # WARNING: Deletes all resources
```

---

## Getting Help

If you're still stuck:

1. **Check AWS Forums**: https://forums.aws.amazon.com/
2. **Amplify Discord**: https://discord.gg/amplify
3. **Stack Overflow**: Tag with `aws-amplify`
4. **AWS Support**: If you have a support plan
5. **GitHub Issues**: For bugs in Amplify CLI

### When Asking for Help

Include:
- Amplify CLI version: `amplify --version`
- Node.js version: `node -v`
- Error messages (full stack trace)
- Steps to reproduce
- What you've already tried

---

## Emergency Procedures

### Complete Reset (Last Resort)

⚠️ **WARNING**: This deletes all AWS resources!

```bash
# 1. Delete Amplify backend
amplify delete

# 2. Remove local Amplify files
rm -rf amplify

# 3. Start fresh
amplify init
amplify push
```

### Rollback Deployment

```bash
# Check previous environments
amplify env list

# Checkout previous environment
amplify env checkout previous-env

# Or manually restore from CloudFormation
# Go to CloudFormation console
# Select stack → Actions → Detect Drift → View Drift Results
```
