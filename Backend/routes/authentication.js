import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/USER.js';

const router = express.Router();

router.post('/SignUp', [
  body('FirstName').not().isEmpty().withMessage('First name is compulsory').trim(),
  body('MiddleName').trim(),
  body('LastName').not().isEmpty().withMessage('Last name is compulsory').trim(),
  body('Email').isEmail().withMessage('Invalid email address').normalizeEmail(),
  body('UserName').not().isEmpty().withMessage('User name is compulsory').trim().escape(),
  body('Age').isInt({ min: 13, max: 100 }).withMessage('Age must be a number between 13 and 100'),
  body('Contact_Number').not().isEmpty().withMessage('Contact number is compulsory').isMobilePhone().withMessage('Invalid contact number format').trim().escape(),
  body('Password').isLength({ min: 4 }).withMessage('Password must be greater than 4 characters').trim().escape()
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { FirstName, MiddleName, LastName, Email, UserName, Age, Contact_Number, Password } = req.body;

    try {
      let user = await User.findOne({ UserName });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Sorry, this Username belongs to someone else' }] });
      }

      user = new User({ FirstName, MiddleName, LastName, Email, UserName, Age, Contact_Number, Password });

      const salt = await bcrypt.genSalt();
      user.Password = await bcrypt.hash(Password, salt);

      await user.save();

      const token = user.genToken();
      res.status(201).json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


router.post('/Login', [
  body('UserName').not().isEmpty().withMessage('User name is a compulsory field').trim().escape(),
  body('Password').isLength({ min: 4 }).withMessage('Password must be greater than 4 characters').escape()
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { UserName, Password } = req.body;
    
    try {
      const user = await User.findOne({ UserName });
      if (!user) {
        return res.status(400).json({ message: "Username does not exist" });
      }
    //   console.log("User: ", user)
    //   console.log("Password: ", Password)
      const isMatch = await user.checkPassword(Password); 
      if (!isMatch) {
        return res.status(401).json({ message: "Wrong password for given username" });
      }
      
      const token = user.genToken();
      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  }

)

export default router;