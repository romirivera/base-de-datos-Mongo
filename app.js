const express = require('express');
const morgan = require('morgan');
const cookies = require('cookie-parser');
const app = express();
const router = require('./routes/router');

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookies());
app.use('/', router);
