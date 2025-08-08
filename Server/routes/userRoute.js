import express from 'express';
import { register, login, logout, isAuth } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

// Register route
userRouter.post('/register', register);

// Login route
userRouter.post('/login', login);

// check auth route
userRouter.get('/is-auth',authUser, isAuth);

// logout route
userRouter.get('/logout',authUser, logout);

userRouter.get('/ping', (req, res) => {
  res.send('✅ User route is working');
});

export default userRouter;
