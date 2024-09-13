import { ServerApiVersion } from 'mongodb';
import { connect } from 'mongoose';
import { configDotenv } from 'dotenv';

import { isDevMode } from '../utils';

export * from './ServerSchema';
export * from './UserSchema';
export * from './YoutubeChannelsSchema';
export * from './helpers';

configDotenv();

export const runDB = async () => {
  if (!process.env.MONGODB_TOKEN) return console.log('No MongoDB token provided');

  connect(process.env.MONGODB_TOKEN, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    dbName: 'discordBot' + (isDevMode ? (process.env.DEVNAME ?? 'Dev') : ''),
  })
    .then(() => console.log('Connected to MongoDB server'))
    .catch(console.log);
};
