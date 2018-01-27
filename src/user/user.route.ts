import { UserController } from './user.controller';
import { user as UserModel, IUser } from './user.model';
import { Router } from 'express';
import * as mongoose from 'mongoose';

export const userRouter = Router();

// GET requests

/**
 * Get user/s by query search, default returns all users
 * Query search can contains - 
 *  1._id - id of the user
 *  2.nickname - nickname of the user
 */
userRouter.get('/', async (req, res, next) => {
  const properties: any = {};
  if (req.query._id) properties._id = req.query._id;
  if (req.query.nickname) properties.nickname = req.query.nickname;
  try {    
    const users = Object.keys(properties).length === 0 ?
                  await UserController.getByProps(properties) :
                  await UserController.getOneByProps(properties);
    if (users) res.json(users);
    else res.sendStatus(404);    
  } catch (err) {
    next(err);
  }
});

// POST requests

/**
 * Save new user 
 * Most have parameters:
 *  id - id of the user
 *  nickname - nickname of the user
 */
userRouter.post('/', async (req, res, next) => { 
  try {    
    const user = new UserModel(req.body);
    const savedUser = await UserController.save(user);
    console.log(savedUser);
    if (savedUser) res.send(savedUser);
    else res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

// PUT requests

/**
 * Update existing user
 */
userRouter.put('/', async (req, res, next) => {
  if (req.body._id) {
    try {
      const user: Partial<IUser> = req.body;      
      const updatedUser = await UserController.update(user as IUser);
      if (updatedUser) res.json(updatedUser);
      else res.sendStatus(404);        
    } catch (err) {
      next(err);
    }
  }
  else res.sendStatus(400);  
});

// DELETE requests

/**
 * Delete user by id
 */
userRouter.delete('/', async (req, res, next) => {
  // TODO - Check if even needed ?
  if (req.body._id) {    
    try {
      const deletedUser = await UserController.deleteById(req.body._id);
      if (deletedUser) res.json(deletedUser);
      else res.sendStatus(404);
    } catch (err) {
      next(err);
    }    
  }
  else res.sendStatus(400);
});
