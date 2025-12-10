import { s3 } from '../config/awsConfig.js';
import { AWS_BUCKET_NAME } from '../config/serverConfig.js';

export const uploadToS3 = async (fileBuffer, fileName = 'signed-pdf.pdf') => {
  try {
    console.log('S3 Upload starting...');
    console.log('Bucket:', AWS_BUCKET_NAME);
    console.log('Region:', process.env.AWS_REGION);
    console.log('File size:', fileBuffer.length);
    
    const key = `signed-pdfs/${Date.now()}-${fileName}`;
    
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: 'application/pdf',
    };

    console.log('S3 params:', { Bucket: params.Bucket, Key: params.Key, Size: params.Body.length });
    
    const uploadResult = await s3.upload(params).promise();
    console.log('S3 upload successful:', uploadResult.Location);
    
    const s3Url = uploadResult.Location || `https://${AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    console.log('Returning S3 URL:', s3Url);
    return s3Url;
  } catch (error) {
    console.error('S3 upload error details:', {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      requestId: error.requestId
    });
    throw new Error(`Failed to upload to S3: ${error.message}`);
  }
};

export default { uploadToS3 };

