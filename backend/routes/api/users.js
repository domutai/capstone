const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Invalid email' /*'Please provide a valid email.'*/),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName') 
      .exists({ checkFalsy: true })
      .withMessage('First name is required.'),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Last name is required.'),
    handleValidationErrors
  ];

router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, firstName, lastName } = req.body;

      const existingUserByEmail = await User.findOne({ where: { email } });

      if (existingUserByEmail) {
        return res.status(400).json({
          message: 'User already exists',
          errors: {
            email: existingUserByEmail ? 'User with that email already exists' : null,
          }
        });
      }

      const hashedPassword = bcrypt.hashSync(password);

      const user = await User.create({ 
        email, hashedPassword, firstName, lastName
     });
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.status(201).json({
        user: safeUser
      });
    }
  );

 
  router.get('/:userId', requireAuth, async (req, res) => {
    const { userId } = req.params;
  
      const loggedInUser = req.user; 
  
      if (loggedInUser && loggedInUser.id === parseInt(userId)) {
        const user = await User.findByPk(userId, {
          attributes: 
            ['id', 'firstName', 'lastName', 'email']
      });
  
        if (!user) {
          return res.status(200).json({ user: null });
        }
  
        const safeUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
  
        return res.status(200).json({ user: safeUser });
      }
  
      return res.status(200).json({
        user: null, 
      });
  
    });
  

//Added during frontend to put first names in reviews
// Route to fetch all users
router.get('/', requireAuth, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName'], // Only fetch the required fields
    });

    return res.status(200).json({ Users: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;