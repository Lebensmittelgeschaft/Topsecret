import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { config } from './config';

const app = express();

// Attaching node promise to the mongoose promise
(<any>mongoose).Promise = global.Promise;

mongoose.connect(config.MONGOURI, { useMongoClient: true } ,(err) => {
  if (err) {
    console.error(err);
    process.exit();
  }
  console.log('MongoDB Connection Established');
});

app.set('port', config.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger(process.env.NODE_ENV || 'dev'));

export default app;
