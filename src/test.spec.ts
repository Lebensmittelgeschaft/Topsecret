import * as mongoose from 'mongoose';
import { config } from './config';

before(async () => {
  (<any>mongoose).Promise = global.Promise;
  
  await mongoose.connect(config.MONGOURI, { useMongoClient: true } ,(err) => {
    if (err) {
      console.error(err);
      process.exit();
    }
    console.log('MongoDB Connection Established');
  });
});

after(async () => {
  await mongoose.disconnect();
});
