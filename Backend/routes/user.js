import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import User from '../models/USER.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found')
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/edit', auth, [
  body('FirstName').not().isEmpty().withMessage('First name is required').trim().escape(),
  body('MiddleName').not().trim().escape(),
  body('LastName').not().isEmpty().withMessage('Last name is required').trim().escape(),
  body('Email').isEmail().withMessage('Invalid email address').normalizeEmail(),
  body('UserName').not().isEmpty().withMessage('User name is required').trim().escape(),
  body('Age').isInt({ min: 1 }).withMessage('Age must be a positive number'),
  body('Contact_Number').not().isEmpty().withMessage('Contact number is required').isMobilePhone().withMessage('Invalid contact number format').trim().escape(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { FirstName, MiddleName, LastName, Email, UserName, Age, Contact_Number} = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.FirstName = FirstName;
    user.MiddleName = MiddleName;
    user.LastName = LastName;
    user.Email = Email;
    user.UserName = UserName;
    user.Age = Age;
    user.Contact_Number = Contact_Number;

    await user.save();

    const token = user.genToken();
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;