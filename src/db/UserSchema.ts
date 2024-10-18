import { Schema, model } from 'mongoose';

import { setDefaultSchemaItem } from '@db';
import { defaultUserConfig } from '@utils';
import type { DefaultUserConfig } from '@types';

import type { DefaultUserConfig } from '../types';
import type { ReturnedSchema } from './types';

interface DefaultUserSchema extends DefaultUserConfig {
  serverId: string;
  userId: string;
}

export const UserSchema = model<DefaultUserSchema>(
  'user',
  new Schema<DefaultUserSchema>({
    serverId: String,
    userId: String,
    warns: { number: Number, reasons: [String] },
  })
);

export const getUserSchema = async (serverId: string, userId: string): Promise<ReturnedSchema<DefaultUserSchema>> =>
  (await UserSchema.findOne({ serverId, userId })) ??
  (await new UserSchema({ serverId, userId, ...defaultUserConfig }).save());

export const getUserSchemaItem = async <T extends keyof DefaultUserConfig>(
  serverId: string,
  userId: string,
  itemName: T
): Promise<DefaultUserConfig[T]> => {
  const user = await getUserSchema(serverId, userId);

  setDefaultSchemaItem(user, itemName);

  return user[itemName];
};

export const setUserSchemaItem = async <T extends keyof DefaultUserConfig>(
  serverId: string,
  userId: string,
  itemName: T,
  setCallBack: (previousState: DefaultUserConfig[T]) => DefaultUserConfig[T]
) => {
  const user = await getUserSchema(serverId, userId);

  setDefaultSchemaItem(user, itemName);

  user.$set(itemName, setCallBack(user[itemName]));

  user.save();

  return user[itemName];
};
