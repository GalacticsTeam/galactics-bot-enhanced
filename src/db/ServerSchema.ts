import { model } from 'mongoose';

import type { ServerConfig } from '@types';

import { createSchema, fillSchemaProperty } from './helpers';
import { ChannelsSchema, EmbedsSchema, FeaturesSchema, PropertiesSchema, RolesSchema } from './schemas';
import consts from './consts';

interface ServerSchema extends ServerConfig {
  serverId: string;
}

const schema = createSchema<ServerSchema>({
  serverId: String,
  isMaintenance: Boolean,
  isDevServer: Boolean,
  features: FeaturesSchema,
  properties: PropertiesSchema,
  embeds: EmbedsSchema,
  channels: ChannelsSchema,
  roles: RolesSchema,
});

export const getServer = async (serverId: string) =>
  (await ServerSchema.findOne({ serverId })) ?? (await new ServerSchema({ serverId, ...consts.server }).save());

export const getServerProperty = async <T extends keyof ServerConfig>(serverId: string, property: T) => {
  const server = await getServer(serverId);

  const filledServerProperty = fillSchemaProperty('server', server.toJSON(), property);

  return filledServerProperty;
};

export const setServerProperty = async <T extends keyof ServerConfig>(
  serverId: string,
  property: T,
  setCallBack: (previousState: ServerConfig[T]) => ServerConfig[T]
) => {
  const server = await getServer(serverId);

  const filledServerProperty = fillSchemaProperty('server', server.toJSON(), property);
  server.$set(property, setCallBack(filledServerProperty));

  server.save();
  return server[property];
};

const ServerSchema = model('server', schema);
