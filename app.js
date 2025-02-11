const express = require('express');
const morgan = require('morgan');
const app = express();
const router = require('./routes/router');

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use('/'), router;
