require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const Auth = require('./Auth');
const UserServices = require('../services/UserServices');

const { JWT_SECRET } = process.env;

const SERVER_ERROR = 'Server error, try again in a few minutes';

const user = express.Router();

function validateDisplayName(req, res, next) {
  const { displayName } = req.body;
  const validation = UserServices.validateDisplayName(displayName);
  if (validation) {
    return res.status(validation.status).json({ message: validation.message });
  }
  next();
}

function validateEmail(req, res, next) {
  const { email } = req.body;
  
  if (!email) return res.status(400).json({ message: '"email" is required' });

  const validation = UserServices.validateEmail(email);
  if (validation) {
    return res.status(validation.status).json({ message: validation.message });
  }

  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: '"password" is required' });

  const validation = UserServices.validatePassword(password);
  if (validation) {
    return res.status(validation.status).json({ message: validation.message });
  }

  next();
}

async function verifyExistingEmail(req, res, next) {
  try {
    const { email } = req.body;

    const validation = await UserServices.verifyExistingEmail(email);
    if (validation) {
      return res.status(validation.status).json({ message: validation.message });
    }

    next();
  } catch ({ message }) {
    console.log(message);
    return res.status(500).json({ message: SERVER_ERROR });
  }
}

async function create(req, res) {
  try {
    const userData = req.body;

    const userCreated = await UserServices.create(userData);
    const payload = { email: userCreated.email, id: userCreated.id };
    
    const token = jwt.sign(payload, JWT_SECRET);

    return res.status(201).json({ token });
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ message: SERVER_ERROR });
  }
}

async function getAll(_req, res) {
  try {
    const users = await UserServices.getAll();

    return res.status(200).json(users);
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ message: SERVER_ERROR });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;

    const userById = await UserServices.getById(id);
    if (!userById) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(userById);
  } catch ({ message }) {
    console.error({ message });
    return res.status(500).json({ message: SERVER_ERROR });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.user;
    await UserServices.deleteUser(id);
    return res.status(204).json();
  } catch ({ message }) {
    console.error({ message });
    return res.status(500).json({ message: SERVER_ERROR });
  }
}

user.post('/',
  validateDisplayName,
  validateEmail,
  validatePassword,
  verifyExistingEmail,
  create)
.get('/:id',
  Auth,
  getById)
.get('/',
  Auth,
  getAll)
.delete('/me',
  Auth,
  deleteUser);

module.exports = user;
