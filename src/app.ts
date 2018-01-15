import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { config } from './config';

const app = express();

mongoose.connect(config.MONGOURI, { useMongoClient: true } ,(err) => {
  if (err) {
    console.error(err);
    process.exit();
  }
  console.log('MongoDB Connection Established');
});

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

export default app;
