import type { Document, Types } from 'mongoose';

import { defaultServerConfig, defaultUserConfig } from '../utils';

export type ReturnedSchema<Schema extends typeof defaultServerConfig | typeof defaultUserConfig> = Document<
  unknown,
  unknown,
  Schema
> &
  Schema & { _id: Types.ObjectId };

export type SchemaName = 'server' | 'user';
