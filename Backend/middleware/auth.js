import jwt from 'jsonwebtoken';

export default function auth (req, res, next) {
    // console.log("req",req)
  const token = req.header('x-auth-token');
//   console.log("token",token)
  if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEYS);
    req.user = decoded.user;
    next();
  }
  catch (err) {
    res.status(400).send('Invalid token.');
  }
}