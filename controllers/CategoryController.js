require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const Auth = require('./Auth');

const { JWT_SECRET } = process.env;

const category = express.Router();

module.exports = category;
