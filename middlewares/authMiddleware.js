const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Periksa apakah header Authorization tersedia
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Authorization header is missing' });
  }

  // Token diambil dari header (format: Bearer <token>)
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token is missing' });
  }

  try {
    // Verifikasi token menggunakan secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan payload token (misalnya, user ID) ke req.user
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = authenticateJWT;
