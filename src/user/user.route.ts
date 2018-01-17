import { UserController } from 'user/user.controller';
import { user as UserModel, IUser } from 'user/user.model';
import { Router } from 'express';

export const userRouter = Router();

// GET requests

/**
 * Get user/s by query search, default returns all users
 * Query search can contains - 
 *  1.id - id of the user
 *  2.nickname - nickname of the user
 */
userRouter.get('/', async (req, res) => {
  const properties: any = {};
  if (req.query.id) properties.id = req.query.id;
  if (req.query.nickname) properties.nickname = req.query.nickname;
  try {    
    const users = properties === {} ? await UserController.getByProps(properties) :
                                      await UserController.getOneByProps(properties);
    res.json(users);  
  } catch (err) {
    res.status(500).send('Error find user/s');
  }
});

// POST requests

/**
 * Save new user 
 * Most have parameters:
 *  id - id of the user
 *  nickname - nickname of the user
 */
userRouter.post('/', async (req, res) => { 
  try {
    const user = new UserModel(req.body);
    const savedUser = await UserController.save(user);
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
  try {
    const user: Partial<IUser> = req.body;
    const updatedUser = UserController.update(user as IUser);
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
  // TODO - Check if even needed ?
  if (req.body.id) {
    try {
      const deletedUser = UserController.deleteById(req.body.id);
      res.json(deletedUser);
    } catch (err) {
      res.status(500).send('Error deleting user');
    }    
  }
  else res.status(404).send('Id not found');
});
