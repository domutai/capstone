// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
    check('email')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isEmail()
      .withMessage(/*'Please provide a valid email.'*/ 'Email is required'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage(/*'Please provide a password.'*/ 'Password is required'),
    handleValidationErrors
  ];

router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { email, password } = req.body;
  
      const user = await User.unscoped().findOne({
        where: { email },
      });

      //added for frontend
      if (!user) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        err.errors = { email: 'The provided email is not registered' }; 
        return next(err);
      }
      //added for frontend
      if (!bcrypt.compareSync(password, user.password)) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        err.errors = { password: 'Incorrect password' }; 
        return next(err);
      }
  
      const safeUser = {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );

  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  router.get(
    '/',
    (req, res) => {
      const { user } = req;
      if (user) {
        const safeUser = {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          role: user.role, 
        };
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );

module.exports = router;