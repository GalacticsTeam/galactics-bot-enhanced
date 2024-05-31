import { Schema, model } from 'mongoose';

import { defaultServerConfig, features } from '../utils';

import type { ID } from '../types';

export const ServerSchema = model(
  'server',
  new Schema({
    serverId: String,
    features,
    prefixes: Array,
    isMaintenance: Boolean,
    isDevServer: Boolean,
  })
);

export const getServerSchema = async (serverId: ID) =>
  await ServerSchema.findOne({ serverId })
    .then((serverSchema) => serverSchema)
    .catch((_) => ({ serverId, ...defaultServerConfig }));
