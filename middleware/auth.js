const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.header('Authorization');
  const token = authHeader?.split(' ')[1]; // Extract token after "Bearer "

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. Token not provided.' 
    });
  }

  try {
    // First try to verify with JWT_SECRET from .env
    let verified;
    try {
      verified = jwt.verify(token, process.env.JWT_SECRET);
    } catch (envError) {
      // If JWT_SECRET verification fails, try with hardcoded secret (for existing code)
      verified = jwt.verify(token, '17d0ff32c98f397d6cf5dc569acf1d45f89321b1983a8003a29b38d8819107fa41624e69b1612a4774fa2a58c68e406d4b8648b81bc01c4071e01dd1c2121389');
    }

    // Attach user data to request
    req.user = verified;
    req.userData = verified; // For compatibility with existing code

    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token.' 
    });
  }
};

module.exports = authMiddleware;