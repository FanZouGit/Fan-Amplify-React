#!/bin/bash

# Setup Verification Script for AWS Amplify React Upload App
# This script checks if all prerequisites are met before deployment
# Note: Does NOT use 'set -e' so all checks run even if some fail

echo "🔍 Checking AWS Amplify React Upload App Prerequisites..."
echo ""

# Track if any checks fail
FAILED=0

# Check Node.js version
echo "Checking Node.js version..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
    echo "✅ Node.js found: $(node -v)"
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo "⚠️  Warning: Node.js 18.x or later is recommended"
    fi
else
    echo "❌ Node.js not found. Please install Node.js 18.x or later"
    FAILED=1
fi
echo ""

# Check npm
echo "Checking npm..."
if command -v npm &> /dev/null; then
    echo "✅ npm found: $(npm -v)"
else
    echo "❌ npm not found. Please install npm"
    FAILED=1
fi
echo ""

# Check AWS CLI (optional but recommended)
echo "Checking AWS CLI (optional)..."
if command -v aws &> /dev/null; then
    echo "✅ AWS CLI found: $(aws --version | cut -d ' ' -f 1)"
else
    echo "⚠️  AWS CLI not found (optional, but recommended)"
fi
echo ""

# Check Amplify CLI
echo "Checking Amplify CLI..."
if command -v amplify &> /dev/null; then
    echo "✅ Amplify CLI found: $(amplify --version 2>&1 | head -1)"
else
    echo "❌ Amplify CLI not found"
    echo "   Install with: npm install -g @aws-amplify/cli"
    FAILED=1
fi
echo ""

# Check if dependencies are installed
echo "Checking project dependencies..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules directory exists"
else
    echo "⚠️  node_modules not found. Run 'npm install' to install dependencies"
fi
echo ""

# Check if aws-exports.js exists
echo "Checking aws-exports.js..."
if [ -f "src/aws-exports.js" ]; then
    # Check if it contains placeholder values
    if grep -q "EXAMPLE" src/aws-exports.js; then
        echo "⚠️  aws-exports.js exists but contains placeholder values"
        echo "   Run 'amplify push' to generate actual configuration"
    else
        echo "✅ aws-exports.js configured"
    fi
else
    echo "⚠️  aws-exports.js not found"
    echo "   This file will be generated after running 'amplify push'"
fi
echo ""

# Check Amplify initialization
echo "Checking Amplify initialization..."
if [ -f "amplify/.config/local-env-info.json" ]; then
    echo "✅ Amplify project initialized"
else
    echo "⚠️  Amplify not initialized"
    echo "   Run 'amplify init' to initialize the project"
fi
echo ""

# Summary
echo "================================================"
if [ $FAILED -eq 0 ]; then
    echo "✅ All critical prerequisites are met!"
    echo ""
    echo "Next steps:"
    echo "1. Run 'npm install' if you haven't already"
    echo "2. Run 'amplify init' to initialize your Amplify project"
    echo "3. Run 'amplify push' to deploy backend resources"
    echo "4. Run 'npm start' to test locally"
    echo "5. Run 'amplify publish' to deploy to AWS"
    echo ""
    echo "For detailed instructions, see DEPLOYMENT.md"
else
    echo "❌ Some prerequisites are missing. Please install them before proceeding."
fi
echo "================================================"

exit $FAILED
