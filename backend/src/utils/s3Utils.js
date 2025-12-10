import { s3 } from '../config/awsConfig.js';
import { AWS_BUCKET_NAME } from '../config/serverConfig.js';

export const uploadToS3 = async (fileBuffer, fileName = 'signed-pdf.pdf') => {
  try {
    const key = `signed-pdfs/${Date.now()}-${fileName}`;
    
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: 'application/pdf',
    };

    const uploadResult = await s3.upload(params).promise();
    const s3Url = uploadResult.Location || `https://${AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return s3Url;
  } catch (error) {
    console.error('S3 upload error:', error.message);
    throw new Error(`Failed to upload to S3: ${error.message}`);
  }
};

export default { uploadToS3 };

