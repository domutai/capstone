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
    .withMessage('Invalid email'),
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
    // check('role')
    // .exists({ checkFalsy: true })
    // .isIn(['user', 'owner'])
    // .withMessage('Role must be either user or owner.'),
  handleValidationErrors,
];

router.post(
  '/',
  validateSignup,
  async (req, res) => {
    console.log(req.body); // Log the incoming request body
    const { email, password, firstName, lastName, role } = req.body;

    // Check if the email is already in use
    const existingUserByEmail = await User.findOne({ where: { email } });

    if (existingUserByEmail) {
      return res.status(400).json({
        message: 'User already exists',
        errors: {
          email: 'User with that email already exists',
        },
      });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password);

    // Create the user with proper field mapping
    const user = await User.create({
      email,
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      role
    });

    // Return safe user details
    const safeUser = {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role
    };

    await setTokenCookie(res, safeUser);

    return res.status(201).json({
      user: safeUser,
    });
  }
);

router.get('/:userId', requireAuth, async (req, res) => {
  const { userId } = req.params;

  const loggedInUser = req.user;

  if (loggedInUser && loggedInUser.id === parseInt(userId, 10)) {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'first_name', 'last_name', 'email'],
    });

    if (!user) {
      return res.status(200).json({ user: null });
    }

    const safeUser = {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    };

    return res.status(200).json({ user: safeUser });
  }

  return res.status(200).json({
    user: null,
  });
});

// Route to fetch all users
router.get('/', requireAuth, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'first_name'], 
    });

    return res.status(200).json({ Users: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
