import { Schema, model } from 'mongoose';

import { updateSchemaItem } from './';
import { defaultUserConfig } from '../utils';

import type { DefaultUserConfig, ID } from '../types';
import type { ReturnedSchema } from './types';

export interface User extends DefaultUserConfig {
  serverId: string;
  userId: string;
}

export const UserSchema = model<User>(
  'user',
  new Schema<User>({
    serverId: String,
    userId: String,
    warns: { number: Number, reasons: [String] },
  })
);

type ReturnedUserSchema = ReturnedSchema<User>;

export const getUserSchema = async (serverId: ID, userId: ID): Promise<ReturnedUserSchema> =>
  (await UserSchema.findOne({ serverId, userId })) ??
  (await new UserSchema({ serverId, userId, ...defaultUserConfig }).save());

export const getUserItem = async <T extends keyof DefaultUserConfig>(
  serverId: ID,
  userId: ID,
  itemName: T
): Promise<DefaultUserConfig[T]> => {
  const user = await getUserSchema(serverId, userId);

  updateSchemaItem(user, itemName);

  return user[itemName];
};
