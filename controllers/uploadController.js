// controllers/uploadController.js
const multer = require('multer');
const s3 = require('../config/aws.js');
const { PutObjectCommand } = require('@aws-sdk/client-s3'); // Menggunakan require di sini

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
      Bucket: 'kiqs-micro', // Nama bucket
      Key: `courses/${Date.now()}-${req?.file?.originalname}`, // Penamaan file di dalam bucket (berikut timestamp untuk menghindari duplikasi)
      Body: req?.file?.buffer, // File yang diupload
      ACL: 'public-read', // Agar file bisa diakses publik
      ContentType: req?.file?.mimetype, // Jenis konten (misalnya image/png)
    };

    try {
      // Menggunakan PutObjectCommand untuk upload file ke DigitalOcean Spaces
      const command = new PutObjectCommand(params);
      const data = await s3.send(command);

      return res.status(200).json({
        message: 'File uploaded successfully',
        fileUrl: `${process.env.AWS_ENDPOINT}/${params.Key}`, // URL file yang sudah diupload
      });
    } catch (uploadErr) {
      console.error('Error uploading file:', uploadErr);
      return res.status(500).json({ message: 'Error uploading file', error: uploadErr.message });
    }
  });
};

module.exports = { uploadCoverImage };
