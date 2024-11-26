const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();  // Memuat variabel lingkungan dari .env

// Membuat instance S3Client untuk DigitalOcean Spaces
const s3 = new S3Client({
  endpoint: process.env.BUCKET_ENDPOINT,  // Masukkan endpoint DigitalOcean Spaces langsung di sini
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_KEY,
  },
});

module.exports = s3;
