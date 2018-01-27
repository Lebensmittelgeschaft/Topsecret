import { SecretController } from './secret.controller';
import { secret as SecretModel, ISecret } from './secret.model';
import { Router } from 'express';

export const secretRouter = Router();

// GET requests

/**
 * Get secret/s by query search, default returns all secrets
 * Query search can contains: 
 *  1._id - id of the secret
 */
secretRouter.get('/', async (req, res, next) => {
  const properties: any = {};
  if (req.query._id) properties._id = req.query._id;  
  try {
    const secrets = Object.keys(properties).length === 0 ?
                    await SecretController.getByProps(properties) : 
                    await SecretController.getOneByProps(properties);
    if (secrets) res.json(secrets);  
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }  
});

// POST requests
/**
 * Save new secret
 * Most have parameters: 
 *  secretText - the text of the secret
 *  publisherNickname - the nickname of the secret publisher
 */
secretRouter.post('/', async (req, res, next) => {
  try {
    const secret = new SecretModel(req.body);
    const savedSecret = await SecretController.save(secret);
    if (savedSecret) res.json(savedSecret);
    else res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

// PUT requests
/**
 * Update existing secret
 */
secretRouter.put('/', async (req, res, next) => {
  if (req.body._id) {
    try {
      const secret : Partial<ISecret> = req.body;
      const updatedSecret = await SecretController.update(secret as ISecret);    
      if (updatedSecret) res.json(updatedSecret);
      else res.sendStatus(404);          
    } catch (err) {
      next(err);
    }
  }
  else res.sendStatus(400);  
});

// DELELTE requests
/**
 * Delete existing secret of the requested publisher (publisher can delete only his secrets)
 */
secretRouter.delete('/', async (req, res, next) => {
  // TODO - implement checking of which user is trying to delete and let him
  //        delete only his secrets
  if (req.body._id) {
    try {
      const deletedSecret = await SecretController.deleteById(req.body._id);
      if (deletedSecret) res.json(deletedSecret);      
      else res.sendStatus(404);
    } catch (err) {
      next(err);
    }
  }
  else res.sendStatus(400);
});
