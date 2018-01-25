import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as mongoose from 'mongoose';
import { config } from './config';


before(async () => {
  // Use chai as promised in all tests
  chai.use(chaiAsPromised);

  (<any>mongoose).Promise = global.Promise;
  
  await mongoose.connect(config.MONGOURI, { useMongoClient: true }, (err) => {
    if (err) {
      console.error(err);
      process.exit();
    }
    console.log('MongoDB Main Test Connection Established');
  });
})

after(async () => {
  await mongoose.disconnect();
});