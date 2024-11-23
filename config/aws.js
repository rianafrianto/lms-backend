const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();  // Memuat variabel lingkungan dari .env

// Membuat instance S3Client untuk DigitalOcean Spaces
const s3 = new S3Client({
  endpoint: process.env.AWS_ENDPOINT,  // Masukkan endpoint DigitalOcean Spaces langsung di sini
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

module.exports = s3;
