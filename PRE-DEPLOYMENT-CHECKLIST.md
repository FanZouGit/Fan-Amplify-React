# Pre-Deployment Checklist

Use this checklist before deploying your AWS Amplify React Upload App to ensure everything is properly configured.

## Prerequisites

- [ ] AWS Account created and accessible
- [ ] AWS CLI installed (optional but recommended)
- [ ] Amplify CLI installed (`npm install -g @aws-amplify/cli`)
- [ ] Node.js 18.x or later installed
- [ ] Git installed

## AWS Configuration

- [ ] Amplify CLI configured with AWS credentials (`amplify configure`)
- [ ] IAM user has appropriate permissions for:
  - CloudFormation
  - S3
  - Lambda
  - API Gateway
  - Cognito
  - IAM
  - Amplify Console

## Project Setup

- [ ] Repository cloned locally
- [ ] Dependencies installed (`npm install`)
- [ ] No errors when running `npm list --depth=0`
- [ ] Verification script passed (`npm run verify`)

## Amplify Backend

- [ ] Amplify project initialized (`amplify init`)
- [ ] Backend configuration files reviewed:
  - [ ] `amplify/backend/auth/fanamplifyreactauth/` - Cognito configuration
  - [ ] `amplify/backend/api/uploadAPI/` - API Gateway configuration
  - [ ] `amplify/backend/function/uploadFunction/` - Lambda function
  - [ ] `amplify/backend/storage/uploadbucket/` - S3 bucket configuration
  - [ ] `amplify/backend/hosting/amplifyhosting/` - Hosting configuration
- [ ] Backend resources pushed to AWS (`amplify push`)
- [ ] `src/aws-exports.js` generated with actual values (not placeholders)

## Testing

- [ ] Application builds without errors (`npm run build`)
- [ ] Application runs locally (`npm start`)
- [ ] Can sign up for a new account
- [ ] Email verification works
- [ ] Can sign in with created account
- [ ] Can upload XML files
- [ ] Files appear in S3 bucket
- [ ] No console errors in browser

## Security

- [ ] `aws-exports.js` is in `.gitignore`
- [ ] No AWS credentials committed to repository
- [ ] S3 bucket has appropriate CORS configuration
- [ ] Lambda function has minimum required permissions
- [ ] Cognito password policy meets requirements
- [ ] API Gateway has appropriate authorization

## Documentation

- [ ] `DEPLOYMENT.md` reviewed and understood
- [ ] `README.md` updated with project-specific information
- [ ] Team members know how to deploy updates
- [ ] Monitoring and logging strategy documented

## Hosting

- [ ] Hosting added to Amplify (`amplify add hosting`)
- [ ] Build settings configured correctly
- [ ] Environment variables set (if any)
- [ ] Custom domain configured (if needed)

## Post-Deployment

- [ ] Verify deployment succeeded
- [ ] Test application at live URL
- [ ] Monitor CloudWatch logs for errors
- [ ] Set up alerts for critical errors
- [ ] Document actual resource names and URLs
- [ ] Share credentials with team (securely)

## Cost Management

- [ ] Understand pricing for all services used
- [ ] Set up billing alerts in AWS
- [ ] Monitor usage in AWS Cost Explorer
- [ ] Tag resources appropriately for cost tracking

## Backup and Disaster Recovery

- [ ] S3 versioning enabled (if needed)
- [ ] Backup strategy for user data
- [ ] Recovery plan documented
- [ ] Team knows how to rollback deployment

## Optional but Recommended

- [ ] GitHub Actions workflow configured
- [ ] Staging environment created
- [ ] Custom domain configured
- [ ] SSL certificate configured
- [ ] AWS WAF configured for API protection
- [ ] CloudFront configured for CDN
- [ ] Monitoring dashboard created
- [ ] Error tracking service integrated (e.g., Sentry)

## Sign-off

Once all items are checked:

- Deployed by: ________________
- Date: ________________
- Environment: ________________
- Version: ________________
- Notes: ________________________________________________

---

**Ready to Deploy?**

If all critical items are checked, proceed with:

```bash
amplify publish
```

For issues, refer to the Troubleshooting section in `DEPLOYMENT.md`.
