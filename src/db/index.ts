import { ServerApiVersion } from 'mongodb';
import { connect } from 'mongoose';
import { configDotenv } from 'dotenv';

import { isDevMode } from '../utils';

export * from './ServerSchema';
export * from './UserSchema';
export * from './helpers';

configDotenv();

export const runDB = async () => {
  connect(process.env.MONGODB_TOKEN, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    dbName: 'discordBot' + (isDevMode ? 'Dev' : ''),
  })
    .then(() => console.log('Connected to MongoDB server'))
    .catch(console.log);
};
