import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();




export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    
    jwt.verify(token, secretKey, (err, decodedUser) => {
      if (err) {
        return res.sendStatus(403); 
      }
      req.user = {


        _id: decodedUser._id || null, // Default to null if missing
        username: decodedUser.username || 'Unknown User',
      };
      console.log('🔹 Authenticated User:', req.user);

      // req.user = user as JwtPayload(username, email, password);
      return next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

export const signToken = (username, email, _id) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '2h' });
};
