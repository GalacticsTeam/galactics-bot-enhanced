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
  birthday: String,
});

export const getUser = async (userId: string) =>
  (await UserSchema.findOne({ userId })) ?? (await new UserSchema({ userId, ...consts.user }).save());

export const getUserProperty = async <T extends keyof UserConfig>(
  userId: string,
  property: T
): Promise<UserConfig[T]> => {
  const user = await getUser(userId);

  const filledUserProperty = fillSchemaProperty('user', user.toJSON(), property);

  return filledUserProperty;
};

export const setUserProperty = async <T extends keyof UserConfig>(
  userId: string,
  property: T,
  setCallBack: (previousState: UserConfig[T]) => UserConfig[T]
) => {
  const user = await getUser(userId);

  const filledUserProperty = fillSchemaProperty('user', user.toJSON(), property);
  user.$set(property, setCallBack(filledUserProperty));

  user.save();
  return user[property];
};

const UserSchema = model('user', schema);
