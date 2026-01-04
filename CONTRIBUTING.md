# Contributing to AWS Amplify React Upload App

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for all.

### Our Standards
- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn
- Git
- AWS Account (for testing)
- AWS Amplify CLI

### Fork and Clone
```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/Fan-Amplify-React.git
cd Fan-Amplify-React

# Add upstream remote
git remote add upstream https://github.com/FanZouGit/Fan-Amplify-React.git
```

### Install Dependencies
```bash
npm install
```

### Set Up Development Environment
```bash
# Initialize Amplify (creates your own backend)
amplify init

# Use a different environment name (e.g., 'dev-yourname')
# This prevents conflicts with other developers

# Deploy your backend
amplify push
```

## Development Workflow

### 1. Create a Branch
```bash
# Update your fork
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Changes

#### Frontend Changes (React)
- Edit files in `src/`
- Test locally: `npm start`
- Keep components small and focused
- Follow React best practices

#### Backend Changes (Amplify)
- Edit configurations in `amplify/backend/`
- Test with: `amplify push`
- Verify in AWS Console

#### Lambda Function Changes
- Edit `amplify/backend/function/uploadFunction/src/index.js`
- Add tests if adding new functionality
- Update dependencies in package.json if needed

### 3. Test Your Changes

#### Local Testing
```bash
# Start development server
npm start

# Run tests (if available)
npm test

# Build production version
npm run build
```

#### Backend Testing
```bash
# Check status
amplify status

# Deploy changes
amplify push

# Test API
curl -H "Authorization: YOUR_TOKEN" \
  https://YOUR_API_ENDPOINT/generate-presigned-url
```

### 4. Commit Changes

#### Commit Message Format
Follow conventional commits:
```
type(scope): subject

body (optional)

footer (optional)
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```bash
git commit -m "feat(upload): add file size validation"
git commit -m "fix(auth): resolve token refresh issue"
git commit -m "docs(readme): update installation instructions"
```

### 5. Push and Create Pull Request
```bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# Fill out the PR template
```

## Coding Standards

### JavaScript/React
- Use ES6+ syntax
- Use functional components with hooks
- Use arrow functions for inline functions
- Use async/await instead of promises chains
- Add PropTypes or TypeScript types

**Example**:
```javascript
import React, { useState } from 'react';

const MyComponent = ({ title, onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = async () => {
    try {
      await onSubmit(value);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <input 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MyComponent;
```

### Lambda Functions (Node.js)
- Use async/await
- Add error handling
- Return proper HTTP status codes
- Include CORS headers
- Log errors with context

**Example**:
```javascript
exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  };

  try {
    // Your logic here
    const result = await someAsyncOperation();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ result })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

### CloudFormation Templates
- Use descriptive resource names
- Add comments for complex logic
- Follow AWS best practices
- Include all necessary permissions

### Documentation
- Update README.md for user-facing changes
- Update DEPLOYMENT.md for deployment changes
- Update ARCHITECTURE.md for architectural changes
- Add inline comments for complex code
- Update API documentation

## Submitting Changes

### Pull Request Process

1. **Update Documentation**: Ensure all relevant docs are updated
2. **Test Thoroughly**: Test locally and in AWS
3. **Write Good Description**: Explain what and why
4. **Reference Issues**: Link related issues (e.g., "Fixes #123")
5. **Request Review**: Tag appropriate reviewers
6. **Address Feedback**: Respond to review comments

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Tested in AWS
- [ ] Added/updated tests

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass
```

### Review Process
1. Automated checks run (build, tests)
2. Maintainers review code
3. Feedback and discussion
4. Approval required before merge
5. Squash and merge to main

## Reporting Issues

### Bug Reports
Include:
- **Description**: Clear description of the bug
- **Steps to Reproduce**: Detailed steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: 
  - OS
  - Node.js version
  - Amplify CLI version
  - Browser (if applicable)
- **Logs**: Error messages, stack traces
- **Screenshots**: If applicable

**Template**:
```markdown
**Bug Description**
A clear description of the bug

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen

**Screenshots**
If applicable

**Environment**
- OS: [e.g., macOS 12.0]
- Node: [e.g., 18.15.0]
- Amplify CLI: [e.g., 12.0.0]
- Browser: [e.g., Chrome 110]

**Additional Context**
Any other relevant information
```

### Feature Requests
Include:
- **Problem**: What problem does this solve?
- **Solution**: Proposed solution
- **Alternatives**: Other solutions considered
- **Benefits**: Why this would be valuable

## Development Tips

### Useful Commands
```bash
# Check code style (if linter configured)
npm run lint

# Format code (if prettier configured)
npm run format

# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# View Amplify status
amplify status

# View CloudFormation stacks
amplify console
```

### Testing Strategies
1. **Unit Tests**: Test individual functions
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test complete user flows
4. **Manual Testing**: Test in actual AWS environment

### Debugging
```bash
# Enable Amplify debug mode
export DEBUG=*

# View Lambda logs in real-time
amplify console function

# Test Lambda locally (if configured)
amplify mock function uploadFunction
```

## Questions?

- Open an issue for questions
- Join community discussions
- Check documentation first

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing! 🎉
