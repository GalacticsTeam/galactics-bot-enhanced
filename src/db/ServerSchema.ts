import { Schema, model } from 'mongoose';

import { channelsType, defaultServerConfig, featuresType, rolesType } from '../utils';
import { setDefaultSchemaItem } from './helpers';

import type { DefaultServerConfig } from '../types';
import { ReturnedSchema } from './types';

interface DefaultServerSchema extends DefaultServerConfig {
  serverId: string;
}

export const ServerSchema = model<DefaultServerSchema>(
  'server',
  new Schema<DefaultServerSchema>({
    serverId: String,
    features: featuresType,
    isMaintenance: Boolean,
    isDevServer: Boolean,
    embeds: { color: String },
    channels: channelsType,
    roles: rolesType,
    properties: { autoBanTrigger: Number, modHelpMessage: String, statuses: [] },
  })
);

export const getServerSchema = async (serverId: string): Promise<ReturnedSchema<DefaultServerSchema>> =>
  (await ServerSchema.findOne({ serverId })) ?? (await new ServerSchema({ serverId, ...defaultServerConfig }).save());

export const createServerSchema = (serverInfo: DefaultServerSchema) => new ServerSchema(serverInfo).save();

export const getServerSchemaItem = async <T extends keyof DefaultServerConfig>(
  serverId: string,
  itemName: T
): Promise<DefaultServerConfig[T]> => {
  const server = await getServerSchema(serverId);

  setDefaultSchemaItem(server, itemName);

  return server[itemName];
};

export const setServerSchemaItem = async <T extends keyof DefaultServerConfig>(
  serverId: string,
  itemName: T,
  setCallBack: (previousState: DefaultServerConfig[T]) => DefaultServerConfig[T]
) => {
  const server = await getServerSchema(serverId);

  setDefaultSchemaItem(server, itemName);

  server.$set(itemName, setCallBack(server[itemName]));

  server.save();

  return server[itemName];
};
