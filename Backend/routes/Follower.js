import express from 'express';
import User from '../models/USER.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/remove/:userid', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found')
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // remove follower from this user's followers list
    const follower = await User.findById(req.params.userid);
    if (!follower) {
      console.log('Follower not found')
      return res.status(404).json({ msg: 'Follower not found' });
    }
    const index = user.Followers.findIndex(follower => follower.userid == req.params.userid);
    if (index > -1) {
      user.Followers.splice(index, 1);
    }
    await user.save();
    
    // remove this user from follower's following list
    const index2 = follower.Following.findIndex(following => following.userid == req.user.id);
    if (index2 > -1) {
      follower.Following.splice(index2, 1);
    }
    await follower.save();
    
    res.status(200).json(user);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


export default router;