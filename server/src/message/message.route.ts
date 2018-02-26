import { MessageController } from './message.controller';
import { message as MessageModel, IMessage, message } from './message.model';
import { Router } from 'express';

export const messageRouter = Router();

// GET methods

/**
 * Get message/s by query search, default returns all messages
 * Query search can contains:
 *  1.sender - the sender of the message
 *  2.receiver - the receiver of the message
 */
messageRouter.get('/', async (req, res, next) => {
  // TODO - check which user trying to get message and let him get only his messages
  const properties: any = {};
  if (req.query.sender) properties.sender = req.query.sender;
  if (req.query.receiver) properties.receiver = req.query.receiver;
  try {    
    const messages = Object.keys(properties).length === 0 ?
                     await MessageController.getByProps(properties) :
                     await MessageController.getOneByProps(properties);
    if (message) res.json(messages);  
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});

// POST methods

/**
 * Save new message
 * Most have parameters:
 *  sender - the sender of the message
 *  receiver - the receiver of the message
 */
messageRouter.post('/', async (req, res, next) => {
  // TODO - check which user trying to post message and let him post only by himself
  try {
    const message = new MessageModel(req.body);
    const savedMessage = await MessageController.save(message);
    if (savedMessage) res.send(savedMessage);
    else res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

// PUT methods

/**
 * Update existing message
 */
messageRouter.put('/', async (req, res, next) => {
  if (req.body._id) {
    try {
      const message: Partial<IMessage> = req.body;
      const updatedMessage = await MessageController.update(message as IMessage);
      if (updatedMessage) res.json(updatedMessage);
      else res.sendStatus(400);      
    } catch (err) {
      next(err);
    }
  } 
  else res.sendStatus(400);
 
});

// Delete methods
/**
 * Delete message by id
 */
messageRouter.delete('/', async (req, res, next) => {
  // TODO - check which user trying to delete and let him delete only his messages
  if (req.body._id) {
    try {
      const deletedMessage = await MessageController.deleteById(req.body._id);
      if (deletedMessage) res.json(deletedMessage);      
      else res.sendStatus(404);
    } catch (err) {
      next(err);
    }
  }
  else res.sendStatus(400);
});
