require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const UserServices = require('../services/UserServices');

const { JWT_SECRET } = process.env;

const login = express.Router();

login.post('/', (req, res) => res.status(200).json({ message: 'It\'s alive!' }));

module.exports = login;
