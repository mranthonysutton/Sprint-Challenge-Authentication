/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
  */

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const {authorization} = req.headers;

  if (authorization) {
    const secret = process.env.JWT_SECRET || 'secretkey';

    jwt.verify(authorization, secret, function(error, validToken) {
      if (error) {
        res.status(401).json({error: 'Invalid token.'});
      } else {
        req.token = validToken;
        next();
      }
    });
  } else {
    res.status(401).json({you: 'shall not pass!'});
  }
};
