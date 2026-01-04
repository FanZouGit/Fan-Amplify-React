# Architecture Overview

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         AWS Cloud                               │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   Amplify Hosting                         │  │
│  │              (Static Website Hosting)                     │  │
│  │                                                           │  │
│  │  ┌────────────────────────────────────────────┐          │  │
│  │  │         React Application                  │          │  │
│  │  │  - User Authentication UI                  │          │  │
│  │  │  - File Upload Component                   │          │  │
│  │  │  - Amplify UI Components                   │          │  │
│  │  └────────────────────────────────────────────┘          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              │ HTTPS                            │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Amazon Cognito                              │  │
│  │  - User Pool (Authentication)                            │  │
│  │  - Identity Pool (AWS Credentials)                       │  │
│  │  - Email Verification                                    │  │
│  │  - Password Management                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              │ JWT Token                        │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              API Gateway (REST API)                      │  │
│  │  - /generate-presigned-url endpoint                      │  │
│  │  - CORS Configuration                                    │  │
│  │  - Request/Response Mapping                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              │ Invoke                           │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          AWS Lambda Function                             │  │
│  │  - Runtime: Node.js 18.x                                 │  │
│  │  - Generates S3 Presigned URLs                           │  │
│  │  - Validates requests                                    │  │
│  │  - 5-minute expiration                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              │ S3 Client                        │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Amazon S3 Bucket                            │  │
│  │  - Stores uploaded XML files                             │  │
│  │  - CORS enabled                                          │  │
│  │  - Versioning (optional)                                 │  │
│  │  - Lifecycle policies (optional)                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              CloudWatch Logs                             │  │
│  │  - Lambda execution logs                                 │  │
│  │  - API Gateway access logs                               │  │
│  │  - Error tracking                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              IAM Roles & Policies                        │  │
│  │  - Lambda Execution Role                                 │  │
│  │  - Cognito Auth/Unauth Roles                             │  │
│  │  - S3 Access Policies                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Authentication Flow
```
User → React App → Cognito User Pool → Email Verification → User Authenticated
                                                              ↓
                                                        JWT Token Issued
```

### 2. File Upload Flow
```
1. User selects file in React App
2. React App requests presigned URL from API Gateway (with JWT token)
3. API Gateway validates token and invokes Lambda
4. Lambda generates presigned S3 URL (5-min expiration)
5. Lambda returns presigned URL to React App
6. React App uploads file directly to S3 using presigned URL
7. S3 confirms upload success
8. React App displays success message
```

## Components

### Frontend (React)
- **Technology**: React 18.x with Create React App
- **UI Framework**: AWS Amplify UI Components
- **State Management**: React Hooks (useState)
- **Authentication**: AWS Amplify Auth library
- **API Calls**: Fetch API with Amplify Auth tokens

### Backend Services

#### 1. Amazon Cognito
- **User Pool**: Manages user directory and authentication
- **Identity Pool**: Provides temporary AWS credentials
- **Features**:
  - Email-based signup
  - Email verification
  - Password policy enforcement
  - JWT token generation

#### 2. API Gateway
- **Type**: REST API
- **Endpoint**: `/generate-presigned-url`
- **Authorization**: Cognito User Pool (JWT)
- **Features**:
  - Request validation
  - CORS enabled
  - Lambda proxy integration

#### 3. AWS Lambda
- **Runtime**: Node.js 18.x
- **Memory**: 256 MB
- **Timeout**: 25 seconds
- **Dependencies**: 
  - @aws-sdk/client-s3
  - @aws-sdk/s3-request-presigner
- **Permissions**: S3 PutObject, GetObject, DeleteObject

#### 4. Amazon S3
- **Bucket Purpose**: Store uploaded files
- **Access Control**: IAM policies + Presigned URLs
- **CORS**: Enabled for web uploads
- **Features**:
  - Secure file storage
  - Direct upload from browser
  - Optional versioning

## Security Architecture

### Authentication & Authorization
1. **User Authentication**: Cognito User Pool with email verification
2. **API Authorization**: JWT tokens from Cognito
3. **AWS Credentials**: Temporary credentials from Identity Pool
4. **S3 Access**: Time-limited presigned URLs (5 minutes)

### Network Security
1. **HTTPS Only**: All communication over TLS
2. **CORS**: Configured on API Gateway and S3
3. **API Gateway**: Rate limiting and throttling
4. **Private Lambda**: No direct internet access needed

### Data Protection
1. **Encryption in Transit**: TLS 1.2+
2. **Encryption at Rest**: S3 server-side encryption
3. **Access Logging**: CloudWatch Logs
4. **IAM Policies**: Least privilege principle

## Scalability

### Automatic Scaling
- **Lambda**: Concurrent executions scale automatically
- **API Gateway**: Handles thousands of requests per second
- **Cognito**: Scales to millions of users
- **S3**: Unlimited storage capacity
- **Amplify Hosting**: Global CDN distribution

### Performance Optimizations
- **Lambda Cold Start**: < 1 second with Node.js
- **Presigned URLs**: Direct S3 upload bypasses API
- **Static Hosting**: CDN-cached React assets
- **Regional Services**: Low latency access

## Cost Optimization

### Free Tier Usage
- **Cognito**: 50,000 MAUs free
- **Lambda**: 1M requests/month free
- **API Gateway**: 1M API calls/month free
- **S3**: 5GB storage, 20K GET, 2K PUT free
- **Amplify Hosting**: 1000 build minutes/month free

### Cost-Effective Practices
- **Lambda Memory**: Right-sized at 256 MB
- **S3 Lifecycle**: Optional policies for old files
- **CloudWatch Logs**: Retention policies
- **On-Demand Scaling**: Pay only for usage

## Monitoring & Logging

### CloudWatch Metrics
- Lambda invocation count and duration
- API Gateway request count and latency
- S3 storage metrics
- Cognito authentication metrics

### CloudWatch Logs
- Lambda execution logs
- API Gateway access logs
- Application error logs

### Alarms (Recommended)
- Lambda error rate > 5%
- API Gateway 5xx errors
- S3 upload failures
- High Lambda duration

## Disaster Recovery

### Backup Strategy
- **S3 Versioning**: Enable for file recovery
- **CloudFormation**: Infrastructure as Code
- **Amplify CLI**: Backend configuration in Git
- **Cognito Users**: Regular exports (if needed)

### Recovery Procedures
1. **Infrastructure**: Redeploy with `amplify push`
2. **Code**: Redeploy with `amplify publish`
3. **Configuration**: Restore from Git repository
4. **Data**: Restore from S3 versioning or backups

## Future Enhancements

### Potential Improvements
- [ ] Multi-region deployment
- [ ] CloudFront CDN for S3
- [ ] DynamoDB for file metadata
- [ ] SQS for async processing
- [ ] SNS for notifications
- [ ] Step Functions for workflows
- [ ] Cognito MFA
- [ ] Custom domain with Route 53
- [ ] AWS WAF for API protection
- [ ] X-Ray for distributed tracing
