const express = require('express');
require('dotenv').config();

const { PORT } = process.env;

const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const CategoryController = require('./controllers/CategoryController');
const BlogpostController = require('./controllers/BlogpostController');

const app = express();

app.use(express.json());

app.use('/user', UserController);
app.use('/login', LoginController);
app.use('/categories', CategoryController);
app.use('/post', BlogpostController);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

app.get('/', (request, response) => {
  response.send();
});
