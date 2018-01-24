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
secretRouter.get('/', async (req, res) => {
  const properties: any = {};
  if (req.query._id) properties.id = req.query._id;  
  try {
    const secrets = properties === {} ? await SecretController.getByProps(properties) : 
                                        await SecretController.getOneByProps(properties);
    if (secrets) res.json(secrets);  
    else res.sendStatus(404);
  } catch (err) {
    res.sendStatus(500);
  }  
});

// POST requests
/**
 * Save new secret
 * Most have parameters: 
 *  secretText - the text of the secret
 *  publisherNickname - the nickname of the secret publisher
 */
secretRouter.post('/', async (req, res) => {
  try {
    const secret = new SecretModel(req.body);
    const savedSecret = await SecretController.save(secret);
    if (savedSecret) res.json(savedSecret);
    else res.sendStatus(400);
  } catch (err) {
    res.status(500).send('Error save secret');
  }
});

// PUT requests
/**
 * Update existing secret
 */
secretRouter.put('/', async (req, res) => {
  try {
    const secret : Partial<ISecret> = req.body;
    if (req.body._id) {
      const updatedSecret = await SecretController.update(secret as ISecret);    
      if (updatedSecret) res.json(updatedSecret);
      else res.sendStatus(400);
    } else {
      res.sendStatus(400);
    }    
  } catch (err) {
    res.sendStatus(500);
  }
});

// DELELTE requests
/**
 * Delete existing secret of the requested publisher (publisher can delete only his secrets)
 */
secretRouter.delete('/', async (req, res) => {
  // TODO - implement checking of which user is trying to delete and let him
  //        delete only his secrets
  if (req.body._id) {
    try {
      const deletedSecret = SecretController.deleteById(req.body._id);
      if (deletedSecret) res.json(deletedSecret);      
      else res.sendStatus(404);
    } catch (err) {
      res.sendStatus(500);
    }
  }
  else res.sendStatus(400);
});
