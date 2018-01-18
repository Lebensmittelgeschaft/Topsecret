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
    res.json(secrets);  
  } catch (err) {
    res.status(500).send('Error find secret/s');
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
    res.json(savedSecret);
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
    const updatedSecret = await SecretController.update(secret as ISecret);
    res.json(updatedSecret);
  } catch (err) {
    res.status(500).send('Error update secret');
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
      res.json(deletedSecret);      
    } catch (err) {
      res.status(500).send('Error deleting secret');
    }
  }
  else res.status(404).send('Id not found');
});
