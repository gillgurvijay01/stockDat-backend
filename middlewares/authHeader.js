// Middleware to check the jwt
const jwt = require('jsonwebtoken');

 function verifyToken(req, res, next) {
  let token = req.headers.authorization;
  token = token.split(" ")[1]
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) =>  {
    if (err) {
   return res.status(401).json({ message: 'Invalid token' });
    }
    email = decoded.email
    req.userMail = decoded; // Attach the user information to the request object
    next();
  });
}

module.exports = verifyToken;
