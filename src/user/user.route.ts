import { UserController } from 'user/user.controller';
import { user as UserModel, IUser } from 'user/user.model';
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
  try {
    const users = await UserController.getUsersByProps(properties);
    res.json(users);  
  } catch (err) {
    res.status(500).send('Error find user/s');
  }
});

// POST requests

/**
 * Save new user 
 */
userRouter.post('/', async (req, res) => {  
  const user = new UserModel(req.body);
  try {
    const savedUser = await UserController.saveUser(user);
    res.send(savedUser);
  } catch (err) {
    res.status(500).send('Error saving user');
  }
});

// PUT requests

/**
 * Update existing user
 */
userRouter.put('/', async (req, res) => {  
  const updateUser: Partial<IUser> = req.body;
  try {
    const updatedUser = UserController.updateUser(updateUser as IUser);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send('Error updating user');
  }
});

// DELETE requests

/**
 * Delete user by id
 */
userRouter.delete('/', async (req, res) => {
  if (req.body.id) {
    try {
      const deleteUser = UserController.deleteUser(req.body.id);
      res.json(deleteUser);
    } catch (err) {
      res.status(500).send('Error deleting user');
    }
    
  }
  else res.status(404).send('Id not found');
});
