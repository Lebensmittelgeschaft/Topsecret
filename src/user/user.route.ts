import { UserController } from 'user/user.controller';
import { user as UserModel } from 'user/user.model';
import { Router } from 'express';

export const userRouter = Router();

// GET requests

/**
 * Get users by query search, default returns all users
 */
userRouter.get('/', async (req, res) => {
  const properties: any = {};
  if (req.query.id) properties.id = req.query.id;
  if (req.query.nickname) properties.nickname = req.query.nickname;
  const users = await UserController.getUsersByProps(properties);
  res.json(users);  
});

// POST requests

/**
 * Save new user 
 */
userRouter.post('/', async (req, res) => {  
  const user = new UserModel(req.body);
  UserController.saveUser(user)  
  .catch((err) => {
    console.log(err);
    res.status(500);
  });
});

// PUT requests

/**
 * Update existing user
 */
userRouter.put('/', async (req, res) => {  
  
});

// DELETE requests


