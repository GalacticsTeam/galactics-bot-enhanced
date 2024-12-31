import { model } from 'mongoose';

import type { ServerUserConfig } from '@types';

import { WarnSchema } from './schemas';
import { createSchema, fillSchemaProperty } from './helpers';
import consts from './consts';

interface ServerUserSchema extends ServerUserConfig {
  serverId: string;
  userId: string;
}

const schema = createSchema<ServerUserSchema>({
  serverId: String,
  userId: String,
  warns: WarnSchema,
});

export const getServerUser = async (serverId: string, userId: string) =>
  (await ServerUserSchema.findOne({ serverId, userId })) ??
  (await new ServerUserSchema({ serverId, userId, ...consts.serverUser }).save());

export const getServerUserProperty = async <T extends keyof ServerUserConfig>(
  serverId: string,
  userId: string,
  property: T
): Promise<ServerUserConfig[T]> => {
  const serverUser = await getServerUser(serverId, userId);

  const filledServerUserProperty = fillSchemaProperty('serverUser', serverUser.toJSON(), property);

  return filledServerUserProperty;
};

export const setServerUserProperty = async <T extends keyof ServerUserConfig>(
  serverId: string,
  userId: string,
  property: T,
  setCallBack: (previousState: ServerUserConfig[T]) => ServerUserConfig[T]
) => {
  const serverUser = await getServerUser(serverId, userId);

  const filledServerUserProperty = fillSchemaProperty('serverUser', serverUser.toJSON(), property);
  serverUser.$set(property, setCallBack(filledServerUserProperty));

  serverUser.save();
  return serverUser[property];
};

const ServerUserSchema = model('serverUser', schema);
