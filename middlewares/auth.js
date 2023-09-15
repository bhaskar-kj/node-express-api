const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).json({ status: 'failed', message: 'Unauthorized User, No Token' });
  }

  const token = authorization.split(' ')[1];

  try {
    const user = jwt.verify(token, 'feiwedmrvdwb');
    req.userId = user.id;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ status: 'failed', message: 'Token has expired' });
    }
    return res.status(401).json({ status: 'failed', message: 'Unauthorized User' });
  }
};

module.exports = userAuth;
