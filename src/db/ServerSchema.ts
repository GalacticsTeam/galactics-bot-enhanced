import { Document, Schema, Types, model } from 'mongoose';

import { channelsType, defaultServerConfig, featuresType, rolesType } from '../utils';
import { updateSchemaItem } from './helpers';

import type { DefaultServerConfig, ID } from '../types';

export interface Server extends DefaultServerConfig {
  serverId: string;
}

export const ServerSchema = model<Server>(
  'server',
  new Schema<Server>({
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

type ReturnedServerSchema = Document<unknown, {}, Server> & Server & { _id: Types.ObjectId };

export const getServerSchema = async (serverId: ID): Promise<ReturnedServerSchema> =>
  (await ServerSchema.findOne({ serverId })) ?? (await new ServerSchema({ serverId, ...defaultServerConfig }).save());

export const setNewServerSchema = (serverInfo: Server) => new ServerSchema(serverInfo).save();

export const getServerItem = async <T extends keyof DefaultServerConfig>(
  serverId: ID,
  itemName: T
): Promise<DefaultServerConfig[T]> => {
  const server = await getServerSchema(serverId);

  updateSchemaItem(server, itemName);

  return server[itemName];
};

export const setServerSchemaItem = async <T extends keyof DefaultServerConfig>(
  serverId: ID,
  itemName: T,
  setCallBack: (previousState: DefaultServerConfig[T]) => DefaultServerConfig[T]
) => {
  const server = await getServerSchema(serverId);

  updateSchemaItem(server, itemName);

  server.$set(itemName, setCallBack(server[itemName]));

  server.save();

  return server[itemName];
};
