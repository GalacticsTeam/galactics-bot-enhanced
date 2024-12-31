import { model } from 'mongoose';

import { createSchema, fillSchemaProperty } from '@db';
import type { UserConfig } from '@types';
import consts from './consts';

interface UserSchema extends UserConfig {
  userId: string;
}

const schema = createSchema<UserSchema>({
  userId: String,
  language: String,
});

export const getUser = async (serverId: string, userId: string) =>
  (await UserSchema.findOne({ serverId, userId })) ??
  (await new UserSchema({ serverId, userId, ...consts.user }).save());

export const getUserProperty = async <T extends keyof UserConfig>(
  serverId: string,
  userId: string,
  property: T
): Promise<UserConfig[T]> => {
  const user = await getUser(serverId, userId);

  const filledUserProperty = fillSchemaProperty('user', user.toJSON(), property);

  return filledUserProperty;
};

export const setUserProperty = async <T extends keyof UserConfig>(
  serverId: string,
  userId: string,
  property: T,
  setCallBack: (previousState: UserConfig[T]) => UserConfig[T]
) => {
  const user = await getUser(serverId, userId);

  const filledUserProperty = fillSchemaProperty('user', user.toJSON(), property);
  user.$set(property, setCallBack(filledUserProperty));

  user.save();
  return user[property];
};

const UserSchema = model('user', schema);
