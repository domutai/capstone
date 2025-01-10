const express = require('express');
require('dotenv').config();
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
  app.use(cors());
}

app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "http://localhost:8000"], // Allow scripts from your local server
        connectSrc: ["'self'", "http://localhost:8000"], // Allow connections to your local server
        imgSrc: ["'self'", "data:", "https:"], // Allow images from self, data URIs, and HTTPS URLs
        styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for now (if necessary)
        fontSrc: ["'self'", "https:"], // Allow fonts from self and HTTPS URLs
      },
    })
  );

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

const routes = require('./routes');
app.use(routes);

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    /*err.title = "Resource Not Found";*/
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
  });

  const { ValidationError } = require('sequelize');

  // Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
      }
     /* err.title = 'Validation error';*/
      err.errors = errors;
    }
    next(err);
  });

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      /*title: err.title || 'Server Error',*/
      message: err.message,
      errors: err.errors,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
  });

module.exports = app;
