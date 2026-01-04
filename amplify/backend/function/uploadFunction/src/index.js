const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const BUCKET_NAME = process.env.STORAGE_BUCKET_NAME || 'your-upload-bucket-name';
const REGION = process.env.AWS_REGION || 'us-east-1';

const s3Client = new S3Client({ region: REGION });

exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'GET,OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Generate a unique file name
    const timestamp = Date.now();
    const fileName = `upload-${timestamp}.xml`;
    
    // Create the command for S3 PutObject
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      ContentType: 'application/xml'
    });

    // Generate presigned URL with 5 minute expiration
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        uploadUrl,
        fileName
      })
    };
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to generate presigned URL',
        message: error.message
      })
    };
  }
};
