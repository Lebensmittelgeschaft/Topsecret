import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as graphqlHTTP from 'express-graphql';
import * as cors from 'cors';
import { config } from './config';
import { userRouter as UserRoute } from './user/user.route';
import { secretRouter as SecretRoute } from './secret/secret.route';
import { messageRouter as MessageRoute } from './message/message.route';
import { GraphqlSchema } from './schemas/schema';

const app = express();

// Adding debugging output in dev mode - shows all mongo queries
if (process.env.NODE_ENV === 'dev') mongoose.set('debug', true);

// Attaching node promise to the mongoose promise
(<any>mongoose).Promise = global.Promise;

mongoose.connect(config.MONGOURI, (err) => {
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

// Cross-origin-resource-share policy 
// Need to be configured for real origins and headers like 'Authorization'
const corsOptions = {
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

// GraphQL Route
app.use('/graphql', cors(corsOptions), (req, res) => {
  graphqlHTTP({
    schema: GraphqlSchema,
    graphiql: true,
  })(req, res);
});

// Routes
app.use('/user', UserRoute);
app.use('/secret', SecretRoute);
app.use('/message', MessageRoute);
const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'dev') console.error(err);
  if (err.name === 'ValidationError' || err.name === 'CastError' ||
    (err.name === 'MongoError' && err.code === 11000)) res.sendStatus(400);
  else res.sendStatus(500);
};
app.use(errorHandler);
app.listen(app.get('port'), () => {
  console.log(`Topsecret Server is running at http://localhost: ${app.get('port')} 
               in ${app.get('env')} mode`);
  console.log('Press CTRL-C to stop\n');
});

export default app;
