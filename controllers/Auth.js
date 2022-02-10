const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const { User } = require('../models');

async function Auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const data = jwt.verify(authorization, JWT_SECRET);

    const user = await User.findByPk(data.id);

    if (!user) return res.status(401).json({ message: 'Expired or invalid token' });

    req.user = user;

    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}

module.exports = Auth;
