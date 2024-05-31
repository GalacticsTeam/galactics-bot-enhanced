import { ServerApiVersion } from 'mongodb';
import { connect } from 'mongoose';

import { configDotenv } from 'dotenv';

export * from './ServerSchema';
export * from './UserSchema';

configDotenv();

export const runDB = async () => {
  connect(process.env.MONGODB_TOKEN, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })
    .then(() => console.log('Connected to MongoDB server'))
    .catch((err) => console.log(err));
};
