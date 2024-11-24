// controllers/uploadController.js
const multer = require('multer');
const { Upload } = require('@aws-sdk/lib-storage');
const s3Client = require("../config/aws.js")
require('dotenv').config(); 

// Konfigurasi Multer untuk menerima file
const storage = multer.memoryStorage(); // Penyimpanan di memory sebelum diupload ke Spaces
const upload = multer({ storage }).single('coverImage'); // 'coverImage' adalah nama field di form

// Fungsi untuk upload cover image ke DigitalOcean Space
const uploadCoverImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Upload failed', error: err.message });
    }

    const params = {
      Bucket: process.env.AWS_BUCKET, // Nama bucket
      Key: `courses/${Date.now()}-${req.file.originalname}`, // Penamaan file di dalam bucket (berikut timestamp untuk menghindari duplikasi)
      Body: req?.file?.buffer, // File yang diupload
      ACL: 'public-read', // Agar file bisa diakses publik
      ContentType: req?.file?.mimetype, // Jenis konten (misalnya image/png)
    };
    try {
      
       // Menggunakan Upload untuk menangani file upload
       const upload = new Upload({
        client: s3Client,
        params: params,
        leavePartsOnError: false, // Menghapus file yang gagal diupload
      });
      
      await upload.done();
      const fileUrl = `${process.env.AWS_ENDPOINT}/${params.Key}`;
      return res.status(200).json({
        message: 'File uploaded successfully',
        fileUrl: fileUrl
      });
    } catch (uploadErr) {
      console.error('Error uploading file:', uploadErr);
      return res.status(500).json({ message: 'Error uploading file', error: uploadErr.message });
    }
  });
};

module.exports = { uploadCoverImage };
